package com.example.reserveit.screens.resrevation

import androidx.lifecycle.ViewModel
import com.example.reserveit.models.reservation.Reservation


class ResrevationViewModel : ViewModel() {

    private  val _reservationList = mutableListOf<Reservation>()


    val reservationList: List<Reservation>
        get() = _reservationList


    fun addReservation(reservation: Reservation){
        _reservationList.addAll(
            listOf(
                Reservation(
                    arriveTime = "10:00",
                    departTime = "08:00",
                    endStation = "Kandy",
                    id = "1",
                    seatNumber = "1",
                    startStation = "Colombo",
                    status = "Pending",
                    totalPrice = "Rs. 1100",
                    trainScheduleId = "1",
                    userId = "1",
                    date = "2021-09-01"
                ),
                Reservation(
                    arriveTime = "11:30",
                    departTime = "09:30",
                    endStation = "Kandy",
                    id = "2",
                    seatNumber = "2",
                    startStation = "Galle",
                    status = "Pending",
                    totalPrice = "Rs. 1200",
                    trainScheduleId = "2",
                    userId = "2",
                    date = "2021-09-01"
                ),
                Reservation(
                    arriveTime = "11:30",
                    departTime = "09:30",
                    endStation = "Kandy",
                    id = "2",
                    seatNumber = "2",
                    startStation = "Galle",
                    status = "Pending",
                    totalPrice = "Rs. 1200",
                    trainScheduleId = "2",
                    userId = "2",
                    date = "2021-09-01"
                ),Reservation(
                    arriveTime = "11:30",
                    departTime = "09:30",
                    endStation = "Kandy",
                    id = "2",
                    seatNumber = "2",
                    startStation = "Galle",
                    status = "Pending",
                    totalPrice = "Rs. 1200",
                    trainScheduleId = "2",
                    userId = "2",
                    date = "2021-09-01"
                ),Reservation(
                    arriveTime = "11:30",
                    departTime = "09:30",
                    endStation = "Kandy",
                    id = "2",
                    seatNumber = "2",
                    startStation = "Galle",
                    status = "Pending",
                    totalPrice = "Rs. 1200",
                    trainScheduleId = "2",
                    userId = "2",
                    date = "2021-09-01"
                ),
            )
        )
    }

    fun removeReservation(reservation: Reservation){
        _reservationList.remove(reservation)
    }

    fun clearReservation(){
        _reservationList.clear()
    }

}