import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFsFlag } from "@flagship.io/react-native-sdk";

const FlightSearch = () => {
  const flagSeatRemainingVal = useFsFlag("flagSeatRemaining");
  const flagSeatRemaining = flagSeatRemainingVal.getValue(false);
  const flagSeatRemainingMessageColorVal = useFsFlag("flagSeatRemainingMessageColor");
  const flagSeatRemainingMessageColor = flagSeatRemainingMessageColorVal.getValue('black');
  const flagPercentageDiscountVal = useFsFlag("flagPercentageDiscount");
  const flagPercentageDiscount = flagPercentageDiscountVal.getValue(0);

  const [origin, setOrigin] = useState('LON');
  const [destination, setDestination] = useState('PAR');
  const [outboundDate, setOutboundDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flightData, setFlightData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOutboundDatePicker, setShowOutboundDatePicker] = useState(true);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(true);

  const fakeFlightData = [
    { id: 1, airline: 'Ryanair', price: '$500', departure: '2025-01-04 10:00 AM', return: '2025-01-06 12:00 PM', remainingSeats: 2 },
    { id: 2, airline: 'Air Canada', price: '$550', departure: '2025-01-04 02:00 PM', return: '2025-01-06 04:00 PM', remainingSeats: 7 },
    { id: 3, airline: 'Air France', price: '$600', departure: '2025-01-04 06:00 PM', return: '2025-01-06 08:00 PM', remainingSeats: 7 },
    { id: 4, airline: 'British Airways', price: '$800', departure: '2025-01-04 07:00 PM', return: '2025-01-06 08:00 PM', remainingSeats: 18 },
    { id: 5, airline: 'KLM', price: '$1000', departure: '2025-01-04 09:00 PM', return: '2025-01-06 08:00 PM' },
    { id: 6, airline: 'Germanwings', price: '$1300', departure: '2025-01-04 10:00 PM', return: '2025-01-06 08:00 PM' },
  ];
  console.log('hello');
  const handleSearch = () => {
    if (!origin || !destination || !outboundDate || !returnDate) {
      alert('Please fill all the fields');
      return;
    }

    Keyboard.dismiss(); // Hide the keyboard
    setLoading(true);
    setTimeout(() => {
      if (flagSeatRemaining && flagPercentageDiscount !== 0) { // Only apply discount if flagSeatLeft is true
        const updatedFlightData = fakeFlightData.map((flight) => {
          if (flight.remainingSeats && flight.remainingSeats <= 2) {
            const discountedPrice = parseFloat(flight.price.slice(1)) * flagPercentageDiscount; // Apply discount
            return { ...flight, price: `$${discountedPrice.toFixed(2)}`, discounted: true };
          }
          return flight;
        });
        setFlightData(updatedFlightData);
      } else {
        setFlightData(fakeFlightData); // No discount applied if flagSeatLeft is false
      }
      setLoading(false);
    }, 1000);
  };

  const handleSearchAgain = () => {
    setFlightData([]);
  };

  const onDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || new Date();
    if (type === 'outbound') {
      setOutboundDate(currentDate.toISOString().split('T')[0]);
      setShowOutboundDatePicker(false);
    } else if (type === 'return') {
      setReturnDate(currentDate.toISOString().split('T')[0]);
      setShowReturnDatePicker(false);
    }
  };

  if (flightData.length > 0) {
    return (
      <View style={styles.container}>
        <FlatList
          data={flightData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.flightItem}>
              <Text style={styles.flightTitle}>{item.airline}</Text>
  
              <View style={styles.priceContainer}>
                {item.discounted && (
                  <Text style={[styles.flightPrice, styles.strikeThrough]}>
                    { item.price }
                  </Text>
                )}
                <Text style={styles.flightPrice}>
                  {item.discounted ? `$${(parseFloat(item.price.slice(1)) * flagPercentageDiscount).toFixed(2)}` : item.price}
                </Text>
              </View>
  
              {flagPercentageDiscount !== 0 && item.remainingSeats && item.remainingSeats <= 2 && (
                <Text style={[styles.seatsLeftLabel, { color: flagSeatRemainingMessageColor }]}>
                  {item.remainingSeats} seats left at this price!
                </Text>
              )}
  
              <Text style={styles.flightDetails}>Departure: {item.departure}</Text>
              <Text style={styles.flightDetails}>Return: {item.return}</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={[styles.searchAgainButton, { 
            borderColor: flagSeatRemainingMessageColor,
          }]}
          onPress={handleSearchAgain}
        >
          <Text    
            style={[styles.searchAgainButtonText, { 
              color: flagSeatRemainingMessageColor,
            }]}>Search Again
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flight Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Origin City (e.g., LON)"
        value={origin}
        onChangeText={setOrigin}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination City (e.g., PAR)"
        value={destination}
        onChangeText={setDestination}
      />

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Outbound Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowOutboundDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>{outboundDate || 'Select Outbound Date'}</Text>
        </TouchableOpacity>
        {showOutboundDatePicker && (
          <DateTimePicker
            value={outboundDate ? new Date(outboundDate) : new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'outbound')}
          />
        )}
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Return Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowReturnDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>{returnDate || 'Select Return Date'}</Text>
        </TouchableOpacity>
        {showReturnDatePicker && (
          <DateTimePicker
            value={returnDate ? new Date(returnDate) : new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => onDateChange(event, selectedDate, 'return')}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
        disabled={loading} // Disable the button when loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.searchButtonText}>Search Flights</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  dateContainer: {
    marginBottom: 15,
  },
  dateLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  flightPrice: {
    fontSize: 16,
    color: '#1E90FF',
    marginVertical: 5,
  },
  
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: '#888',  // Light grey color for the old price
    marginRight: 5,
  },
  
  seatsLeftLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  dateButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: 'blue',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchAgainButton: {
    paddingVertical: 16,
    borderRadius: 8,
    borderColor: '#FF4500',
    borderWidth: 2,
    alignSelf: 'stretch', 
    marginTop: 20,
    marginBottom: 150,
  },
  searchAgainButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 600,
  },
  loading: {
    marginTop: 20,
  },
  flightItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  flightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  flightPrice: {
    fontSize: 16,
    color: '#1E90FF',
    marginVertical: 5,
  },
  flightDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default FlightSearch;
