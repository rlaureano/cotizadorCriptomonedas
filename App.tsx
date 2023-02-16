import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import axios from 'axios';

import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import Cotizacion from './components/Cotizacion';

const App = (): JSX.Element => {

  const [ moneda, setMoneda ] = useState('')
  const [ criptoMoneda, setCriptoMoneda ] = useState('')
  const [ consultarAPI, setConsultarAPI ] = useState(false)
  const [ cargando, setCargando ] = useState(false)
  const [ resultado, setResultado ] = useState({
    PRICE:"",
    HIGHDAY: "",
    LOWDAY: "",
    CHANGEPCT24HOUR: "",
    LASTUPDATE: ""
  })

  useEffect( () => {

    if( consultarAPI ) {
      setCargando(true)
      const utl = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
      const cotizar = async () => {
        const peticion = await axios.get( utl );
        const resultado = peticion?.data?.DISPLAY?.[criptoMoneda]?.[moneda]
        
        setTimeout( () => {
          setResultado(resultado)
          setCargando(false)
        },3000)
        
      }

      cotizar()
      setConsultarAPI(false)
    }

  },[consultarAPI])
  
  return (
    <ScrollView>
      <Header />
      <Image style={styles.image} source={require('./assets/img/cryptomonedas.png')}/>
      <View style={styles.contenido}>
        <Formulario moneda={moneda} setMoneda={setMoneda} criptoMoneda={criptoMoneda} setCriptoMoneda={setCriptoMoneda} 
          setConsultarAPI={setConsultarAPI}/>
      </View>
      <View style={{marginTop: 40}}>
        {
          cargando ? <ActivityIndicator size='large' color='#5E49E2'/> :
            <Cotizacion resultado={resultado}/>
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: {
    marginHorizontal: '2.5%'
  },
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  }
});

export default App;
