
import { DrawResult, Season, FrequencyMap, SeasonalFrequency, AnalysisResult, GeneratedTicket } from '../types';

/**
 * Determines the season for a given date.
 */
export const getSeason = (date: Date): Season => {
  const month = date.getUTCMonth(); // 0-11
  if (month >= 2 && month <= 4) return Season.Spring; // Mar, Apr, May
  if (month >= 5 && month <= 7) return Season.Summer; // Jun, Jul, Aug
  if (month >= 8 && month <= 10) return Season.Autumn; // Sep, Oct, Nov
  return Season.Winter; // Dec, Jan, Feb
};

const CSV_URLS = [
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2012.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2013.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2014.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2015.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2016.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2017.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2018.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2019.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2020.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2021.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2022.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2023.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2024.csv',
    'https://raw.githubusercontent.com/vita-lottie-characters/eurojackpot_2025.csv/refs/heads/main/eurojackpot_2025.csv',
];

const parseCSV = (csvText: string): DrawResult[] => {
    const results: DrawResult[] = [];
    const lines = csvText.trim().split('\n');
    
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Remove quotes and split by comma
        const values = line.replace(/"/g, '').split(',');
        
        if (values.length < 8) continue; // Skip malformed lines

        try {
            // Appending T00:00:00Z ensures it's parsed as UTC.
            const date = new Date(`${values[0]}T00:00:00Z`);
            if (isNaN(date.getTime())) continue; // Invalid date

            const mainNumbers = [
                parseInt(values[1], 10),
                parseInt(values[2], 10),
                parseInt(values[3], 10),
                parseInt(values[4], 10),
                parseInt(values[5], 10),
            ];
            const euroNumbers = [
                parseInt(values[6], 10),
                parseInt(values[7], 10),
            ];

            // Validate parsed numbers
            if (mainNumbers.some(isNaN) || euroNumbers.some(isNaN)) {
                continue;
            }
            
            results.push({
                date,
                mainNumbers,
                euroNumbers,
            });
        } catch (error) {
            console.error(`Error parsing line: ${line}`, error);
        }
    }
    return results;
};


/**
 * Fetches and parses historical data from multiple CSV files.
 */
export const fetchHistoricalData = async (): Promise<DrawResult[]> => {
  const responses = await Promise.all(CSV_URLS.map(url => fetch(url)));
  const texts = await Promise.all(responses.map(res => {
      if (!res.ok) {
          throw new Error(`Failed to fetch ${res.url}: ${res.statusText}`);
      }
      return res.text();
  }));
  
  const allDraws = texts.flatMap(csvText => parseCSV(csvText));
  
  // Sort by date to ensure chronological order
  return allDraws.sort((a, b) => a.date.getTime() - b.date.getTime());
};


const getHotColdNumbers = (data: DrawResult[], isEuro: boolean) => {
    const numberRange = isEuro ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 50 }, (_, i) => i + 1);
    const lastSeen: { [key: number]: number } = {};

    data.forEach((draw, index) => {
        const numbers = isEuro ? draw.euroNumbers : draw.mainNumbers;
        for (const num of numbers) {
            lastSeen[num] = index;
        }
    });

    const totalDraws = data.length;
    const drawsSince = numberRange.map(num => ({
        number: num,
        drawsSince: lastSeen[num] !== undefined ? totalDraws - 1 - lastSeen[num] : totalDraws,
    }));

    drawsSince.sort((a, b) => a.drawsSince - b.drawsSince);
    const hot = drawsSince.slice(0, 10);

    drawsSince.sort((a, b) => b.drawsSince - a.drawsSince);
    const cold = drawsSince.slice(0, 10);

    return { hot, cold };
};


/**
 * Analyzes the historical data to produce frequencies and predictions.
 */
