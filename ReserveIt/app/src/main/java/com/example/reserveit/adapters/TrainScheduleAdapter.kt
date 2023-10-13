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
import com.example.reserveit.models.train_schedule.TrainSchedule

/*
* File: TrainScheduleAdapter.kt
* Author:
* Description: This adapter is used to render the train schedule list.
* */

class TrainScheduleAdapter(private var trainScheduleList: List<TrainSchedule>) :RecyclerView.Adapter<TrainScheduleAdapter.ReservationViewHolder>() {

        inner class ReservationViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val start = itemView.findViewById<TextView>(R.id.from_station)
            val end = itemView.findViewById<TextView>(R.id.to_station)
            val departTime = itemView.findViewById<TextView>(R.id.depart_time)
            val arriveTime = itemView.findViewById<TextView>(R.id.arrive_time)
            val price = itemView.findViewById<TextView>(R.id.ticket_price)
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
        val reservation = trainScheduleList[position]
        Log.d("reservation", reservation.toString())
        holder.start?.text = reservation.startStation
        holder.end?.text = reservation.endStation
        holder.departTime?.text = reservation.departTime
        holder.arriveTime?.text = reservation.arriveTime
        holder.price?.text = reservation.price
        holder.card.setOnClickListener {
//            val action = HomeFragmentDirections.actionHomeFragmentToReservationDetailsFragment(reservation)
            holder.card.findNavController().navigate(R.id.action_homeFragment_to_reservation_details_Fragment)
        }
    }
}