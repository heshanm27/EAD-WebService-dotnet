package com.example.reserveit.models.reservation

import com.example.reserveit.models.booked.BookedTicket
import com.example.reserveit.models.train_schedule.Ticket


/*
* File: Reservation.kt
* Author:
* Description: This model is used to store reservation information.
* */

data class Reservation (
    val reservationDate: String,
    val reservedTrainID: String,
    val reservedUserID: String,
    val reservationSeatCount: Long,
    val ticket: Ticket,
)

