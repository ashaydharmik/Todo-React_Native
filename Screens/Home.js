import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Home = () => {
    const [todo, setTodo] = useState([]);
    const todoRef = firebase.firestore().collection('todo');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();


    //fetching data
    useEffect(() => {
        todoRef.orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const todo = []
                    querySnapshot.forEach((doc) => {
                        const { heading } = doc.data()
                        todo.push({
                            id: doc.id,
                            heading,
                        })
                    })
                    setTodo(todo)
                }
            )

    }, [])



    //delete todo
    const deleteTodo = (todo) => {
        todoRef.doc(todo.id).delete()
            .then(() => {
                alert("Deleted successfully")
            }).catch(error => {
                alert(error);
            })
    }

    //add todo
    const addTodo = () => {
        //check if we have data
        if (addData && addData.length > 0) {
            //use timestamp to place it in decending order

            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            todoRef.add(data)
                .then(() => {
                    setAddData('');
                    Keyboard.dismiss();
                }).catch(error => {
                    alert(error);
                })

        }
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.formContainer}>
                <TextInput style={styles.input} placeholder='Add a Todo' placeholderTextColor="red"
                    onChangeText={(heading) => setAddData(heading)} value={addData} underlineColorAndroid='transparent'
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>ADD</Text>
                </TouchableOpacity>
            </View>

            <FlatList data={todo} numColumns={1} renderItem={({ item }) => (
                <View>
                    <Pressable style={styles.container} onPress={() => navigation.navigate('Detail', { item })}>

                        <FontAwesome
                            name='trash-o'
                            color='red'
                            onPress={() => deleteTodo(item)}
                            style={styles.todoIcon}

                        />
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>
                                {item.heading[0].toUpperCase() + item.heading.slice(1)}
                            </Text>

                        </View>

                    </Pressable>
                </View>
            )}>

            </FlatList>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 45,
    },
    itemHeading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 22
    },
    formContainer: {
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        marginTop: 100
    },
    input: {
        height: 45,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button:
    {
        height: 47,
        borderRadius: 5,
        backgroundColor: 'green',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    todoIcon: {
        marginTop: 5,
        fontSize: 20,
        marginLeft: 14
    }
})