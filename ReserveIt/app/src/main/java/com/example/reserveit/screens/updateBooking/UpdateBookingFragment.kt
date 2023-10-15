package com.example.reserveit.screens.updateBooking

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.example.reserveit.MainActivity
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentTrainScheduleDetailsBinding
import com.example.reserveit.databinding.FragmentUpdateBookingBinding
import com.example.reserveit.models.reservation.Reservation
import com.example.reserveit.repo.ReservationRepo
import com.example.reserveit.repo.TrainScheduleRepo
import com.example.reserveit.screens.trainScheduleDetails.TrainScheduleDetailsFragmentArgs
import com.example.reserveit.screens.trainScheduleDetails.TrainScheduleDetailsViewModel
import com.google.android.material.chip.Chip


/*
* File: UpdateBookingFragment.kt
* Author:
* Description: This class is used to display "Update booking" screen.
* */

class UpdateBookingFragment : Fragment() {

    private var binding : FragmentUpdateBookingBinding? = null

    private lateinit var viewModel: UpdateBookingViewModel
    val args : UpdateBookingFragmentArgs by navArgs()
    override fun onResume() {
        super.onResume()
        (activity as MainActivity?)!!.hideBottomNavigationView()
        val noSeats = resources.getStringArray(R.array.no_seats)
        val arradapter = context?.let { ArrayAdapter(it, R.layout.dropdown_item, noSeats) }
        binding!!.noSeats.setAdapter(arradapter)
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentUpdateBookingBinding.inflate(inflater, container, false)
        (activity as MainActivity?)!!.hideBottomNavigationView()
        val reservationRepo = ReservationRepo()
        val trainScheduleRepo = TrainScheduleRepo()
        viewModel = UpdateBookingViewModel(reservationRepo,trainScheduleRepo)

        viewModel.getTrainSchedule(args.editDetails.trainResponse.id)



        (activity as MainActivity?)!!.hideBottomNavigationView()

        binding!!.topAppBar.setNavigationOnClickListener {
            findNavController().popBackStack()
        }

        binding!!.updatebookingBtn.isEnabled = false
        binding!!.startEndStation.text = args.editDetails.trainResponse.startStation + " - " + args.editDetails.trainResponse.endStation
        binding!!.trainBasicDetails.text =args.editDetails.trainResponse.trainName + " - " +args.editDetails.trainResponse.trainNumber
        binding!!.departTime.text = args.editDetails.trainResponse.trainStartTime
        binding!!.arriveTime.text = args.editDetails.trainResponse.trainEndTime
        binding!!.trainDepartureDate.text = args.editDetails.trainResponse.departureDate

        binding!!.noSeats.setText(args.editDetails.reservedSeatCount.toString())
        binding!!.noSeats.addTextChangedListener(object : android.text.TextWatcher {
            override fun afterTextChanged(s: android.text.Editable?) {
                viewModel.calculateTotalPrice(s.toString().toInt())
            }

            override fun beforeTextChanged(
                s: CharSequence?,
                start: Int,
                count: Int,
                after: Int
            ) {

            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {

            }
        })

        viewModel.oneTrainSchedule.observe(viewLifecycleOwner) {
            for (item in it.tickets) {
                val chip = inflater.inflate(R.layout.chip_style, binding!!.chipGroup, false) as Chip
                if (item != null) {
                    chip.id = View.generateViewId()
                    chip.text = item.ticketType
                }

                chip.isClickable = true
                chip.isCheckable = true
                if (item != null) {
                    if(args.editDetails.ticket.id == item.id){
                        viewModel.setSelectedTicket(item)
                        chip.isChecked = true
                    }


                    if(args.editDetails.ticket.id != item.id && !chip.isChecked){
                        chip.isChecked = false
                    }
                }

                chip.setOnClickListener(View.OnClickListener {
                    if (item != null) {
                        viewModel.setSelectedTicket(item)

                    }
                })
                binding!!.chipGroup.addView(chip)

            }
        }


        binding!!.chipGroup.isSingleSelection = true

        viewModel.selectedTicket.observe(viewLifecycleOwner) {
            if(binding!!.noSeats.text.toString().isNotEmpty()){
                viewModel.calculateTotalPrice(binding!!.noSeats.text.toString().toInt())
            }
        }
        viewModel.totalPrice.observe(viewLifecycleOwner) {
            binding!!.totalPriceCard.visibility = View.VISIBLE
            binding!!.totalPrice.text = "LKR $it.00"
            binding!!.updatebookingBtn.isEnabled = true
        }

        binding!!.updatebookingBtn.setOnClickListener {
            val reservation = Reservation(
                args.editDetails.reservedDate,
                args.editDetails.trainResponse.id,
                args.editDetails.userResponse.id,
                args.editDetails.reservedSeatCount,
                viewModel.selectedTicket.value!!,
            )
            viewModel.updateBooking(args.editDetails.id,reservation)
            findNavController().popBackStack()
        }
        return binding?.root
    }



    override fun onDestroy() {
        super.onDestroy()
        (activity as MainActivity?)!!.showBottomNavigationView()
    }

}