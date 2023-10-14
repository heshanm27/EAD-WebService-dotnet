package com.example.reserveit.repo

import com.example.reserveit.api.ReservationApi
import com.example.reserveit.api.RetrofitInstance
import com.example.reserveit.models.reservation.Reservation
import retrofit2.Response


class ReservationRepo{

    suspend fun getAllReservations(
        page: Int = 1,
        pageSize: Int = 10,
        sortBy: String? = null,
        order: String = "asc",
        search: String? = null
    ): Response<List<Reservation>> {
        return RetrofitInstance.reservationApi.getReservations(page, pageSize, sortBy, order, search)
    }

    suspend fun getReservationById(id: Long): Reservation {
        return RetrofitInstance.reservationApi.getReservationById(id)
    }

    suspend fun addReservation(reservation: Reservation): Reservation {
        return RetrofitInstance.reservationApi.addReservation(reservation)
    }

    suspend fun updateReservation(id: Long, reservation: Reservation): Reservation {
        return RetrofitInstance.reservationApi.updateReservation(id, reservation)
    }

    suspend fun deleteReservation(id: Long): Reservation {
        return RetrofitInstance.reservationApi.deleteReservation(id)
    }
}