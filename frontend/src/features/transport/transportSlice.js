import { apiSlice } from "../api/apiSlice";

export const transportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBuses: builder.query({
      query: ({ from, to, date } = {}) => ({
        url: "/buses",
        params: { from, to, date },
      }),
      providesTags: ["Transport"],
    }),
    getBookings: builder.query({
      query: () => "/bookings",
      providesTags: ["Booking"],
    }),
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Booking", "Transport"],
    }),
    getDashboard: builder.query({
      query: () => "/dashboard",
      providesTags: ["Transport", "Booking", "User"],
    }),
    createBooking: builder.mutation({
      query: (booking) => ({ url: "/bookings", method: "POST", body: booking }),
      invalidatesTags: ["Booking"],
    }),
    createBus: builder.mutation({
      query: (bus) => ({ url: "/buses", method: "POST", body: bus }),
      invalidatesTags: ["Transport"],
    }),
    updateBus: builder.mutation({
      query: ({ id, bus }) => ({
        url: `/buses/${id}`,
        method: "PUT",
        body: bus,
      }),
      invalidatesTags: ["Transport"],
    }),
    deleteBus: builder.mutation({
      query: (id) => ({ url: `/buses/${id}`, method: "DELETE" }),
      invalidatesTags: ["Transport"],
    }),
    createRoute: builder.mutation({
      query: (route) => ({ url: "/routes", method: "POST", body: route }),
      invalidatesTags: ["Transport"],
    }),
    updateRoute: builder.mutation({
      query: ({ id, route }) => ({
        url: `/routes/${id}`,
        method: "PUT",
        body: route,
      }),
      invalidatesTags: ["Transport"],
    }),
    deleteRoute: builder.mutation({
      query: (id) => ({ url: `/routes/${id}`, method: "DELETE" }),
      invalidatesTags: ["Transport"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBusesQuery,
  useGetBookingsQuery,
  useCancelBookingMutation,
  useGetDashboardQuery,
  useCreateBookingMutation,
  useCreateBusMutation,
  useUpdateBusMutation,
  useDeleteBusMutation,
  useCreateRouteMutation,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
} = transportApiSlice;
