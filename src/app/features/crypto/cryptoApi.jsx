import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/",
   
  }),
  endpoints: (builder) => ({
    getMarketStats: builder.query({
      query: () => "global",
    }),
    searchCrypto: builder.query({
      query: (term) => `search?query=${term}`,
    }),

    getCryptos: builder.query({
      query: ({ page = 1, perPage = 100, currency = "usd" }) =>
        `coins/markets?vs_currency=${currency}&page=${page}&per_page=${perPage}`,
    }),
    getCoinDetails: builder.query({
      query: (id) =>
        `coins/${id}?localization=false&tickers=false&market_data=true`,
    }),
    getCoinHistory: builder.query({
      query: ({ id, days = 30, currency = "usd" }) =>
        `coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
    }),
    getTrendingCoins: builder.query({
      query: () => "search/trending",
    }),
    getOHLC: builder.query({
      query: ({ id, days = 1, currency = "usd" }) =>
        `coins/${id}/ohlc?vs_currency=${currency}&days=${days}`,
    }),
    getAllCoinsList: builder.query({
      query: () => "coins/list",
    }),
  }),
});

export const {
  useGetMarketStatsQuery,
  useSearchCryptoQuery,
  useGetCryptosQuery,
  useGetCoinDetailsQuery,
  useGetCoinHistoryQuery,
  useGetTrendingCoinsQuery,
  useGetOHLCQuery,
  useGetAllCoinsListQuery,
} = cryptoApi;
