package com.example.reserveit.screens.home

import androidx.lifecycle.ViewModel
import com.example.reserveit.models.reservation.Reservation

class HomeViewModel: ViewModel() {

    private  val _reservationList = mutableListOf<Reservation>()


    val reservationList: List<Reservation>
        get() = _reservationList


    fun addReservation(reservation: Reservation){
        _reservationList.addAll(listOf(    Reservation("Colombo", "Kandy", "08:00", "10:00", "Rs. 1100"),
            Reservation("Galle", "Kandy", "09:30", "11:30", "Rs. 1200"),
            Reservation("Jaffna", "Kandy", "10:45", "12:45", "Rs. 1300"),
            Reservation("Matara", "Kandy", "11:15", "13:15", "Rs. 950"),
            Reservation("Anuradhapura", "Kandy", "07:30", "09:30", "Rs. 1300"),
            Reservation("Kandy", "Colombo", "13:00", "15:00", "Rs. 1000"),
            Reservation("Kandy", "Galle", "14:30", "16:30", "Rs. 1100"),
            Reservation("Kandy", "Jaffna", "15:45", "17:45", "Rs. 1250"),
            Reservation("Kandy", "Matara", "16:15", "18:15", "Rs. 970"),
            Reservation("Kandy", "Anuradhapura", "12:30", "14:30", "Rs. 1200")))
    }

    fun removeReservation(reservation: Reservation){
        _reservationList.remove(reservation)
    }

    fun clearReservation(){
        _reservationList.clear()
    }





}