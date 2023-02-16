import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

type TypePops = {
  moneda: string, 
  setMoneda: (moneda: string) => void, 
  criptoMoneda: string, 
  setCriptoMoneda: (criptoMoneda: string) => void,
  setConsultarAPI: (val: boolean) => void,
}

const Formulario = ({moneda, setMoneda, criptoMoneda, setCriptoMoneda, setConsultarAPI}: TypePops) => {

  const [ criptoSetMonedas, setcriptoSetMonedas ] = useState([])

  const obtenerMoneda = (moneda: string) => {
    setMoneda(moneda)
  }

  useEffect( () => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const resultado = await axios.get(url)
      setcriptoSetMonedas(resultado.data.Data)
    }

     consultarAPI()

  },[])

  const obtenetCriptomoneda = (criptoMoneda: string) => {
    setCriptoMoneda(criptoMoneda)
  }

  const cotizarPrecio = () => {
    if( [moneda, criptoMoneda].includes('') ) 
      return mostrarAlerta()
  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Error...',
      'Ambos campos son obligatorios',
      [
        {text: 'Aceptar'}
      ]
    )
  }

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={obtenerMoneda}
        itemStyle={{height: 120}}
      >
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dola de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptoMoneda}
        onValueChange={obtenetCriptomoneda}
      >
        <Picker.Item label="- Seleccione -" value="" />
        {
          criptoSetMonedas.map( ({CoinInfo}:any) => 
            <Picker.Item label={CoinInfo?.FullName} value={CoinInfo?.Name} key={CoinInfo?.id}/>
          )
        }
      </Picker>

      <Pressable style={styles.botonCotizar} onPress={cotizarPrecio}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20
  },
  botonCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20
  },
  textoCotizar: { 
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center'
  }
})

export default Formulario