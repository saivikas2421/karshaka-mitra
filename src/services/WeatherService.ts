export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    vis_km: number;
    pressure_mb: number;
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
      };
    }>;
  };
}

class WeatherService {
  private static API_KEY_STORAGE_KEY = 'weather_api_key';
  private static CACHE_KEY = 'weather_cache';
  private static CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async getWeatherData(location: string = 'Kochi, Kerala'): Promise<WeatherData | null> {
    const apiKey = this.getApiKey();
    
    // Check cache first
    const cached = this.getCachedWeather();
    if (cached) {
      return cached;
    }

    if (!apiKey) {
      return this.getMockWeatherData(location);
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=7&aqi=no&alerts=yes`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data: WeatherData = await response.json();
      
      // Cache the data
      this.cacheWeatherData(data);
      
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getMockWeatherData(location);
    }
  }

  private static getCachedWeather(): WeatherData | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < this.CACHE_DURATION) {
          return data;
        }
      }
    } catch (error) {
      console.error('Error reading weather cache:', error);
    }
    return null;
  }

  private static cacheWeatherData(data: WeatherData): void {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error caching weather data:', error);
    }
  }

  private static getMockWeatherData(location: string): WeatherData {
    return {
      location: {
        name: 'Kochi',
        region: 'Kerala',
        country: 'India'
      },
      current: {
        temp_c: 32,
        feelslike_c: 35,
        condition: {
          text: 'Partly Cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
        },
        humidity: 85,
        wind_kph: 12,
        wind_dir: 'SW',
        vis_km: 8,
        pressure_mb: 1012,
        uv: 8
      },
      forecast: {
        forecastday: [
          {
            date: new Date().toISOString().split('T')[0],
            day: {
              maxtemp_c: 32,
              mintemp_c: 24,
              condition: {
                text: 'Partly Cloudy',
                icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
              },
              daily_chance_of_rain: 20
            }
          }
          // Add more mock forecast days as needed
        ]
      }
    };
  }
}

export default WeatherService;