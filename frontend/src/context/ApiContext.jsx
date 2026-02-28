/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { API_BASE_URL } from "../config/env";
import { clearSession, loadSession, saveSession } from "../utils/session";

const ApiContext = createContext(null);

function mapAxiosError(error) {
  const status = error?.response?.status;
  const data = error?.response?.data;
  const detailedMessage =
    data?.error && typeof data.error === "string" ? data.error : "";
  const genericPrefix = typeof data?.message === "string" ? data.message : "";
  const shouldUseDetailed =
    detailedMessage &&
    (genericPrefix.toLowerCase().startsWith("error ") ||
      genericPrefix.toLowerCase().startsWith("request failed"));
  const message =
    (shouldUseDetailed ? detailedMessage : "") ||
    data?.message ||
    data?.error ||
    error?.message ||
    "Request failed. Please try again.";

  const nextError = new Error(message);
  nextError.status = status;
  nextError.payload = data;
  return nextError;
}

export function ApiProvider({ children }) {
  const [session, setSession] = useState(() => loadSession());

  const client = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE_URL,
        headers: {
          Accept: "application/json",
        },
      }),
    [],
  );

  const getAuthHeaders = useCallback(() => {
    const token = session?.token;
    if (!token) {
      return {};
    }

    const authToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    return { Authorization: authToken };
  }, [session?.token]);

  const register = useCallback(
    async (payload) => {
      try {
        const response = await client.post("/api/auth/register", payload);
        return response.data;
      } catch (error) {
        throw mapAxiosError(error);
      }
    },
    [client],
  );

  const verifyEmail = useCallback(
    async (code) => {
      try {
        const response = await client.post("/api/auth/verifyemail", { code });
        return response.data;
      } catch (error) {
        throw mapAxiosError(error);
      }
    },
    [client],
  );

  const login = useCallback(
    async (payload) => {
      try {
        const response = await client.post("/api/auth/login", payload);
        const token = response?.data?.data?.token || "";
        if (!token) {
          throw new Error("Login response did not include token.");
        }

        const user = {
          name: response?.data?.data?.name || "",
          email: response?.data?.data?.email || "",
          role: response?.data?.data?.role || "builder",
        };

        const nextSession = { token, user };
        saveSession(token, user);
        setSession(nextSession);
        return nextSession;
      } catch (error) {
        throw mapAxiosError(error);
      }
    },
    [client],
  );

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const upsertSessionUser = useCallback((nextUser) => {
    setSession((current) => {
      if (!current?.token) {
        return current;
      }

      const mergedUser = {
        ...(current.user || {}),
        ...(nextUser || {}),
      };
      saveSession(current.token, mergedUser);
      return {
        ...current,
        user: mergedUser,
      };
    });
  }, []);

  const fetchIdeas = useCallback(async () => {
    try {
      const response = await client.get("/api/ideas", {
        headers: getAuthHeaders(),
      });
      return Array.isArray(response?.data?.data) ? response.data.data : [];
    } catch (error) {
      const mapped = mapAxiosError(error);
      if (
        mapped.status === 400 &&
        mapped.message.toLowerCase().includes("idea is not there")
      ) {
        return [];
      }
      throw mapped;
    }
  }, [client, getAuthHeaders]);

  const updateIdeaState = useCallback(
    async (ideaId, state) => {
      try {
        const response = await client.put(
          `/api/ideas/${ideaId}`,
          { state },
          { headers: getAuthHeaders() },
        );
        return response?.data?.data;
      } catch (error) {
        throw mapAxiosError(error);
      }
    },
    [client, getAuthHeaders],
  );

  const createIdea = useCallback(
    async (payload) => {
      try {
        const response = await client.post("/api/ideas", payload, {
          headers: getAuthHeaders(),
        });
        return response?.data?.data;
      } catch (error) {
        throw mapAxiosError(error);
      }
    },
    [client, getAuthHeaders],
  );

  const getProfile = useCallback(async () => {
    try {
      const response = await client.get("/api/auth/profile", {
        headers: getAuthHeaders(),
      });
      const profile = response?.data?.data || null;
      if (profile) {
        upsertSessionUser(profile);
      }
      return profile;
    } catch (error) {
      throw mapAxiosError(error);
    }
  }, [client, getAuthHeaders, upsertSessionUser]);

  const updateProfile = useCallback(
    async (payload) => {
      try {
        const response = await client.put("/api/auth/profile", payload, {
          headers: getAuthHeaders(),
        });
        const profile = response?.data?.data || null;
        if (profile) {
          upsertSessionUser(profile);
        }
        return profile;
      } catch (error) {
        throw mapAxiosError(error);
      }
    },
    [client, getAuthHeaders, upsertSessionUser],
  );

  const value = useMemo(
    () => ({
      session,
      token: session?.token || "",
      user: session?.user || null,
      isAuthenticated: Boolean(session?.token),
      register,
      verifyEmail,
      login,
      logout,
      fetchIdeas,
      updateIdeaState,
      createIdea,
      getProfile,
      updateProfile,
    }),
    [
      session,
      register,
      verifyEmail,
      login,
      logout,
      fetchIdeas,
      updateIdeaState,
      createIdea,
      getProfile,
      updateProfile,
    ],
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within ApiProvider");
  }
  return context;
}
