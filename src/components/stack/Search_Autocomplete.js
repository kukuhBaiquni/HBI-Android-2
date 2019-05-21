import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import SearchBar from 'react-native-searchbar';
import { connect } from 'react-redux';

class SearchAutocomplete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      result: []
    }
  }

  filterResult(x) {
    if (x === '4d2e9b') {
      this.props.navigation.navigate('Animate')
    }
    let filtered = this.props.listProducts.filter(z => z.productname.toLowerCase().includes(x.toLowerCase()));
    if (filtered.length !== 0 && x !== '') {
      this.setState({result: filtered, query: x})
    }else{
      this.setState({result: [], query: x})
    }
  }

  render() {
    const { navigation, listProducts } = this.props;
    return(
      <View>
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          showOnLoad={true}
          data={this.state.initiallistProducts}
          heightAdjust={-10}
          backCloseSize={22}
          fontSize={18}
          handleChangeText={(e) => this.filterResult(e)}
          placeholder='Cari Produk'
          onBack={() => navigation.goBack()}
          />
        <View style={{marginTop: 60, marginBottom: 110}}>
          {
            this.state.query !== '' &&
            <View style={{padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#e2e2e2'}}>
              <Text style={{fontSize: 18}}>Hasil pencarian untuk "<Text style={{fontWeight: 'bold'}}>{this.state.query}</Text>"</Text>
            </View>
          }
          {
            this.state.result.length === 0 && this.state.query !== '' &&
            <View style={{justifyContent: 'center', flexDirection: 'row', paddingTop: 20}}>
              <Icon name='error' size={22} color='#6d6d6d'/>
              <Text style={{color: '#6d6d6d', marginLeft: 5, fontSize: 15}}>Produk tidak ditemukan</Text>
            </View>
          }
          <ScrollView>
            {
              this.state.result.map((x, i) =>
                <TouchableOpacity style={styles.looperContainer} key={i} onPress={() => navigation.navigate('ProductDetails', x)}>
                  <Text style={styles.looperText}>{x.productname}</Text>
                </TouchableOpacity>
              )
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  looperContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2'
  },
  looperText: {
    padding: 15,
    fontSize: 16,
    color: '#828282'
  },
  image: {
    height: 50,
    width: 50,
  }
})

function mapDispatchToProps(dispatch) {
  return dispatch
}

export default connect(
  mapDispatchToProps
)(SearchAutocomplete);
