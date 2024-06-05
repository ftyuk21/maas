export class Options {
    position: google.maps.LatLngLiteral;
    label: { color: string, text: string, fontSize: string, fontWeight: string };
    title: string;
    options: google.maps.MarkerOptions;
    // icon: {
    //   url: string, // icon URL
    //   scaledSize: google.maps.Size; // 尺寸(32, 32)
    //   origin: google.maps.Point; // 原點(0, 0)
    //   anchor: google.maps.Point; // 錨點(16, 16)
    // };

}