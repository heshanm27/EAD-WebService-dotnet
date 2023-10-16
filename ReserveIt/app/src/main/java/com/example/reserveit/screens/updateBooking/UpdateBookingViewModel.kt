package com.example.reserveit.screens.updateBooking

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.reserveit.models.reservation.Reservation
import com.example.reserveit.models.train_schedule.Ticket
import com.example.reserveit.models.train_schedule.TrainData
import com.example.reserveit.repo.ReservationRepo
import com.example.reserveit.repo.TrainScheduleRepo
import kotlinx.coroutines.launch

class UpdateBookingViewModel(
    private val reservationRepo: ReservationRepo,
    private val trainSchedule:TrainScheduleRepo,
) : ViewModel() {

    private val _selectedTicket = MutableLiveData<Ticket>()
    private val _oneTrainSchedule = MutableLiveData<TrainData>()
    private val _totalPrice = MutableLiveData<Int>()
    private val _isLoading = MutableLiveData<Boolean>()

    val isLoading: MutableLiveData<Boolean>
        get() = _isLoading

    val selectedTicket: MutableLiveData<Ticket>
        get() = _selectedTicket
    val totalPrice: MutableLiveData<Int>
        get() = _totalPrice
    val oneTrainSchedule: MutableLiveData<TrainData>
        get() = _oneTrainSchedule


    fun updateBooking(id: String,reservation: Reservation) {
        viewModelScope.launch{
            try {
                reservationRepo.updateReservation(id,reservation)

            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

    }

    fun getTrainSchedule(
        id: String
    ){
        viewModelScope.launch {

            try {
                _isLoading.value = true


                val response = trainSchedule.getOneTrainSchedule(id)

                if (response.isSuccessful) {
                    val data = response.body()
                    if (data != null) {
                        _oneTrainSchedule.value = data.data
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }finally {
                _isLoading.value = false
            }

        }


    }

    fun setSelectedTicket(ticket: Ticket){
        selectedTicket.value = ticket
    }

    fun calculateTotalPrice(quantity:Int) {
        if(_selectedTicket.value == null) return
        totalPrice.value  = (_selectedTicket.value?.ticketPrice?.times(quantity))?.toInt()
    }
}