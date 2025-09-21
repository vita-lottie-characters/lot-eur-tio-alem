
export interface DrawResult {
  date: Date;
  mainNumbers: number[];
  euroNumbers: number[];
}

export enum Season {
  Spring = 'Primavera',
  Summer = 'Verano',
  Autumn = 'Otoño',
  Winter = 'Invierno',
}

export interface FrequencyMap {
  [key: number]: number;
}

export interface SeasonalFrequency {
  [Season.Spring]: { main: FrequencyMap; euro: FrequencyMap };
  [Season.Summer]: { main: FrequencyMap; euro: FrequencyMap };
  [Season.Autumn]: { main: FrequencyMap; euro: FrequencyMap };
  [Season.Winter]: { main: FrequencyMap; euro: FrequencyMap };
}

export interface Prediction {
  number: number;
  probability: number;
}

export interface HotColdAnalysisData {
    hotMain: { number: number; drawsSince: number }[];
    coldMain: { number: number; drawsSince: number }[];
    hotEuro: { number: number; drawsSince: number }[];
    coldEuro: { number: number; drawsSince: number }[];
}

export interface GeneratedTicket {
    mainNumbers: number[];
    euroNumbers: number[];
}

export interface AnalysisResult {
  overallMainFrequencies: { number: number; count: number }[];
  overallEuroFrequencies: { number: number; count: number }[];
  seasonalFrequencies: SeasonalFrequency;
  top5Predicted: Prediction[];
  currentSeason: Season;
  hotCold: HotColdAnalysisData;
}
