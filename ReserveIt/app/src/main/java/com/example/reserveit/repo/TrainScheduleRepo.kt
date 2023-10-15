package com.example.reserveit.repo

import com.example.reserveit.api.RetrofitInstance
import com.example.reserveit.models.train_schedule.TrainScheduleModel
import com.example.reserveit.models.train_schedule.TrainScheduleModelOne
import retrofit2.Response

class TrainScheduleRepo{

    suspend fun  getTrainSchedules(
        page: Int = 1,
        pageSize: Int = 10,
        order: String = "asc",
        end : String = "",
        start : String = "",
        date : String = ""
    ):Response<TrainScheduleModel> {
        return RetrofitInstance.trainScheduleApi.getTrainSchedule(page, pageSize, order, end , start , date )
    }

    suspend fun getOneTrainSchedule(id: String) :Response<TrainScheduleModelOne> {
        return RetrofitInstance.trainScheduleApi.getOneTrainSchedule(id)
    }
}