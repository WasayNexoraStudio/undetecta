export type Tone = "Casual" | "Professional" | "Academic";

export interface HumanizeRequest {
  text: string;
  tone: Tone;
}

export interface HumanizeResponse {
  result?: string;
  error?: string;
}

export interface DetectRequest {
  text: string;
}

export interface DetectResponse {
  percentage?: number;
  explanation?: string;
  error?: string;
}
