import { ThemedText } from "@/components/ThemedText";
import { useRef } from "react";
import { Button, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native-paper";
import Signature from "react-native-signature-canvas";

type SignatureInputProps = {
  onOK?: (signature: string) => void;
};
export function Sign({ onOK }: SignatureInputProps) {
  const ref = useRef<any>();

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature: string) => {
    console.log(signature);
    if (onOK) onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    console.log("end success!");
    ref.current?.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data: any) => {
    console.log(data);
  };

  return (
    // <Modal visible={true}>
    <View style={{ minWidth: 150, minHeight: 150 }}>
      <Signature
        ref={ref}
        onEnd={handleEnd}
        onOK={handleOK}
        onEmpty={handleEmpty}
        onClear={handleClear}
        onGetData={handleData}
        autoClear={false}
        descriptionText={"Firme aquí"}
      />
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gray",
        }}
      >
        <ThemedText style={{ fontSize: 14 }}>Borrar</ThemedText>
      </TouchableOpacity>
    </View>
    // </Modal>
  );
}
