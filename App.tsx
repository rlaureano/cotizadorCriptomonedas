import React, { useState } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';

import { StyleSheet, Image, View } from 'react-native';

const App = (): JSX.Element => {

  const [ moneda, setMoneda ] = useState('')
  const [ criptoMoneda, setCriptoMoneda ] = useState('')
  const [ consultarAPI, setConsultarAPI ] = useState(false)
  
  return (
    <>
      <Header />
      <Image style={styles.image} source={require('./assets/img/cryptomonedas.png')}/>
      <View style={styles.contenido}>
        <Formulario moneda={moneda} setMoneda={setMoneda} criptoMoneda={criptoMoneda} setCriptoMoneda={setCriptoMoneda} 
          setConsultarAPI={setConsultarAPI}/>
      </View>
    </>
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
