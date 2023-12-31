package com.example.reserveit.screens.trainScheduleDetails

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.reserveit.models.login.LoginModel
import com.example.reserveit.models.reservation.Reservation
import com.example.reserveit.models.train_schedule.Ticket
import com.example.reserveit.repo.ReservationRepo
import kotlinx.coroutines.launch

class TrainScheduleDetailsViewModel(
    private  val reservationRepo: ReservationRepo
) : ViewModel() {

    private val _selectedTicket = MutableLiveData<Ticket>()
    private val _totalPrice = MutableLiveData<Int>()
    val selectedTicket: MutableLiveData<Ticket>
        get() = _selectedTicket
    val totalPrice: MutableLiveData<Int>
        get() = _totalPrice


    fun setSelectedTicket(ticket: Ticket){
        selectedTicket.value = ticket
    }

    fun calculateTotalPrice(quantity:Int) {
        if(_selectedTicket.value == null) return
        totalPrice.value  = (_selectedTicket.value?.ticketPrice?.times(quantity))?.toInt()
    }

    fun addReservation(reservation: Reservation) {

        viewModelScope.launch {
            try {
                reservationRepo.addReservation(reservation)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }


}