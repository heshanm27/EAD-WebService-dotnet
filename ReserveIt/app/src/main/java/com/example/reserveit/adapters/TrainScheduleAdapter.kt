package com.example.reserveit.adapters

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.navigation.findNavController
import androidx.recyclerview.widget.RecyclerView
import com.example.reserveit.R
import com.example.reserveit.models.train_schedule.TrainData
import com.example.reserveit.models.train_schedule.TrainScheduleModel
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.TimeZone

class TrainScheduleAdapter(private var trainScheduleList: List<TrainData>) :RecyclerView.Adapter<TrainScheduleAdapter.ReservationViewHolder>() {

        inner class ReservationViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val start = itemView.findViewById<TextView>(R.id.from_station)
            val end = itemView.findViewById<TextView>(R.id.to_station)
            val departTime = itemView.findViewById<TextView>(R.id.depart_time)
            val arriveTime = itemView.findViewById<TextView>(R.id.arrive_time)
            val card = itemView.findViewById<CardView>(R.id.card_main_item)
        }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ReservationViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.train_schedule_item, parent, false)
        return ReservationViewHolder(view)
    }

    override fun getItemCount(): Int {
        return trainScheduleList.size
    }

    override fun onBindViewHolder(holder: ReservationViewHolder, position: Int) {
        val trainData = trainScheduleList[position]
        Log.d("reservation", trainData.toString())
        holder.start?.text = trainData.startStation
        holder.end?.text = trainData.endStation

        holder.departTime?.text = trainData.trainStartTime
        holder.arriveTime?.text = trainData.trainEndTime

        holder.card.setOnClickListener {
            holder.card.findNavController().navigate(R.id.action_homeFragment_to_reservation_details_Fragment)
        }


    }
}