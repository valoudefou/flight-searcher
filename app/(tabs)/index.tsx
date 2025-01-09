import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useFsFlag } from "@flagship.io/react-native-sdk";

// Define the Flight interface
interface Flight {
  id: number;
  airline: string;
  price: string;
  departure: string;
  return: string;
  remainingSeats?: number;
  discounted?: boolean;
  originalPrice?: string; // Add this line
}

const FlightSearch = () => {
  const flagSeatRemainingVal = useFsFlag("flagSeatRemaining");
  const flagSeatRemaining = flagSeatRemainingVal.getValue(false);
  const flagSeatRemainingMessageColorVal = useFsFlag("flagSeatRemainingMessageColor");
  const flagSeatRemainingMessageColor = flagSeatRemainingMessageColorVal.getValue('#2196f3');
  const flagPercentageDiscountVal = useFsFlag("flagPercentageDiscount");
  const flagPercentageDiscount = flagPercentageDiscountVal.getValue(0);
  const flagDiscountIfSeatLeftLessThanVal = useFsFlag("flagDiscountIfSeatLeftLessThan");
  const flagDiscountIfSeatLeftLessThan = flagDiscountIfSeatLeftLessThanVal.getValue(2);

  const [origin, setOrigin] = useState('LON');
  const [destination, setDestination] = useState('PAR');
  const [outboundDate, setOutboundDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flightData, setFlightData] = useState<Flight[]>([]); // State initialized with Flight[] type
  const [loading, setLoading] = useState(false);
  const [showOutboundDatePicker, setShowOutboundDatePicker] = useState(true);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(true);

  const fakeFlightData: Flight[] = [ // Added type annotation to fakeFlightData
    { id: 1, airline: 'Ryanair', price: '$500', departure: '2025-01-04 10:00 AM', return: '2025-01-06 12:00 PM', remainingSeats: 2 },
    { id: 2, airline: 'Air Canada', price: '$550', departure: '2025-01-04 02:00 PM', return: '2025-01-06 04:00 PM', remainingSeats: 7 },
    { id: 3, airline: 'Air France', price: '$600', departure: '2025-01-04 06:00 PM', return: '2025-01-06 08:00 PM', remainingSeats: 7 },
    { id: 4, airline: 'British Airways', price: '$800', departure: '2025-01-04 07:00 PM', return: '2025-01-06 08:00 PM', remainingSeats: 18 },
    { id: 5, airline: 'KLM', price: '$1000', departure: '2025-01-04 09:00 PM', return: '2025-01-06 08:00 PM', remainingSeats: 5},
    { id: 6, airline: 'Germanwings', price: '$1300', departure: '2025-01-04 10:00 PM', return: '2025-01-06 08:00 PM', remainingSeats: 10 },
  ];

  const handleSearch = () => {
    if (!origin || !destination || !outboundDate || !returnDate) {
      alert('Please fill all the fields');
      return;
    }
  
    Keyboard.dismiss();
    setLoading(true);
    setTimeout(() => {
      if (flagSeatRemaining && flagPercentageDiscount !== 0) {
        const updatedFlightData = fakeFlightData.map((flight) => {
          if (flight.remainingSeats && flight.remainingSeats <= flagDiscountIfSeatLeftLessThan) {
            const { shouldShowDiscount } = calculateDiscountedPrice(flight.price, flagPercentageDiscount);
            return { 
              ...flight,
              discounted: shouldShowDiscount 
            };
          }
          return flight;
        });
        setFlightData(updatedFlightData);
      } else {
        setFlightData(fakeFlightData);
      }
      setLoading(false);
    }, 1000);
  };  

  const handleSearchAgain = () => {
    setFlightData([]);
  };

  const calculateDiscountedPrice = (originalPrice: string, discountFactor: number): {
    shouldShowDiscount: boolean;
    price: string;
  } => {
    const originalAmount = parseFloat(originalPrice.slice(1));
    const discountedAmount = originalAmount * discountFactor;
    
    // If discounted amount is 0, return original price with flag to not show discount
    if (discountedAmount === 0) {
      return {
        shouldShowDiscount: false,
        price: originalPrice
      };
    }
    
    return {
      shouldShowDiscount: true,
      price: `$${discountedAmount.toFixed(2)}`
    };
  };  

  const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined, type: string) => {
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
          renderItem={({ item }) => {
            const discountResult = item.discounted 
              ? calculateDiscountedPrice(item.price, flagPercentageDiscount)
              : { shouldShowDiscount: false, price: item.price };
          
            return (
              <View style={styles.flightItem}>
                <Text style={styles.flightTitle}>{item.airline}</Text>
          
                <View style={styles.priceContainer}>
                  {discountResult.shouldShowDiscount && (
                    <Text style={[styles.flightPrice, styles.strikeThrough]}>
                      {item.price}
                    </Text>
                  )}
                  <Text style={styles.flightPrice}>
                    {discountResult.price}
                  </Text>
                </View>
          
                {/* Only show remaining seats if there's a discount (strikethrough price) */}
                {flagSeatRemaining && 
                 item.remainingSeats && 
                 discountResult.shouldShowDiscount && (
                  <Text style={[styles.seatsLeftLabel, { color: flagSeatRemainingMessageColor }]}>
                    {item.remainingSeats} seats left at this price!
                  </Text>
                )}
          
                <Text style={styles.flightDetails}>Departure: {item.departure}</Text>
                <Text style={styles.flightDetails}>Return: {item.return}</Text>
              </View>
            );
          }}                              
        />
        <TouchableOpacity
          style={[styles.searchAgainButton]}
          onPress={handleSearchAgain}
        >
          <Text    
            style={[styles.searchAgainButtonText]}>Search Again
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
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 20,
    borderRadius: 4,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 4,
    marginBottom: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 30,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  searchAgainButton: {
    marginTop: 30,
    marginBottom: 120,
    padding: 10,
    alignItems: 'center',
  },
  searchAgainButtonText: {
    fontSize: 18,
    color: "#007bff",
    fontWeight: 400
  },
  flightItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    elevation: 2,
  },
  flightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  flightPrice: {
    fontSize: 16,
    fontWeight: '400',
    color: '#007bff',
    marginRight: 10,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: '#a9a9a9',
  },
  seatsLeftLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flightDetails: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default FlightSearch;
