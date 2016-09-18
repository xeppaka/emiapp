BEGIN { lines_written = 0;FS=":";printf("{\n\"productsList\":[\n"); }
	{ if ($1 ~ /^[0-9]+/) {
		if (lines_written > 0) { printf(",\n") }
		printf("{ \"name\":\"%s\", \"price\":%s }", $2, $3);
		lines_written++;
	} }
END { printf("\n],\n\"products_count\":%d\n}", lines_written) }
