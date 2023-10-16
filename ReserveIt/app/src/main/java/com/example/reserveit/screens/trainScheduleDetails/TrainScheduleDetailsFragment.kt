package com.example.reserveit.screens.trainScheduleDetails

import com.example.reserveit.R
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.example.reserveit.MainActivity

import com.example.reserveit.databinding.FragmentTrainScheduleDetailsBinding
import com.example.reserveit.models.login.LoginModel
import com.example.reserveit.models.reservation.Reservation
import com.example.reserveit.repo.ReservationRepo
import com.example.reserveit.util.SharedPreferenceService
import com.example.reserveit.utill.AppConstants
import com.google.android.material.chip.Chip
import com.google.android.material.snackbar.Snackbar
import kotlin.random.Random


class TrainScheduleDetailsFragment : Fragment() {

    private var binding :FragmentTrainScheduleDetailsBinding? = null
    private lateinit var viewModel: TrainScheduleDetailsViewModel
    val args : TrainScheduleDetailsFragmentArgs by navArgs()


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        binding = FragmentTrainScheduleDetailsBinding.inflate(inflater, container, false)
        val reservationRepo = ReservationRepo()
        viewModel = TrainScheduleDetailsViewModel(reservationRepo)
      (activity as MainActivity?)!!.hideBottomNavigationView()

        binding!!.topAppBar.setNavigationOnClickListener {
            findNavController().popBackStack()
        }

        binding!!.checkOutBtn.isEnabled = false
        binding!!.startEndStation.text = args.trainDetails.startStation + " - " + args.trainDetails.endStation
        binding!!.trainBasicDetails.text = args.trainDetails.trainName + " - " + args.trainDetails.trainNumber
        binding!!.departTime.text = args.trainDetails.trainStartTime
        binding!!.arriveTime.text = args.trainDetails.trainEndTime
        binding!!.trainDepartureDate.text = args.trainDetails.departureDate

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

        for (item in args.trainDetails.tickets) {
            val chip = inflater.inflate(R.layout.chip_style, binding!!.chipGroup, false) as Chip
            if (item != null) {
                chip.id = View.generateViewId()
                chip.text = item.ticketType
            }
            chip.isClickable = true
            chip.isCheckable = true
            chip.setOnClickListener(View.OnClickListener {
                if (item != null) {
                    viewModel.setSelectedTicket(item)

                }
            })
            binding!!.chipGroup.addView(chip)

        }
//        binding!!.chipGroup.isSingleSelection = true

        viewModel.selectedTicket.observe(viewLifecycleOwner) {
            if(binding!!.noSeats.text.toString().isNotEmpty()){
                viewModel.calculateTotalPrice(binding!!.noSeats.text.toString().toInt())
            }
        }
        viewModel.totalPrice.observe(viewLifecycleOwner) {
            binding!!.totalPriceCard.visibility = View.VISIBLE
            binding!!.totalPrice.text = "LKR $it.00"
            binding!!.checkOutBtn.isEnabled = true
        }


        SharedPreferenceService.initialize(requireContext())
        val sharedPreferences =  SharedPreferenceService.loadObject(AppConstants.USER_DATA, LoginModel::class.java)
//
//
        binding!!.checkOutBtn.setOnClickListener {

            if (sharedPreferences != null && sharedPreferences is LoginModel) {

                if(sharedPreferences.data != null){
                    val reservation = Reservation(
                        args.trainDetails.departureDate,
                        args.trainDetails.id,
                        sharedPreferences.data.userId,
                        binding!!.noSeats.text.toString().toLong(),
                        viewModel.selectedTicket.value!!
                    )
                    viewModel.addReservation(reservation)
                    findNavController().popBackStack()
                }
            }else{
                Snackbar.make(binding!!.mainLayout, "Please login to continue", Snackbar.LENGTH_SHORT,)
                    .show()
//                findNavController().navigate(R.id.action_trainScheduleDetailsFragment_to_profileFragment)
            }

        }


        return binding?.root
    }

    override fun onResume() {
        super.onResume()
        (activity as MainActivity?)!!.hideBottomNavigationView()
        val noSeats = resources.getStringArray(R.array.no_seats)
        val arradapter = context?.let { ArrayAdapter(it, R.layout.dropdown_item, noSeats) }
        binding!!.noSeats.setAdapter(arradapter)
    }

    override fun onDestroy() {
        super.onDestroy()
        (activity as MainActivity?)!!.showBottomNavigationView()
    }
}