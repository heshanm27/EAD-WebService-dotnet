package com.example.reserveit.screens.home

import androidx.lifecycle.ViewModel
import com.example.reserveit.models.train_schedule.TrainSchedule

class HomeViewModel: ViewModel() {

    private  val _trainScheduleList = mutableListOf<TrainSchedule>()


    val trainScheduleList: List<TrainSchedule>
        get() = _trainScheduleList


    fun addReservation(trainSchedule: TrainSchedule){
        _trainScheduleList.addAll(listOf(    TrainSchedule("Colombo", "Kandy", "08:00", "10:00", "Rs. 1100"),
            TrainSchedule("Galle", "Kandy", "09:30", "11:30", "Rs. 1200"),
            TrainSchedule("Jaffna", "Kandy", "10:45", "12:45", "Rs. 1300"),
            TrainSchedule("Matara", "Kandy", "11:15", "13:15", "Rs. 950"),
            TrainSchedule("Anuradhapura", "Kandy", "07:30", "09:30", "Rs. 1300"),
            TrainSchedule("Kandy", "Colombo", "13:00", "15:00", "Rs. 1000"),
            TrainSchedule("Kandy", "Galle", "14:30", "16:30", "Rs. 1100"),
            TrainSchedule("Kandy", "Jaffna", "15:45", "17:45", "Rs. 1250"),
            TrainSchedule("Kandy", "Matara", "16:15", "18:15", "Rs. 970"),
            TrainSchedule("Kandy", "Anuradhapura", "12:30", "14:30", "Rs. 1200")))
    }

    fun removeReservation(trainSchedule: TrainSchedule){
        _trainScheduleList.remove(trainSchedule)
    }

    fun clearReservation(){
        _trainScheduleList.clear()
    }





}