export const analyzeData = (data: DrawResult[], currentSeason: Season): AnalysisResult => {
  const overallMainFrequencies: FrequencyMap = {};
  const overallEuroFrequencies: FrequencyMap = {};

  const seasonalFrequencies: SeasonalFrequency = {
    [Season.Spring]: { main: {}, euro: {} },
    [Season.Summer]: { main: {}, euro: {} },
    [Season.Autumn]: { main: {}, euro: {} },
    [Season.Winter]: { main: {}, euro: {} },
  };

  for (const draw of data) {
    const season = getSeason(draw.date);
    
    for (const num of draw.mainNumbers) {
      overallMainFrequencies[num] = (overallMainFrequencies[num] || 0) + 1;
      seasonalFrequencies[season].main[num] = (seasonalFrequencies[season].main[num] || 0) + 1;
    }
    for (const num of draw.euroNumbers) {
      overallEuroFrequencies[num] = (overallEuroFrequencies[num] || 0) + 1;
      seasonalFrequencies[season].euro[num] = (seasonalFrequencies[season].euro[num] || 0) + 1;
    }
  }

  // Generate predictions based on the current season's historical data
  const seasonalDraws = data.filter(d => getSeason(d.date) === currentSeason);
  const totalSeasonalDraws = seasonalDraws.length;
  const currentSeasonMainFreq = seasonalFrequencies[currentSeason].main;

  const predictedNumbers = Object.entries(currentSeasonMainFreq)
    .map(([num, count]) => ({
      number: parseInt(num, 10),
      probability: totalSeasonalDraws > 0 ? parseFloat(((count / totalSeasonalDraws) * 100).toFixed(2)) : 0,
      count: count,
    }))
    .sort((a, b) => b.count - a.count);

  const top5Predicted = predictedNumbers.slice(0, 5);

  const formatFrequencies = (freqMap: FrequencyMap) => Object.entries(freqMap)
    .map(([number, count]) => ({ number: parseInt(number), count }))
    .sort((a, b) => b.count - a.count);
    
  const { hot: hotMain, cold: coldMain } = getHotColdNumbers(data, false);
  const { hot: hotEuro, cold: coldEuro } = getHotColdNumbers(data, true);
  
  const hotCold = { hotMain, coldMain, hotEuro, coldEuro };

  return {
    overallMainFrequencies: formatFrequencies(overallMainFrequencies),
    overallEuroFrequencies: formatFrequencies(overallEuroFrequencies),
    seasonalFrequencies,
    top5Predicted,
    currentSeason,
    hotCold,
  };
};

const pickRandomUnique = (arr: any[], count: number, existing: Set<number>): number[] => {
    const result: number[] = [];
    const available = arr.filter(item => !existing.has(item.number));
    
    while(result.length < count && available.length > 0) {
        const randomIndex = Math.floor(Math.random() * available.length);
        const selected = available.splice(randomIndex, 1)[0];
        result.push(selected.number);
    }
    return result;
};

export const generateSmartTicket = (analysis: AnalysisResult): GeneratedTicket => {
    const mainNumbers = new Set<number>();
    
    // Pick 2 hot
    pickRandomUnique(analysis.hotCold.hotMain, 2, mainNumbers).forEach(n => mainNumbers.add(n));
    // Pick 2 from seasonal top 5
    pickRandomUnique(analysis.top5Predicted, 2, mainNumbers).forEach(n => mainNumbers.add(n));
    // Pick 1 cold
    pickRandomUnique(analysis.hotCold.coldMain, 1, mainNumbers).forEach(n => mainNumbers.add(n));

    // Fill up if duplicates caused less than 5
    while(mainNumbers.size < 5) {
        const randomNum = Math.floor(Math.random() * 50) + 1;
        if (!mainNumbers.has(randomNum)) {
            mainNumbers.add(randomNum);
        }
    }

    const euroNumbers = new Set<number>();
    // Pick 1 hot
    pickRandomUnique(analysis.hotCold.hotEuro, 1, euroNumbers).forEach(n => euroNumbers.add(n));
    // Pick 1 cold
    pickRandomUnique(analysis.hotCold.coldEuro, 1, euroNumbers).forEach(n => euroNumbers.add(n));
    
    // Fill up if duplicates caused less than 2
    while(euroNumbers.size < 2) {
        const randomNum = Math.floor(Math.random() * 12) + 1;
        if (!euroNumbers.has(randomNum)) {
            euroNumbers.add(randomNum);
        }
    }

    return {
        mainNumbers: Array.from(mainNumbers).sort((a,b) => a-b),
        euroNumbers: Array.from(euroNumbers).sort((a,b) => a-b),
    };
};
