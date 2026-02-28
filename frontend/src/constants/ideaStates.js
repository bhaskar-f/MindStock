export const IDEA_STATES = [
  { id: "incoming", label: "Incoming" },
  { id: "on hold", label: "On Hold" },
  { id: "in play", label: "In Play" },
  { id: "liquidated", label: "Liquidated" },
];

export const IDEA_STATE_LABEL = IDEA_STATES.reduce((acc, state) => {
  acc[state.id] = state.label;
  return acc;
}, {});
