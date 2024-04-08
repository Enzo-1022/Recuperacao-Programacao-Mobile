import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInputMask, TextMask } from 'react-native-masked-text'

interface Elemento {
  id: string,
  nome: string,
  rg: string,
  idade: string,
  telefone: string,
  email: string,
  endereco: string,
  curso: string
}


export default function App() {

  const [ elementos , setElementos ] = React.useState<Elemento[]>([]);

  const [ novoNome , setNovoNome ] = React.useState('');
  const [ novoRg , setNovoRg ] = React.useState('');
  const [ novoTelefone , setNovoTelefone ] = React.useState('');
  const [ novoEmail , setNovoEmail ] = React.useState('');
  const [ novaIdade , setIdade ] = React.useState('');
  const [ novoCurso , setCurso ] = React.useState('');
  const [ novoEndereco , setNovoEndereco ] = React.useState('')

  // Lista De cursos para fazer o select dropdown
  const cursos = [
    {label: 'Enfermagem', value: 'Enfermagem'},
    {label: 'Adiministração', value: 'Adiministracao'},
    {label: 'Desenvolvimento De Sistemas', value: 'Desenvolvimento-de-sistemas'}  
  ];

  // Função Para Adicionar os dados cadastrados a lista de elementos
  const adcElemento = () => {

    const dados = {
      id:  String(new Date().getTime()),
      nome: novoNome ? novoNome : 'Nome vazio',
      rg: novoRg ? novoRg : 'Rg Vazio',
      idade: novaIdade ? novaIdade : 'Idade Vazia',
      telefone: novoTelefone ? novoTelefone : 'Telefone vazio',
      email: novoEmail ? novoEmail : 'Email Vazio',
      endereco: novoEndereco ? novoEndereco : 'Endereço vazio',
      curso: novoCurso ? novoCurso : 'Curso vazio'
    };


    // Verificação para saber se a idade do usuario é maior que 18 anos
    if (Number(novaIdade) < 18) {

      // Se a idade informada for menor que 18 exibirá um alerta na tela, e ira limpar o campo da idade
      Alert.alert('Voce tem q ter mais de 18 anos para se inscrever!!');
      setIdade('')
      

    } else {

      // Se o usuario tiver a idade maior que 18 anos, o sistema irá adicionar os dados dele na matriz elementos.
      setElementos([...elementos, dados]);
      
      // Após adicionar os dados na matriz limpamos os conteudos das variaveis consequentemente tambem limpamos os inputs, pois passamos os valores das variaveis para eles.
      setNovoNome('');
      setNovoRg('');
      setIdade('');
      setNovoTelefone('');
      setNovoEmail('');
      setNovoEndereco('');
      setCurso('');
    }

  }

  // Função que remove os dados de um registro da matriz.
  const removerElemento = (id: string) => {
    const elementosAtualizados = elementos.filter((elemento) =>
      elemento.id !== id);
    setElementos(elementosAtualizados);
  };

  // Renderiza o template da nossa aplicação.
  return (
    // Container Principal 
    <View style={styles.container}>

      {/* Faz o background gradient da aplicação */}
      <LinearGradient
        // Background Linear Gradient
        colors={['#00E9BE', '#00C7CE', '#0088DE']}
        style={styles.background}
      />

      {/* Boxs do header da pagina, onde fica o titulo. */}
      <View style={styles.header}>
        <Text style={styles.tituloSite}>Inscrição Para Cursos Tecnicos.</Text>
      </View>
    
      {/* Box do formulario aonde acontece a coleta de dados */}
      <View style={styles.form}>

        <Text style={styles.labels}>Nome: </Text>
        <TextInput placeholder='Insira seu Nome' placeholderTextColor="#000" style={styles.inputs} onChangeText={setNovoNome} value={novoNome}/>

        <Text style={styles.labels}>Rg:</Text>
        <TextInput placeholder='Insira seu RG' placeholderTextColor="#000" style={styles.inputs} onChangeText={setNovoRg} value={novoRg}/>

        <Text style={styles.labels}>Idade: </Text>
        <TextInput placeholder='Insira sua Idade' placeholderTextColor="#000" onChangeText={setIdade} style={styles.inputs} keyboardType='numeric' value={novaIdade}/>

        <Text style={styles.labels}>Telefone: </Text>
        <TextInputMask
          placeholder='Telefone'
          type={'cel-phone'}
          options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask:' (99)'
          }}
          value={novoTelefone}
          onChangeText={setNovoTelefone}
          style={styles.inputs}
          placeholderTextColor="#000"
        />

        <Text style={styles.labels}>Email: </Text>
        <TextInput placeholder='Insira seu Email'  placeholderTextColor="#000" style={styles.inputs} inputMode='email' onChangeText={setNovoEmail} value={novoEmail}/>

        <Text style={styles.labels}>Endereço</Text>
        <TextInput placeholder='Insira seu endereço' placeholderTextColor="#000" style={styles.inputs} onChangeText={setNovoEndereco} value={novoEndereco}/>

        <Text style={styles.labels}>curso: </Text>

        <View style={styles.boxSelect}>
          <RNPickerSelect
            placeholder={{ color: 'black',label: 'Selecione um curso', value: null }}
            items={cursos}
            onValueChange={(value) => setCurso(value)}
            value={cursos}
          />
        </View>

        <TouchableOpacity onPress={adcElemento} activeOpacity={0.7}  style={styles.botao}>
          <Text style={styles.txtBotao}>Registrar</Text>
        </TouchableOpacity>

      </View>

      {/* Box onde sera exibido os registros coletados da aplicação */}
      <View style={styles.registros}>

        <Text style={styles.tituloRegistros}>Registros </Text>
        <FlatList
          data={elementos}
          keyExtractor={(item: Elemento) => item.id}
          renderItem={({ item }: { item: Elemento }) => (
            <TouchableOpacity onPress={() => removerElemento(item.id)} style={styles.lista} >
              <Text style={styles.dadosLista}>Id: {item.id}</Text>
              <Text style={styles.dadosLista}>Nome: {item.nome}</Text>
              <Text style={styles.dadosLista}>Idade: {item.idade}</Text>
              <Text style={styles.dadosLista}>Curso: {item.curso}</Text>
              <Text style={styles.dadosLista}>Email: {item.email}</Text>
              <Text style={styles.dadosLista}>RG: {item.rg}</Text>
              <Text style={styles.dadosLista}>Telefone: {item.telefone}</Text>
              <Text style={styles.dadosLista}>Endereço: {item.endereco}</Text>
              
            </TouchableOpacity>
          )}
        />

      </View>

      <StatusBar style="auto" />

    </View>
  );
}

