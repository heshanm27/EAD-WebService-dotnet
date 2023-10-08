package com.example.reserveit.screens.home

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.reserveit.R
import com.example.reserveit.models.reservation.Reservation

class ReservationAdapter(private var reservationList: List<Reservation>) :RecyclerView.Adapter<ReservationAdapter.ReservationViewHolder>() {

        inner class ReservationViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val start = itemView.findViewById<TextView>(R.id.from_station)
            val end = itemView.findViewById<TextView>(R.id.to_station)
            val departTime = itemView.findViewById<TextView>(R.id.depart_time)
            val arriveTime = itemView.findViewById<TextView>(R.id.arrive_time)
            val price = itemView.findViewById<TextView>(R.id.ticket_price)
        }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ReservationViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.reservatiion_item, parent, false)
        return ReservationViewHolder(view)
    }

    override fun getItemCount(): Int {
        return reservationList.size
    }

    override fun onBindViewHolder(holder: ReservationViewHolder, position: Int) {
        val reservation = reservationList[position]
        Log.d("reservation", reservation.toString())
        holder.start?.text = reservation.startStation
        holder.end?.text = reservation.endStation
        holder.departTime?.text = reservation.departTime
        holder.arriveTime?.text = reservation.arriveTime
        holder.price?.text = reservation.price
    }
}