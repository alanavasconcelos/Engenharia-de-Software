import { View, Text, ScrollView } from "react-native";
import { colors, styles } from "../../styles";
import TextCard from "../components/TextCard";
//import { IconButton } from 'react-native-paper';
import { useState, useEffect } from "react";
import { toggleToPrizes, readPrizes, isInPrizes } from "../functions/localStorage";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function WinnersInfo({ route, navigation }) {

    const { nobelObject } = route.params
    const { year, laureates, motivation, category } = route.params.nobelObject
    const [starFilled, setStarFilled] = useState(false);

    useEffect(() => {
        isInPrizes(nobelObject).then(res => setStarFilled(res))
    }, [])

    const favoritar = () => {
        setStarFilled(!starFilled)
        toggleToPrizes(nobelObject).then(readPrizes).then((prize) => console.log(JSON.stringify(prize)))
    }

    return (
        <ScrollView style={{ flex: 1, width: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[styles.box2, { justifyContent: "space-around", paddingTop: 80 }]}>
                <View style={[styles.box2, { flex: 2, paddingHorizontal: 20 }]} >
                    <View style={styles.fav}>
                        <Ionicons.Button
                            name={starFilled ? 'star' : 'star-outline'}
                            style={{ size: 10, backgroundColor: colors.primaryDark }}
                            onPress={favoritar}></Ionicons.Button>

                    </View>
                    <Text style={styles.titleWinner}>{category + " Nobel Prize" + " - " + year}</Text>
                    <Text style={styles.text2}>{motivation}</Text>
                </View>
                {
                    laureates &&
                    <View style={[styles.box2, { flex: 1, rowGap: 20, paddingBottom: 50 }]}>
                        <Text style={[styles.text, { fontSize: 25 }]}>Laureates</Text>
                        {
                            laureates.map(laureate =>
                                (laureate.isPerson == true || laureate.isPerson == undefined) ?
                                    <TextCard
                                        text={laureate.name}
                                        onPress={() => navigation.navigate("WinnerInfo", { id: laureate.id })}
                                    /> :
                                    <Text style={[styles.text, { fontSize: 16 }]}>{laureate.name}</Text>
                            )
                        }
                    </View>
                }
            </View>
        </ScrollView>
    );
}


//<IconButton
//icon={starFilled ? 'star' : 'star-outline'}
//size={40}
//onPress={favoritar}
///>