// Todos os estilos da aplicação.
const styles = StyleSheet.create({
  // Configuração do background para que o gradient possa ser exibido em toda a tela.
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },

  // Configuração de estilo do container principal.
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Header
  header:{
    width: '95%',
    top: 50,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgb(242,242,242)',
    position: 'absolute'
  },

  tituloSite: {
    fontSize: 20,
    textAlign: 'center'
  },

  // Box do formulario.
  form:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(242,242,242,0.7)',
    width: '90%',
    height: 520,
    top: 111,
    borderRadius: 20,
    marginBottom: 500,
    position: 'absolute'
  },

  inputs: {
    width: '90%',
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 5,
    color: 'white'
  },

  botao: {
    width: '90%',
    padding: 5,
    marginTop: 10, 
    backgroundColor: '#4C5958',
    borderRadius: 5
  },

  txtBotao: {
    textAlign: 'center',
    color: 'white'
  },

  labels: {
    textAlign: 'left',
    width: '89%',
    fontSize: 15.6,
    marginTop: 4
  },

  select: {
    width: '90%',
    backgroundColor: 'grey'
  },


  // Box registros
  registros:{
    position: 'absolute',
    top: 640,
    backgroundColor: 'rgba(242,242,242,0.7)',
    width: '90%',
    height: 380,
    borderRadius: 20,
    padding: 15
  },

  lista: {
    padding: 10,
    backgroundColor: 'grey',
    marginTop: 5,
    borderRadius: 20,
  },

  dadosLista: {
    fontSize: 15,
    color: 'white'
  },

  tituloRegistros: {
    fontSize: 20,
    textAlign: 'center'
  },

  boxSelect: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 15,
  }
});
