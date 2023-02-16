import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

type TypeProps = {
  resultado: {
    PRICE: string,
    HIGHDAY: string,
    LOWDAY: string,
    CHANGEPCT24HOUR: string,
    LASTUPDATE: string
  };
}

const Cotizacion = ({resultado}: TypeProps) => {
  console.log(resultado)
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = resultado

  if( !PRICE ) return null

  return (
    <View style={styles.resultado}>
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}>{PRICE}</Text>
      </Text>
      <Text style={styles.texto}>Precio más alto del día: {''}
        <Text style={styles.span}>{HIGHDAY}</Text>
      </Text>
      <Text style={styles.texto}>Precio más bajo del día: {''}
        <Text style={styles.span}>{LOWDAY}</Text>
      </Text>
      <Text style={styles.texto}>Variación últimas 24 horas: {''}
        <Text style={styles.span}>{CHANGEPCT24HOUR} %</Text>
      </Text>
      <Text style={styles.texto}>Última actualización: {''}
        <Text style={styles.span}>{LASTUPDATE}</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: '#5E49E3',
    padding: 20
  },
  texto: {
    color: '#FFFFFF',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  precio: {},
  span: {
    fontFamily: 'Lato-Black',
  }
})

export default Cotizacion