import ronBrugal from "../../assets/ronBrugal.png";
import ginBulldog from "../../assets/GinBULLDOG.png";
import tequilaDonJulio from "../../assets/TequilaDonJulio.png";
import ronBotran from "../../assets/RonBotránRoajú.png";
import ronCaptainMorgan from "../../assets/RonCAPTAINMORGAN.png";
import vodkaSmirnoff from "../../assets/VodkaSmirnoffGreenApple.png";
import florDeCana from "../../assets/FLOR-DE-CAÑA-Spresso-Botella-750ml.png";
import laBotija from "../../assets/LA-BOTIJA-Tabernero-Acholado-botella-700 ml.png";
import jagermeister from "../../assets/jagermeister-700-ml.jpg";
import greenLabel from "../../assets/greenlabel-750ml.png";
import granMalo from "../../assets/granmalo-750ml.png";
import goldLabel from "../../assets/goldlabel-750ml.png";
import blackLabel from "../../assets/blacklabel-750ml.png";
import blueLabel from "../../assets/blue-label-750ml.png";
import causaRellena from "../../assets/CausaRellena.png";
import polloALaBrasa from "../../assets/PolloalaBrasa.png";
import arrozConPollo from "../../assets/ArrozConPollo.png";
import papaHuancaina from "../../assets/PapaHuancaina.png";
import carapulcra from "../../assets/carapulcra.png";
import pallaresVerdes from "../../assets/pallaresverdes.png";
 const obtenerImagenPorNombre = (nombre) => {
    const imagenes = {
        "Ron Brugal": ronBrugal,
        "Gin BULLDOG": ginBulldog,
        "Tequila DON JULIO": tequilaDonJulio,
        "Ron Botrán": ronBotran,
        "Ron CAPTAIN MORGAN": ronCaptainMorgan,
        "Vodka Smirnoff": vodkaSmirnoff,
        "FLOR DE CAÑA": florDeCana,
        "LA BOTIJA": laBotija,
        "Jager Meister": jagermeister,
        "Green Label": greenLabel,
        "Gran Malo": granMalo,
        "Gold Label": goldLabel,
        "Black Label": blackLabel,
        "Blue Label": blueLabel,
        "Causa Rellena": causaRellena,
        "Pollo a la Brasa": polloALaBrasa,
        "Arroz con Pollo": arrozConPollo,
        "Papa a la Huancaína": papaHuancaina,
        "Sopa seca con Carapulcra": carapulcra,
        "Picante de Pallares Verdes": pallaresVerdes,
    };
    return imagenes[nombre] || null;
};

export default obtenerImagenPorNombre;