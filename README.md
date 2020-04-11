## Description
Library for processing/extracting information in Variant Call Format (VCF) Files

## QuickStart
### Install
```
import * as vcfParserService from 'variant-call-format-parser';
```

## API

### vcfParserService.extractVariantInfo(file);
`file` string of the VCF file
Returns the contents of the VCF variants 

Return: object

```
const variantInfo = vcfParserService.extractVariantInfo(file);
console.log(variantInfo);
{   
    types: ['CHR20'],
    variantInfo: [
        {
            CHROM: "HPV18"
            POS: "900"
            ID: "."
            REF: "A"
            ALT: "."
            QUAL: "186.996"
            FILTER: "."
            INFO: "DP=55;MQSB=0.870507;MQ0F=0;AF1=0;AC1=0;DP4=32,20,0,0;MQ=49;FQ=-183.988"
            FORMAT: "GT:PL"
            SAMPLE: "0/0:0"
        }, {...}, ...
    ]
}
```

### vcfParserService.extractMetadata(file);
`config` object literal
Configures the instance of jwt-in-cookie 

Return: object

```
const metaData = vcfParserService.extractMetadata(file);
console.log(metaData);
{
    fileformat: "VCFv4.2"
    bcftoolsVersion: "1.10.2+htslib-1.10.2"
    bcftoolsCommand: "mpileup -f /PATH/TO/hg19.fasta /PATH/TO/MY.bam"
    reference: "/PATH/TO/hg19.fasta"
    bcftools_callVersion: "1.10.2+htslib-1.10.2"
    bcftools_callCommand: "call --consensus-caller --pval-threshold 0.05"
    "Date": "Sun Apr  5 08:40:59 2020"
    sampleName: "SAMPLE"
    sampleDate: Fri Sep 11 1998 00:00:00 GMT-0500 (Central Daylight Time) 
} 
```

### vcfParserService.extractDate(file)
`file` VCF file

Extracts the fileDate of the VCF file 

Return: Date

