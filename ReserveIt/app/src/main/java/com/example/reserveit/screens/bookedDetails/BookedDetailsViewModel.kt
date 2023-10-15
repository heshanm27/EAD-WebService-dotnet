package com.example.reserveit.screens.bookedDetails

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.reserveit.repo.ReservationRepo
import kotlinx.coroutines.launch

class BookedDetailsViewModel(
    private val reservationRepo: ReservationRepo
) : ViewModel() {
    
    fun cancelBooking(id: String) {
        viewModelScope.launch {
            try {
                reservationRepo.deleteReservation(id)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}