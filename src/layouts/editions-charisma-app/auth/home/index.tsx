import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../../common-styles/colors';
import {Fonts} from '../../../../common-styles/fonts';
import {OnBoarding} from '../../../../components/editions-charisma-app/on-boarding/on-boarding.component';

export default (props: { navigation, dispatch }): React.ReactElement => {

    const createOrder = () => {
        props.navigation && props.navigation.navigate('CreateOrderStep1');
    }
    const signIn = () => {
        props.navigation && props.navigation.navigate('SignIn', { isOrdering: false });
    }

    const View1 = () => (
        <View style={{ display: 'flex' }}>
            <View style={styles.logo}>
                <Text>LOGO</Text>
            </View>

            <View style={styles.title}>
                <Text style={styles.titleText}>SLIDE 1 EXEMPLE</Text>
            </View>

            <View style={styles.illustration}>
            </View>

            <View style={styles.bottomTextContainer}>
            </View>
        </View>
    )

    const View2 = () => (
        <View>
            <View style={styles.logo}>
                <Text>LOGO</Text>
            </View>

            <View style={styles.title}>
                <Text style={styles.titleText}>SLIDE 2 EXEMPLE</Text>
            </View>

            <View style={styles.illustration}>
            </View>

            <View style={styles.bottomTextContainer}>
            </View>
        </View>
    )

    const View3 = () => (
        <View>
            <View style={styles.logo}>
                <Text>LOGO</Text>
            </View>

            <View style={styles.title}>
                <Text style={styles.titleText}>SLIDE 3 EXEMPLE</Text>
            </View>

            <View style={styles.illustration}>
            </View>

            <View style={styles.bottomTextContainer}>
            </View>
        </View>
    )

    const views = [<View1/>, <View2/>, <View3/>];

    const FooterContent = (footerProps: { signIn: () => any, signUp: () => any }) => (
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
            <View style={{ marginRight: 10 }}>
                <Text style={styles.buttonInfoText}>Déjà client ?</Text>
                <Text onPress={footerProps.signIn}>
                    Se connecter
                </Text>
            </View>
            <View>
                <Text style={styles.buttonInfoText}>Nouveau client ?</Text>
                <Text onPress={footerProps.signUp}>
                    S'inscrire
                </Text>
            </View>
        </View>
    );

    return (
        <OnBoarding
            views={views}
            footerContent={<FooterContent signIn={signIn} signUp={createOrder}></FooterContent>}
        ></OnBoarding>
    );
};

const styles = StyleSheet.create({
    titleText: {
        textAlign: 'center',
        color: Colors.legacyGrey70,
        fontSize: 18,
        fontFamily: Fonts.montserratMedium,
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    bottomTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: 20,
        alignItems: 'center',
        alignContent: 'flex-end',
    },
    bottomText: {
        textAlign: 'right',
        color: Colors.legacyGrey70,
        fontSize: 14,
        fontFamily: Fonts.montserratMedium,
        flex: 1,
    },
    asterix: {
        color: Colors.red,
        width: 10,
    },
    buttonInfoText : {
        textAlign: 'center',
        opacity: 0.5,
        color: Colors.legacyGrey70,
        marginBottom: 5,
        fontFamily: Fonts.montserratMedium,
    },
    logo: {
        height : 90,
        marginTop: 20,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    title: {
        height : 80,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'transparent',
    },
    illustration: {
        flex : 1,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
});
