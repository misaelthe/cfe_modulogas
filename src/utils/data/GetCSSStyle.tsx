


export const GetCSSStyle = (dataSelected: any[]): string => {

    let cssStyle = "";

    if(dataSelected.length > 0 && dataSelected.length <= 5){
        cssStyle = "ComparativoEnergiaDetail5";
    }else if(dataSelected.length > 5 && dataSelected.length <= 10){
        cssStyle = "ComparativoEnergiaDetail10";
    }else if(dataSelected.length > 10 && dataSelected.length <= 20){
        cssStyle = "ComparativoEnergiaDetail20";
    }else if(dataSelected.length > 20 && dataSelected.length <= 30){
        cssStyle = "ComparativoEnergiaDetail30";
    }else if(dataSelected.length > 30 && dataSelected.length <= 40){
        cssStyle = "ComparativoEnergiaDetail40";
    }else if(dataSelected.length > 40 && dataSelected.length <= 50){
        cssStyle = "ComparativoEnergiaDetail50";
    }

    console.log("")

   return cssStyle;
}
