package com.example.reserveit.screens.updateBooking

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.reserveit.models.reservation.Reservation
import com.example.reserveit.repo.ReservationRepo
import kotlinx.coroutines.launch

class UpdateBookingViewModel(
    private val reservationRepo: ReservationRepo
) : ViewModel() {


    fun updateBooking(id: String,reservation: Reservation) {

        viewModelScope.launch{
            try {
                reservationRepo.updateReservation(id,reservation)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

    }
}