package com.example.reserveit.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.reserveit.R
import com.example.reserveit.models.reservation.Reservation

class ReservationAdapter(
    private var bookedList: List<Reservation>,
):RecyclerView.Adapter<ReservationAdapter.ReservationViewHolder>() {

    inner class ReservationViewHolder(itemView: View):RecyclerView.ViewHolder(itemView){


    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ReservationViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.reservation_item, parent, false)
        return ReservationViewHolder(view)
    }

    override fun getItemCount(): Int {
        return bookedList.size
    }

    override fun onBindViewHolder(holder: ReservationViewHolder, position: Int) {

    }


}