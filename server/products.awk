BEGIN { productsWritten = 0;FS=":";printf("{\n\"productsList\":[\n"); }
	{
	  if ($1 ~ /^[0-9]+/) {
		if (productsWritten > 0) { printf(",\n") }
		printf("{ \"name\": \"%s\", \"price\": %s, \"type\": \"MAIN\", \"category\": \"\" }", $2, $3);
		productsWritten++;
      }
	}
END { printf("\n],\n\"productsCount\":%d\n}", productsWritten) }
