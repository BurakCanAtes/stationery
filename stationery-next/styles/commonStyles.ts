import React from "react";

export const textOverflowEllipsis: {
  singleLine: React.CSSProperties;
  multiLine: React.CSSProperties;
} = {
  singleLine: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    display: "inline-block",
  },
  multiLine: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 2,
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
};