import Background from "../components/Background";
import { View, Image, Pressable, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import iconMedicine from '../../assets/categoryIcons/iconMedicine.png'
import iconPhysics from '../../assets/categoryIcons/iconPhysics.png'
import iconPeace from '../../assets/categoryIcons/iconPeace.png'
import iconLiterature from '../../assets/categoryIcons/iconLiterature.png'
import iconChemistry from '../../assets/categoryIcons/iconChemistry.png'
import iconEconomics from '../../assets/categoryIcons/iconEconomics.png'
import { styles, colors } from "../../styles";
import { saveApis }  from "../functions/salvamento";
import { useEffect } from "react";

export default function HomeScreen({ navigation }) {

    const iconPairs = [["Physiology or Medicine", "Physics"], ["Peace", "Literature"], ["Chemistry", "Economic Sciences"]]

    useEffect(() => {
        saveApis().then(() => console.log("Api used"));
    }, []);

    return (
        <Background title="Nobel Prize Winners">
            <View style={[styles.box, {paddingTop: 25}]}>
                <View style={[styles.box, { width: '70%' }]}>
                    <Searchbar style={{ backgroundColor: colors.tabBar }} inputStyle={{ color: 'white' }} iconColor={colors.text} />
                </View>
                <View style={[styles.box, { flex: 4 }]}>
                    {
                        iconPairs.map(iconPair =>
                            <View style={styles.iconRow}>
                                <Icon category = {iconPair[0]} navigation = {navigation}/>
                                <Icon category = {iconPair[1]} navigation = {navigation}/>
                            </View>
                        )
                    }
                </View>
            </View>
        </Background>
    );

}

function Icon({ category, navigation }) {
    return (
        <Pressable
            style = {{alignItens: 'center'}} 
            onPress={() => navigation.navigate("WinnersByCategory", {category: category, imageSource: categoryIcons[category]})}>
            <Image source={categoryIcons[category]} style={{ width: 100, height: 100 }} />
            <Text style = {[styles.text, {marginTop: 5, fontSize: 12}]} >
                {category == "Physiology or Medicine"? "Medicine": (category == "Economic Sciences"? "Economics": category)}
            </Text>
        </Pressable>
    );
}

const categoryIcons = {
    "Physiology or Medicine": iconMedicine,
    "Chemistry": iconChemistry,
    "Literature": iconLiterature,
    "Physics": iconPhysics,
    "Peace": iconPeace,
    "Economic Sciences": iconEconomics,
}