import { Dimensions } from "react-native";

export function calc(value: number, type: "width" | "height"): number {
    return (value / Dimensions.get("screen")[type]) * Dimensions.get("screen")[type]
}