// timecodeclock.jsx
// For After Effects

function run() {
	var comp = app.project.activeItem;
	if (!(comp instanceof CompItem)) {
		alert("Please select a text layer.");
		return;
	}
	var layer = comp.selectedLayers[0];
	if (!(layer instanceof TextLayer)) {
		alert("Please select a text layer.");
		return;
	}

	app.beginUndoGroup("timecodeclock.jsx");

	var hSld = layer.Effects.addProperty("ADBE Slider Control");
	hSld.name = "Start hour";
	hSld.property(1).setValue(00);

	var mSld = layer.Effects.addProperty("ADBE Slider Control");
	mSld.name = "Start minute";
	mSld.property(1).setValue(00);

	var sSld = layer.Effects.addProperty("ADBE Slider Control");
	sSld.name = "Start second";
	sSld.property(1).setValue(00);

	var sSld = layer.Effects.addProperty("ADBE Slider Control");
	sSld.name = "Start frame";
	sSld.property(1).setValue(00);

	var speedSld = layer.Effects.addProperty("ADBE Slider Control");
	speedSld.name = "FPS";
	speedSld.property(1).setValue(30);

	layer.sourceText.expression =
		"function Format(x) \r" +
		"{ \r" +
		"   return (x < 10) ? \"0\" + x : \"\" + x; \r" +
		"} \r" +
		" \r" +
		"H_init = effect(\"Start hour\")(1); \r" +
		"M_init = effect(\"Start minute\")(1); \r" +
		"S_init = effect(\"Start second\")(1); \r" +
		"F_init = effect(\"Start frame\")(1); \r" +
		"fps = effect(\"FPS\")(1); \r" +
		"f = time*fps; \r" +
		"t = time*1; \r" +
		" \r" +
		"F_temp = F_init + Math.floor(f); \r" +
		"S_temp = S_init + Math.floor(t); \r" +
		"M_temp = M_init + Math.floor(S_temp/60); \r" +
		"H_temp = H_init + Math.floor(M_temp/60); \r" +

		" \r" +
		"F = Format(F_temp%fps); \r" +
		"S = Format(S_temp%60); \r" +
		"M = Format(M_temp%60); \r" +
		"H = Format(H_temp%24); \r" +
		" \r" +
		"H + \":\" + M + \":\" + S + \":\" + F";

	app.endUndoGroup();
}

run();