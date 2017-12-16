const loop= x => f => {
	if (x > 0) {
		f();
		loop (x - 1) (f);
	}
};
// https://stackoverflow.com/a/30452949/1507207
export default {loop};