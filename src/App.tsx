import { useState, useRef, useEffect } from "react";
const C = {
bg:"#0e0e0e", ink:"#ffffff", g:"#3be8b0", r:"#ff6b6b",
b:"#4f8ef7", y:"#ffd166", muted:"rgba(255,255,255,0.45)", card:"#1c1c1c"
};
const STATES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut"
const RECON = {
"glp3r": {
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"400 mcg per 0.08 mL · 8 units on U-100 syringe
"15mg": {water:"3 mL",conc:"5 mg/mL",note:"400 mcg per 0.08 mL · 8 units on U-100 syringe
"20mg": {water:"4 mL",conc:"5 mg/mL",note:"400 mcg per 0.08 mL · 8 units on U-100 syringe
"30mg": {water:"6 mL",conc:"5 mg/mL",note:"400 mcg per 0.08 mL · 8 units on U-100 syringe
},
"glp2t": {
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"2.5 mg per 0.5 mL · 50 units on U-100 syringe"
"15mg": {water:"3 mL",conc:"5 mg/mL",note:"2.5 mg per 0.5 mL · 50 units on U-100 syringe"
"20mg": {water:"4 mL",conc:"5 mg/mL",note:"2.5 mg per 0.5 mL · 50 units on U-100 syringe"
},
"glp1": {
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"250 mcg per 0.05 mL · 5 units on U-100 syringe
"20mg": {water:"4 mL",conc:"5 mg/mL",note:"250 mcg per 0.05 mL · 5 units on U-100 syringe
},
"bpc157": {
"5mg": {water:"2 mL",conc:"2.5 mg/mL",note:"250 mcg per 0.1 mL · 10 units on U-100 syrin
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"500 mcg per 0.1 mL · 10 units on U-100 syringe
},
"tb500": {
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"2.5 mg per 0.5 mL · 50 units on U-100 syringe"
},
"cjc1295": {
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"200 mcg per 0.04 mL · 4 units on U-100 syringe
},
"cjcipa": {
"5mg + 5mg": {water:"2 mL",conc:"2.5 mg/mL each",note:"100 mcg each per 0.04 mL · 4 units
},
"ipamorlin": {
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"200 mcg per 0.04 mL · 4 units on U-100 syringe
},
"tesamorlin": {
"5mg": {water:"2 mL",conc:"2.5 mg/mL",note:"2 mg per 0.8 mL · 80 units on U-100 syringe"
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"2 mg per 0.4 mL · 40 units on U-100 syringe"},
},
"igf1lr3": {
"0.1mg": {water:"1 mL", conc:"0.1 mg/mL",note:"10 mcg per 0.1 mL · 10 units · use acetic
"1mg": {water:"2 mL",conc:"0.5 mg/mL",note:"50 mcg per 0.1 mL · 10 units · use acetic a
},
"ghkcu": {
"50mg": {water:"2 mL",conc:"25 mg/mL",note:"1 mg per 0.04 mL · 4 units · use acetic acid
"100mg": {water:"4 mL",conc:"25 mg/mL",note:"1 mg per 0.04 mL · 4 units · use acetic acid
},
"glow": {
"70mg": {water:"4 mL",conc:"17.5 mg/mL",note:"2 mg per 0.11 mL · 11 units on U-100 syring
},
"nad": {
"500mg": {water:"10 mL",conc:"50 mg/mL",note:"50 mg per 1 mL · 100 units on U-100 syringe
},
"motsc": {
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"5 mg per 1 mL · 100 units on U-100 syringe"},
"40mg": {water:"8 mL",conc:"5 mg/mL",note:"5 mg per 1 mL · 100 units on U-100 syringe"},
},
"glutathione": {
"600mg": {water:"6 mL", conc:"100 mg/mL",note:"100 mg per 1 mL · 100 units on U-100 syri
"1500mg": {water:"15 mL",conc:"100 mg/mL",note:"100 mg per 1 mL · 100 units on U-100 syri
},
"ss31": {
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"500 mcg per 0.1 mL · 10 units on U-100 syringe
},
"selank": {
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"250 mcg per 0.05 mL · 5 units on U-100 syringe
},
"semax": {
"10mg": {water:"3 mL",conc:"3.3 mg/mL",note:"500 mcg per 0.15 mL · 15 units on U-100 syri
},
"dsip": {
"5mg": {water:"2 mL",conc:"2.5 mg/mL",note:"100 mcg per 0.04 mL · 4 units on U-100 syring
},
"mt2": {
"10mg": {water:"2 mL",conc:"5 mg/mL",note:"500 mcg per 0.1 mL · 10 units on U-100 syringe
},
"reconst": {"30ml": {water:"N/A",conc:"Ready to use",note:"Bacteriostatic water — use di
};
const PRODUCTS = [
// GLP / Metabolic
{id:"glp3r",name:"GLP-3 R",tag:"Receptor Agonist",icon:" ",color:"#ff6b6b",
sizes:[{s:"15mg",p:"$99.99"}],price:"$99.99",size:"15mg",
desc:"Acylated tri-pathway agonist peptide for metabolic research. Activates GLP-1, coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
GIP, a
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"Lyophilized powder. Once-weekly SubQ. Half-life ~6 days."},
{n:"Reconstitution",text:"Add BAC water. Inject along inner vial wall. Store 2-8C.",chip
{n:"Dosing Reference",rows:[["Weeks 1-4","2mg weekly"],["Weeks 5-8","4mg weekly"],["Week
{n:"Timing",grid:[["Frequency","Once weekly"],["Half-life","~6 days"],["Fasting","Not re
{n:"Sites",chip:"Abdomen · Upper thigh · Upper arm — rotate weekly"},
{n:"Cycle",cycle:["12-24 Wks","4-8 Wks Off","Reassess"]},
],note:"For research use only. Not for human consumption.",
chips:["GLP-1 · Appetite","GIP · Insulin","GCG · Metabolism"]},
{id:"glp2t",name:"GLP-2 T",tag:"Receptor Agonist",icon:" ",color:"#4f8ef7",
sizes:[{s:"15mg",p:"$69.99"},{s:"30mg",p:"$129.99"}],price:"$69.99",size:"15mg",
desc:"Dual-pathway receptor agonist activating GLP-1 and GIP receptors. For incretin and m
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"Lyophilized powder. Dual GLP-1/GIP agonist. Once-weekly SubQ."},
{n:"Reconstitution",text:"Add BAC water. Inject along inner vial wall. Store 2-8C.",chip
{n:"Dosing Reference",rows:[["Start","Low, titrate slowly"],["Frequency","Once weekly"],
{n:"Timing",grid:[["Frequency","Once weekly"],["Fasting","Not required"],["Route","SubQ"
{n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate weekly"},
{n:"Cycle",cycle:["12-20 Wks","4-8 Wks Off","Reassess"]},
],note:"For research use only. Not for human consumption.",
chips:["GLP-1 · Satiety","GIP · Glucose"]},
Studie
{id:"glp1",name:"GLP-1",tag:"Receptor Agonist",icon:" ",color:"#f59e0b",
sizes:[{s:"5mg",p:"$44.99"}],price:"$44.99",size:"5mg",
desc:"GLP-1 receptor agonist peptide for metabolic and receptor signaling research. coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
]},
guide:[
{n:"Overview",text:"GLP-1 receptor agonist. Lyophilized powder for metabolic research."}
{n:"Reconstitution",text:"Add BAC water. Store 2-8C.",chip:"Store 2-8C"},
{n:"Dosing Reference",rows:[["Frequency","Weekly per protocol"],["Route","SubQ"],["Titra
{n:"Timing",grid:[["Fasting","Optional"],["Route","SubQ"],["Frequency","Per protocol"],[
{n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate"},
{n:"Cycle",cycle:["12-24 Wks","4-8 Wks Off","Reassess"]},
],note:"For research use only. Not for human consumption.",
chips:["GLP-1 · Appetite","Incretin · Insulin"]},
// Healing / Recovery
{id:"bpc157",name:"BPC-157",tag:"Healing & Recovery",icon:" ",color:"#3be8b0",
sizes:[{s:"10mg",p:"$49.99"}],price:"$49.99",size:"10mg",
desc:"Body Protection Compound — 15-amino-acid peptide studied for angiogenesis signaling,
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"10mg lyophilized BPC-157. For in-vitro and tissue-repair pathway res
{n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Swirl gently. Store 2-8C, use wi
{n:"Dosing Reference",rows:[["Low","250mcg daily"],["Standard","500mcg daily"],["Split",
{n:"Timing",grid:[["Frequency","Daily"],["Fasting","Not required"],["Timing","Any time"]
{n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
{n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
],note:"For research use only. Not for human consumption.",
chips:["Angiogenesis","Tissue Repair","Gut Integrity"]},
{id:"tb500",name:"TB-500",tag:"Research Peptide",icon:" ",color:"#059669",
sizes:[{s:"10mg",p:"$94.99"}],price:"$94.99",size:"10mg",
desc:"Synthetic Thymosin Beta-4 fragment for tissue remodeling research. Studied for actin
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"10mg lyophilized TB-500. Often paired with BPC-157 for dual-pathway
{n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C, 14 days.",chip:"10mg
{n:"Dosing Reference",rows:[["Loading","2-2.5mg 2x weekly (4 wks)"],["Maintenance","2mg
{n:"Timing",grid:[["Route","SubQ"],["Fasting","Not required"],["Pair with","BPC-157"],["
{n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate"},
{n:"Cycle",cycle:["4 Wks Loading","Monthly Maint.","Reassess"]},
],note:"For research use only. Not for human consumption.",
chips:["Actin · Migration","Tissue Remodeling","Angiogenesis"]},
// GH / Peptide Research
{id:"cjc1295",name:"CJC-1295",tag:"Peptide Research",icon:" ",color:"#6366f1",
sizes:[{s:"5mg",p:"$54.99"}],price:"$54.99",size:"5mg",
desc:"Mod GRF 1-29 GHRH analogue for pituitary signaling research. Short ~30-min half-life
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
]},
guide:[
{n:"Overview",text:"10mg CJC-1295 No DAC. ~30-min half-life preserves pulsatile GH relea
{n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C, 28 days.",chip:"10mg
{n:"Dosing Reference",rows:[["Solo","100-300mcg daily"],["With Ipamorlin","100-200mcg +
{n:"Timing",grid:[["Timing","Pre-sleep"],["Fast Prior","2-3 hours"],["Frequency","Daily"
{n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate daily"},
{n:"Cycle",cycle:["8-12 Wks","4-8 Wks Off","Repeat"]},
],note:"For research use only. Do not substitute with CJC-1295 DAC.",
chips:["GHRH · Pituitary","GH · Pulsatile","IGF-1 · Axis"]},
{id:"cjcipa",name:"CJC-1295 / Ipamorlin Blend",tag:"GH Research",icon:" ",color:"#8b5cf6",
sizes:[{s:"5mg + 5mg",p:"$54.99"}],price:"$54.99",size:"5mg + 5mg",
desc:"CJC-1295 + Ipamorlin pre-blended for synergistic GH secretagogue research. Two compl
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"5mg CJC-1295 + 5mg Ipamorlin. Two GH secretagogue pathways in one vi
{n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C, 28 days.",chip:"10mg
{n:"Dosing Reference",rows:[["CJC","100-200mcg"],["Ipamorlin","100-200mcg"],["Frequency"
{n:"Timing",grid:[["Timing","Pre-sleep"],["Fast Prior","2-3 hours"],["Frequency","Daily"
{n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate daily"},
{n:"Cycle",cycle:["8-16 Wks","8 Wks Off","Repeat"]},
],note:"For research use only. Not for human consumption.",
chips:["CJC · GHRH","Ipamorlin · Ghrelin","GH · Synergy"]},
{id:"ipamorlin",name:"Ipamorlin",tag:"Peptide Research",icon:" ",color:"#a855f7",
sizes:[{s:"10mg",p:"$79.99"}],price:"$79.99",size:"10mg",
desc:"Ghrelin mimetic pentapeptide for GH secretagogue research. Selective GH release with
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
synerg
]},
guide:[
{n:"Overview",text:"5mg Ipamorlin. Ghrelin mimetic for selective GH release research."},
{n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C, 28 days.",chip:"5mg
{n:"Dosing Reference",rows:[["Standard","200-300mcg daily"],["With CJC","Pair for {n:"Timing",grid:[["Timing","Pre-sleep"],["Fast Prior","2-3 hours"],["Frequency","Daily"
{n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate"},
{n:"Cycle",cycle:["8-16 Wks","8 Wks Off","Repeat"]},
],note:"For research use only. Not for human consumption.",
chips:["Ghrelin · Mimetic","GH · Selective","Pituitary · GHS"]},
{id:"tesamorlin",name:"Tesamorlin",tag:"Peptide Research",icon:" ",color:"#3be8b0",
sizes:[{s:"10mg",p:"$99.99"}],price:"$99.99",size:"10mg",
desc:"44-amino-acid GHRH analogue. FDA-approved as Egrifta for a specific indication. Phas
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"10mg Tesamorlin. 2mg daily abdomen-only protocol from Phase 3 trials
{n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C, 14 days.",chip:"10mg
{n:"Dosing Reference",rows:[["Standard","2mg daily"],["Units","40 units U-100"],["Freque
{n:"Timing",grid:[["Timing","Pre-sleep"],["Fasting","2 hours"],["Frequency","Daily or 5/
{n:"Sites",chip:"Abdomen only · 2 inches from navel · Rotate daily"},
{n:"Cycle",cycle:["8-16 Wks","4-8 Wks Off","Repeat"]},
],note:"For research use only. Monitor IGF-1 per protocol.",
chips:["GHRH · Analogue","Visceral · Fat","IGF-1 · Axis"]},
{id:"igf1lr3",name:"IGF-1 LR3",tag:"Growth Factor",icon:" ",color:"#059669",
sizes:[{s:"1mg",p:"$129.99"}],price:"$129.99",size:"1mg",
desc:"Long-acting IGF-1 analogue for cellular research. Extended half-life vs native IGF-1
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
]},
guide:[
{n:"Overview",text:"1mg IGF-1 LR3. Extended half-life for cellular growth signaling rese
{n:"Reconstitution",text:"Add 1.0mL BAC water = 1mg/mL. Store 2-8C.",chip:"1mg + 1.0mL =
{n:"Dosing Reference",rows:[["Range","20-100mcg per session"],["Frequency","Post-protoco
{n:"Timing",grid:[["Timing","Post-workout or AM"],["Fasting","Optional"],["Route","SubQ
{n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
{n:"Cycle",cycle:["4-6 Wks","Equal Off","Repeat"]},
],note:"For research use only. Not for human consumption.",
chips:["IGF-1 · Receptor","Cell · Proliferation","Long-Acting"]},
// Skin / Longevity
{id:"ghkcu",name:"GHK-CU",tag:"Research Compound",icon:" ",color:"#ffd166",
sizes:[{s:"50mg",p:"$49.99"}],price:"$49.99",size:"50mg",
desc:"Copper-binding tripeptide for matrix-signaling, extracellular matrix remodeling, wou
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"50mg or 100mg GHK-Cu. Blue solution upon reconstitution is normal —
{n:"Reconstitution",text:"50mg + 2.5mL BAC water = 20mg/mL. Roll gently.",chip:"50mg + 2
{n:"Dosing Reference",rows:[["Start","1mg (5 units) daily"],["Standard","2mg (10 units)
{n:"Timing",grid:[["Timing","Any / Evening"],["Fasting","Not required"],["Frequency","Da
{n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate each session"},
{n:"Cycle",cycle:["30 Days","30 Days Off","Repeat"]},
],note:"For research use only. Cycle to avoid copper accumulation.",
chips:["Copper · Matrix","ECM · Remodeling","4000+ Genes"]},
{id:"glow",name:"Glow Complex",tag:"Skin Research",icon:" ",color:"#ec4899",
sizes:[{s:"70mg",p:"$119.99"}],price:"$119.99",size:"70mg",
desc:"Skin health research blend: GHK-Cu + BPC-157 + Thymosin Beta-4. Three peptides studi
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"GHK-Cu + BPC-157 + Thymosin Beta-4. Blue tint from GHK-Cu is normal.
{n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C.",chip:"10mg + 2.0mL
{n:"Dosing Reference",rows:[["Standard","0.5mL (2.5mg) daily"],["Frequency","Daily or 3x
{n:"Timing",grid:[["Timing","Any / Evening"],["Fasting","Not required"],["Frequency","Da
{n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
{n:"Cycle",cycle:["30 Days","30 Days Off","Repeat"]},
],note:"For research use only. Not for human consumption.",
chips:["GHK-Cu · Matrix","BPC-157 · Repair","TB4 · Regen"]},
// Metabolic / Anti-aging
{id:"nad",name:"NAD+",tag:"Metabolic Research",icon:" ",color:"#f59e0b",
sizes:[{s:"500mg",p:"$59.99"}],price:"$59.99",size:"500mg",
desc:"Nicotinamide Adenine Dinucleotide — 500mg for cellular energy and metabolism researc
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"500mg NAD+ powder. For cellular energy and mitochondrial research."}
{n:"Reconstitution",text:"Dissolve in sterile water or saline per protocol. Store 2-8C."
{n:"Dosing Reference",rows:[["IV","250-500mg per session"],["SubQ","25-100mg per session
{n:"Timing",grid:[["Form","Powder"],["Route","Per protocol"],["Storage","2-8C"],["Purity
{n:"Sites",chip:"Per protocol — IV or SubQ"},
{n:"Cycle",text:"Ongoing or per institutional research protocol."},
],note:"For research use only. Not for human consumption.",
chips:["Mitochondria · ATP","Sirtuin · Activation","DNA · Repair"]},
{id:"motsc",name:"MOTS-c",tag:"Metabolic Research",icon:" ",color:"#059669",
sizes:[{s:"10mg",p:"$54.99"}],price:"$54.99",size:"10mg",
desc:"Mitochondria-derived peptide for metabolic regulation, insulin sensitivity, and cell
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"5mg MOTS-c. Mitochondria-derived peptide for metabolic signaling res
{n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C, 14 days.",chip:"5mg
{n:"Dosing Reference",rows:[["Standard","5-10mg per session"],["Frequency","Daily or 3x/
{n:"Timing",grid:[["Timing","AM or pre-exercise"],["Fasting","Optional"],["Route","SubQ
{n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
{n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
],note:"For research use only. Not for human consumption.",
chips:["Mitochondrial","Insulin · Sensitivity","Metabolism"]},
{id:"glutathione",name:"Glutathione",tag:"Antioxidant Research",icon:" ",color:"#3be8b0",
sizes:[{s:"600mg",p:"$49.99"}],price:"$49.99",size:"600mg",
desc:"Master antioxidant tripeptide for oxidative stress modulation, immune system support
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
]},
guide:[
{n:"Overview",text:"600mg Glutathione. Master antioxidant for oxidative stress and cellu
{n:"Reconstitution",text:"Dissolve in sterile saline. Store 2-8C.",chip:"600mg · Per res
{n:"Dosing Reference",rows:[["IV","600-1200mg per session"],["SubQ","100-200mg daily"],[
{n:"Timing",grid:[["Route","IV or SubQ"],["Storage","2-8C"],["Purity","99%+"],["Quantity
{n:"Sites",chip:"Per protocol — IV or SubQ"},
{n:"Cycle",text:"Ongoing or per institutional research protocol."},
],note:"For research use only. Not for human consumption.",
chips:["Antioxidant","Oxidative · Stress","Immune · Support"]},
{id:"ss31",name:"SS-31",tag:"Mitochondrial Research",icon:" ",color:"#6366f1",
sizes:[{s:"50mg",p:"$229.99"}],price:"$229.99",size:"50mg",
desc:"Mitochondria-targeted tetrapeptide for cellular protection research. Studied for mit
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
]},
guide:[
{n:"Overview",text:"10mg SS-31. Mitochondria-targeted tetrapeptide for cellular protecti
{n:"Reconstitution",text:"Add 1.0mL BAC water = 10mg/mL. Store 2-8C, 14 days.",chip:"10m
{n:"Dosing Reference",rows:[["Standard","1-3mg per session"],["Frequency","Daily or 3x/w
{n:"Timing",grid:[["Route","SubQ or IV"],["Fasting","Optional"],["Frequency","Daily or 3
{n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
{n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
],note:"For research use only. Not for human consumption.",
chips:["Mito · Shield","Cardiolipin · Bind","ROS · Reduction"]},
// Cognitive / Neuro
{id:"selank",name:"Selank",tag:"Cognitive Research",icon:" ",color:"#7c3aed",
sizes:[{s:"10mg",p:"$49.99"}],price:"$49.99",size:"10mg",
desc:"Heptapeptide for anxiolytic and cognitive research. Studied for GABA-modulation, neu
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"5mg Selank. Anxiolytic and cognitive research. SubQ or nasal."},
{n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C.",chip:"5mg + 1.0mL =
{n:"Dosing Reference",rows:[["Standard","250-500mcg per session"],["Frequency","1-2x dai
{n:"Timing",grid:[["Timing","AM or midday"],["Fasting","Not required"],["Route","SubQ or
{n:"Sites",chip:"SubQ · Abdomen · Thigh — or nasal"},
{n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
],note:"For research use only. Not for human consumption.",
chips:["GABA · Modulation","Anxiolytic","Neuroprotection"]},
{id:"semax",name:"Semax",tag:"Cognitive Research",icon:" ",color:"#6366f1",
sizes:[{s:"10mg",p:"$49.99"}],price:"$49.99",size:"10mg",
desc:"ACTH(4-7) analogue heptapeptide for cognitive and neuroprotective research. Studied
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"5mg Semax. ACTH analogue for cognitive and neuroprotective research.
{n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C.",chip:"5mg + 1.0mL =
{n:"Dosing Reference",rows:[["Standard","200-600mcg per session"],["Frequency","1-2x dai
{n:"Timing",grid:[["Timing","AM or midday"],["Fasting","Not required"],["Route","SubQ or
{n:"Sites",chip:"SubQ · Abdomen — or nasal per protocol"},
{n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
],note:"For research use only. Not for human consumption.",
chips:["BDNF · Production","Neuroprotection","Cognitive · Perf"]},
{id:"dsip",name:"DSIP",tag:"Sleep Research",icon:" ",color:"#3730a3",
sizes:[{s:"5mg",p:"$49.99"}],price:"$49.99",size:"5mg",
desc:"Delta Sleep Inducing Peptide for sleep regulation and circadian rhythm research. Stu
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
]},
guide:[
{n:"Overview",text:"5mg DSIP. Nonapeptide for sleep regulation and circadian rhythm rese
{n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C, 14 days.",chip:"5mg
{n:"Dosing Reference",rows:[["Standard","25-50mcg pre-sleep"],["Frequency","Pre-sleep"],
{n:"Timing",grid:[["Timing","Pre-sleep"],["Fasting","Optional"],["Route","SubQ or IV"],[
{n:"Sites",chip:"SubQ · Abdomen — pre-sleep"},
{n:"Cycle",text:"Per institutional research protocol."},
],note:"For research use only. Not for human consumption.",
chips:["Sleep · Delta","Circadian · Rhythm","Neuroendocrine"]},
// Sleep / Circadian
{id:"mt2",name:"MT2",tag:"Sleep Research",icon:" ",color:"#312e81",
sizes:[{s:"10mg",p:"$49.99"}],price:"$49.99",size:"10mg",
desc:"Advanced melatonin (MT2) for circadian rhythm and sleep architecture research. Highe
coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-sto
{name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.ver
]},
guide:[
{n:"Overview",text:"10mg MT2. Advanced melatonin for sleep and circadian modulation rese
{n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C.",chip:"10mg + 2.0mL
{n:"Dosing Reference",rows:[["Standard","0.5-2mg pre-sleep"],["Route","SubQ"],["Timing",
{n:"Timing",grid:[["Timing","Pre-sleep"],["Fasting","Not required"],["Route","SubQ"],["D
{n:"Sites",chip:"SubQ · Abdomen — pre-sleep"},
{n:"Cycle",text:"Ongoing per sleep research protocol."},
],note:"For research use only. Not for human consumption.",
chips:["Melatonin · MT2","Sleep · Potent","Circadian · Shift"]},
// Accessories
{id:"reconst",name:"Reconstitution Solution",tag:"Accessory",icon:" ",color:"#64748b",
sizes:[{s:"30ml",p:"$24.99"}],price:"$24.99",size:"30ml",
desc:"Bacteriostatic water 0.9% benzyl alcohol for peptide reconstitution. Suitable coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
{name:"Spec Sheet",result:"USP Grade · PASS",url:"https://sygpovk2lkvrukw3.public.blob.v
for re
]},
guide:[
{n:"Overview",text:"30mL bacteriostatic water. 0.9% benzyl alcohol. Standard reconstitut
{n:"Usage",text:"Inject along inner vial wall. Swirl gently — never shake.",chip:"0.9% B
{n:"Storage",rows:[["Store","Room temp or refrigerated"],["Multi-dose","OK with benzyl a
{n:"Tips",grid:[["Motion","Swirl only"],["Angle","Along inner wall"],["Syringe","Fresh p
{n:"Notes",text:"Benzyl alcohol maintains sterility across multiple draws."},
{n:"Cycle",text:"Accessory — no cycle required."},
],note:"For research use only. For reconstituting research compounds only.",
chips:["Bacteriostatic","0.9% · Benzyl","Multi-Dose"]},
];
const SAMPLE_ORDERS = [
{id:"NXG-00124",date:"2026-05-18",product:"GLP-3 / Retatrutide",qty:1,price:"$120.00",statu
{id:"NXG-00098",date:"2026-04-02",product:"GHK-Cu 100mg",qty:2,price:"$140.00",status:"deli
];
const BOT_QA = [
// ── Products ──
{q:["what is retatrutide","what is glp-3","glp-3","retatrutide","triple agonist"],
a:"GLP-3 / Retatrutide is a next-generation triple-receptor agonist targeting GLP-1, GIP,
{q:["cjc-1295","cjc 1295","cjc","ipamorelin","gh stack","growth hormone stack","tesamorelin
a:"The CJC-1295 No DAC + Ipamorelin + Tesamorelin stack is a three-compound GH secretagogu
{q:["ghk-cu","ghk cu","ghk","copper peptide","copper"],
a:"GHK-Cu is a naturally occurring copper peptide complex documented to activate 4,000+ ge
{q:["what is tesamorelin","tesamorelin alone","tesamorelin solo"],
a:"Tesamorelin is a synthetic 44-amino-acid GHRH analogue. It is FDA-approved under the na
freeze
Refere
powder
// ── Reconstitution ──
{q:["reconstitute","reconstitution","mix","how to mix","bac water","bacteriostatic","how mu
a:"All Alphaomegatides vials are lyophilized (freeze-dried) powders requiring reconstituti
{q:["store","storage","refrigerate","freeze","how to store","shelf life"],
a:"After reconstitution: store all peptides refrigerated at 2–8°C (35–46°F). Do not {q:["insulin syringe","syringe","needle","units","how to draw","u-100","u100"],
a:"Use U-100 insulin syringes for subcutaneous peptide research administration. On a U-100
// ── Dosing / Protocols ──
{q:["dose","dosing","how much","how many","mcg","mg","protocol","titration"],
a:"Dosing reference data is available on each product page under 'Research Protocol {q:["cycle","how long","cycle length","on off","weeks on","rest period"],
a:"Published research cycle references: Retatrutide — 12–24 weeks. GH Stack (CJC/Ipa/Tesa)
{q:["timing","when to inject","when to administer","best time","fasting","empty stomach","b
a:"Administration timing notes from published protocols: GH peptides (CJC-1295, Ipamorelin
{q:["injection site","where to inject","subcutaneous","subq","abdomen","rotate"],
a:"Published research protocols use subcutaneous (SubQ) administration — injection into th
{q:["half life","half-life","how often","frequency","once a week","daily","weekly"],
a:"Published half-life data: Retatrutide — ~6 days (once-weekly dosing). CJC-1295 No DAC —
// ── Peptide science ──
{q:["what is a peptide","peptide","how do peptides work","peptides work"],
a:"Peptides are short chains of amino acids — the building blocks of proteins. In research
{q:["lyophilized","freeze dried","powder","white powder","vial"],
a:"Lyophilization (freeze-drying) removes water from the peptide to create a stable {q:["glp-1","glp1","semaglutide","ozempic","compared","difference between"],
a:"GLP-1 agonists like semaglutide activate only the GLP-1 receptor. Retatrutide (GLP-3) a
{q:["growth hormone","gh","hgh","igf","igf-1","secretagogue"],
a:"Growth hormone secretagogues (like CJC-1295 and Ipamorelin) stimulate the pituitary to
{q:["bpc-157","bpc","tb-500","tb500","body protection"],
a:"BPC-157 and TB-500 are popular research peptides studied for tissue repair and healing
// ── COA / Quality ──
{q:["coa","certificate of analysis","purity","test","tested","third party","lab","hplc"],
a:"Every Alphaomegatides product comes with an independent Certificate of Analysis from Fr
{q:["endotoxin","heavy metal","sterility","usp","conforms"],
a:"Beyond purity, Alphaomegatides products are tested for: Endotoxin (USP <85>) — bacteria
{q:["fake","fraud","counterfeit","real","authentic","trust"],
a:"All Alphaomegatides certificates are tested by Freedom Diagnostics and verifiable on th
// ── Ordering / Account ──
{q:["how to order","order","buy","purchase","cart","checkout"],
a:"Browse our research compounds and click 'Add to Cart' on any product page. Checkout is
{q:["ship","shipping","delivery","how long","when","arrive","us only","international"],
a:"Alphaomegatides fulfills to US addresses only — no international orders. Orders are typ
{q:["account","register","sign up","login","dashboard","profile"],
a:"Create a free account using 'Create Account' in the top nav. US researchers only {q:["price","cost","how much","pricing","$"],
a:"Current research compound pricing: GLP-3 R from $63.99 (10mg) · GLP-2 T from $49.99 (10
{q:["return","refund","wrong","issue","problem","damaged"],
a:"Please contact us at alphaomegatides@yahoo.com for any order issues. If there is — a US
a docu
{q:["contact","email","reach","support","help","question"],
a:"Reach us at alphaomegatides@yahoo.com or visit the Contact page in the nav. We typicall
// ── Legal / Safety ──
{q:["safe","safety","side effect","risk","danger","warning"],
a:"All Alphaomegatides products are for research use only — not for human consumption. Saf
{q:["legal","law","regulated","controlled","prescription","illegal"],
a:"Research peptides occupy a complex regulatory space. They are not FDA-approved for huma
{q:["human","not for human","consume","eat","drink","inject yourself"],
a:"Alphaomegatides products are strictly for in-vitro and laboratory research use only. Th
];
const SUGGESTED_QUESTIONS = [
"How do I reconstitute a peptide?",
"What is GLP-3 / Retatrutide?",
"What does the COA include?",
"How does GHK-Cu work?",
"What's the difference between GLP-1 and GLP-3?",
"How long are research cycles?",
"Do you ship internationally?",
"What is a lyophilized peptide?",
"How do I store peptides?",
];
function getBotReply(input) {
const lower = input.toLowerCase();
for (const item of BOT_QA) {
if (item.q.some(k => lower.includes(k))) return item.a;
}
return "That's a great research question. I don't have a specific answer for that in my kno
}
function getUsers(){try{return JSON.parse(localStorage.getItem("nxg_u")||"{}")}catch{return{}
function saveUsers(u){localStorage.setItem("nxg_u",JSON.stringify(u))}
function getSess(){try{return JSON.parse(localStorage.getItem("nxg_s")||"null")}catch{return
function setSess(u){localStorage.setItem("nxg_s",JSON.stringify(u))}
function clearSess(){localStorage.removeItem("nxg_s")}
const inp = {padding:"10px 14px",border:"1.5px solid rgba(255,255,255,0.12)",borderRadius:10,
function Field({label,type="text",...p}){
return <div style={{display:"flex",flexDirection:"column",gap:4}}>
{label&&<label style={{fontSize:"0.73rem",fontWeight:600}}>{label}</label>}
<input type={type} style={inp} {...p}/>
</div>;
}
function StateSelect({label,value,onChange}){
return <div style={{display:"flex",flexDirection:"column",gap:4}}>
{label&&<label style={{fontSize:"0.73rem",fontWeight:600}}>{label}</label>}
<select value={value} onChange={onChange} style={{...inp,background:"#1c1c1c",color:"#fff
<option value="">Select US state…</option>
{STATES.map(s=><option key={s}>{s}</option>)}
</select>
</div>;
}
// Address autocomplete field
function AddressField({label, value, onChange, onSelect, placeholder}) {
const [suggestions, setSuggestions] = useState([]);
const [show, setShow] = useState(false);
const ref = useRef();
const debounceRef = useRef(null);
// Large local street + city database — no API needed
const STREET_TYPES = ["St","Ave","Blvd","Dr","Ln","Rd","Way","Ct","Pl","Cir","Pkwy","Trl","
const STREETS = ["Main","Oak","Maple","Cedar","Pine","Elm","Washington","Lincoln","Park","L
const US_CITIES = [
{city:"New York",state:"NY",zips:["10001","10002","10003","10004","10005"]},
{city:"Los Angeles",state:"CA",zips:["90001","90002","90003","90010","90012"]},
{city:"Chicago",state:"IL",zips:["60601","60602","60603","60604","60605"]},
{city:"Houston",state:"TX",zips:["77001","77002","77003","77004","77005"]},
{city:"Phoenix",state:"AZ",zips:["85001","85002","85003","85004","85005"]},
{city:"Philadelphia",state:"PA",zips:["19101","19102","19103","19104","19106"]},
{city:"San Antonio",state:"TX",zips:["78201","78202","78203","78204","78205"]},
{city:"San Diego",state:"CA",zips:["92101","92102","92103","92104","92105"]},
{city:"Dallas",state:"TX",zips:["75201","75202","75203","75204","75205"]},
{city:"San Jose",state:"CA",zips:["95101","95102","95103","95104","95110"]},
{city:"Austin",state:"TX",zips:["73301","73344","78701","78702","78703"]},
{city:"Jacksonville",state:"FL",zips:["32099","32201","32202","32204","32205"]},
{city:"Fort Worth",state:"TX",zips:["76101","76102","76103","76104","76105"]},
{city:"Columbus",state:"OH",zips:["43085","43201","43202","43203","43204"]},
{city:"Charlotte",state:"NC",zips:["28201","28202","28203","28204","28205"]},
{city:"Indianapolis",state:"IN",zips:["46201","46202","46203","46204","46205"]},
{city:"San Francisco",state:"CA",zips:["94101","94102","94103","94104","94105"]},
{city:"Seattle",state:"WA",zips:["98101","98102","98103","98104","98105"]},
{city:"Denver",state:"CO",zips:["80201","80202","80203","80204","80205"]},
{city:"Nashville",state:"TN",zips:["37201","37202","37203","37204","37205"]},
{city:"Oklahoma City",state:"OK",zips:["73101","73102","73103","73104","73105"]},
{city:"El Paso",state:"TX",zips:["79901","79902","79903","79904","79905"]},
{city:"Boston",state:"MA",zips:["02101","02102","02103","02108","02109"]},
{city:"Portland",state:"OR",zips:["97201","97202","97203","97204","97205"]},
{city:"Las Vegas",state:"NV",zips:["89101","89102","89103","89104","89106"]},
{city:"Memphis",state:"TN",zips:["38101","38103","38104","38105","38106"]},
{city:"Louisville",state:"KY",zips:["40201","40202","40203","40204","40205"]},
{city:"Baltimore",state:"MD",zips:["21201","21202","21203","21205","21206"]},
{city:"Milwaukee",state:"WI",zips:["53201","53202","53203","53204","53205"]},
{city:"Albuquerque",state:"NM",zips:["87101","87102","87103","87104","87105"]},
{city:"Tucson",state:"AZ",zips:["85701","85702","85703","85704","85705"]},
{city:"Fresno",state:"CA",zips:["93650","93701","93702","93703","93704"]},
{city:"Sacramento",state:"CA",zips:["94203","94204","94205","94206","94207"]},
{city:"Mesa",state:"AZ",zips:["85201","85202","85203","85204","85205"]},
{city:"Atlanta",state:"GA",zips:["30301","30302","30303","30304","30305"]},
{city:"Kansas City",state:"MO",zips:["64101","64102","64105","64108","64110"]},
{city:"Omaha",state:"NE",zips:["68101","68102","68103","68104","68105"]},
{city:"Raleigh",state:"NC",zips:["27601","27602","27603","27604","27605"]},
{city:"Cleveland",state:"OH",zips:["44101","44102","44103","44104","44105"]},
{city:"Virginia Beach",state:"VA",zips:["23450","23451","23452","23453","23454"]},
{city:"Miami",state:"FL",zips:["33101","33102","33109","33111","33112"]},
{city:"Oakland",state:"CA",zips:["94601","94602","94603","94604","94605"]},
{city:"Minneapolis",state:"MN",zips:["55401","55402","55403","55404","55405"]},
{city:"Tampa",state:"FL",zips:["33601","33602","33603","33604","33605"]},
{city:"Tulsa",state:"OK",zips:["74101","74102","74103","74104","74105"]},
{city:"Arlington",state:"TX",zips:["76001","76002","76003","76004","76005"]},
{city:"New Orleans",state:"LA",zips:["70112","70113","70114","70115","70116"]},
{city:"Wichita",state:"KS",zips:["67201","67202","67203","67204","67205"]},
{city:"Bakersfield",state:"CA",zips:["93301","93302","93303","93304","93305"]},
{city:"Aurora",state:"CO",zips:["80010","80011","80012","80013","80014"]},
];
function buildSuggestions(val) {
if (!val || val.length < 3) return [];
const lower = val.toLowerCase();
const numMatch = val.match(/^(\d+)\s+(.+)/);
const num = numMatch ? numMatch[1] : null;
const streetPart = numMatch ? numMatch[2].toLowerCase() : lower;
const results = [];
// Match street names
const matchedStreets = STREETS.filter(s => s.toLowerCase().startsWith(streetPart) || (num
const matchedTypes = num ? STREET_TYPES.slice(0, 3) : [STREET_TYPES[0], STREET_TYPES[1],
const houseNum = num || String(Math.floor(Math.random()*8900+100));
// Match cities by partial input
const cityMatches = US_CITIES.filter(c =>
c.city.toLowerCase().includes(lower) ||
c.state.toLowerCase().includes(lower) ||
(num && matchedStreets.length > 0)
).slice(0, 6);
const citiesForStreets = cityMatches.length ? cityMatches : US_CITIES.slice(0, 3);
matchedStreets.slice(0,2).forEach((street, si) => {
matchedTypes.slice(0,2).forEach((type, ti) => {
const cityObj = citiesForStreets[(si * 2 + ti) % citiesForStreets.length];
const zip = cityObj.zips[Math.floor(Math.random()*cityObj.zips.length)];
results.push({
display: `${houseNum} ${street} ${type}, ${cityObj.city}, ${cityObj.state} ${zip}`,
street: `${houseNum} ${street} ${type}`,
city: cityObj.city,
state: cityObj.state,
zip
});
});
});
// If user typed a city name, show that city's streets
if (cityMatches.length && !numMatch) {
cityMatches.slice(0,3).forEach((cityObj, i) => {
const street = STREETS[i % STREETS.length];
const type = STREET_TYPES[i % STREET_TYPES.length];
const zip = cityObj.zips[0];
results.push({
display: `[Number] ${street} ${type}, ${cityObj.city}, ${cityObj.state} ${zip}`,
street: `${street} ${type}`,
city: cityObj.city,
state: cityObj.state,
zip
});
});
}
return results.slice(0, 5);
}
function handleChange(e) {
const v = e.target.value;
onChange(v);
clearTimeout(debounceRef.current);
debounceRef.current = setTimeout(()=>{
const s = buildSuggestions(v);
setSuggestions(s);
setShow(s.length > 0);
}, 200);
}
function pick(s) {
onSelect && onSelect(s.display, [s.street, s.city, s.state, s.zip]);
onChange(s.street);
setSuggestions([]);
setShow(false);
}
useEffect(() => {
function handler(e) { if (ref.current && !ref.current.contains(e.target)) setShow(false);
document.addEventListener("mousedown", handler);
return () => document.removeEventListener("mousedown", handler);
}, []);
return (
<div ref={ref} style={{position:"relative",display:"flex",flexDirection:"column",gap:4}}>
{label && <label style={{fontSize:"0.73rem",fontWeight:600}}>{label}</label>}
<input value={value} onChange={handleChange} onFocus={()=>suggestions.length&&setShow(t
placeholder={placeholder||"Start typing your address…"} style={inp}/>
{show && (
<div style={{position:"absolute",top:"100%",left:0,right:0,background:"#1e1e1e",borde
{suggestions.map((s,i)=>(
<div key={i} onMouseDown={()=>pick(s)}
style={{padding:"10px 14px",fontSize:"0.85rem",cursor:"pointer",borderBottom:i<
onMouseEnter={e=>e.currentTarget.style.background="rgba(79,142,247,0.1)"}
onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
<span style={{color:"#4f8ef7",fontSize:"0.9rem",flexShrink:0}}> </span>
<div style={{minWidth:0}}>
<div style={{fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflo
<div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.45)"}}>{s.city}{s.s
</div>
</div>
))}
</div>
)}
</div>
);
}
function PrimaryBtn({children,onClick,color="#3be8b0",tc="#0e0e0e",full,style={}}){
const [h,sh]=useState(false);
return <button onClick={onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
style={{background:h?"#4f8ef7":color,color:tc,border:"none",padding:"13px 28px",borderRad
}
function GhostBtn({children,onClick,style={}}){
const [h,sh]=useState(false);
return <button onClick={onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
style={{background:"transparent",color:h?"#ffffff":"rgba(255,255,255,0.6)",border:`1.5px
}
// ── CHATBOT ────────────────────────────────────────
function ChatBot({onClose}){
const [msgs,sm]=useState([{from:"bot",text:"Hey! I'm the Alphaomegatides AI research const [input,si]=useState("");
const [loading,setLoading]=useState(false);
const [showSuggestions,setSS]=useState(true);
const bottomRef=useRef();
assist
useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);
async function send(text){
const t=(text||input).trim(); if(!t||loading)return;
const userMsg={from:"user",text:t};
sm(p=>[...p,userMsg]);
si(""); setSS(false); setLoading(true);
// Build conversation history for context
const history=[...msgs,userMsg]
.filter(m=>m.from!=="bot"||msgs.indexOf(m)>0) // skip initial greeting
.map(m=>({role:m.from==="user"?"user":"assistant",content:m.text}));
// Make sure history alternates properly
const apiMsgs=[];
let lastRole=null;
for(const m of history){
if(m.role!==lastRole){apiMsgs.push(m);lastRole=m.role;}
else{apiMsgs[apiMsgs.length-1].content+="\n"+m.content;}
}
if(apiMsgs[0]?.role==="assistant") apiMsgs.shift();
try {
const res=await fetch("https://api.anthropic.com/v1/messages",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
model:"claude-sonnet-4-20250514",
max_tokens:1000,
system:`You are the Alphaomegatides AI research assistant — an expert in research p
You can discuss: mechanisms of action, receptor targets, research protocols, reconstitution (
Keep responses clear, accurate, and concise. Use bullet points for protocols. Always add a br
messages:apiMsgs.length?apiMsgs:[{role:"user",content:t}]
})
});
const data=await res.json();
const reply=data.content?.[0]?.text||"Sorry, I couldn't process that. Please try again.
sm(p=>[...p,{from:"bot",text:reply}]);
} catch(e){
sm(p=>[...p,{from:"bot",text:"Connection issue — please try again in a moment."}]);
}
setLoading(false);
}
return (
<div style={{position:"fixed",bottom:84,right:16,width:Math.min(380,window.innerWidth-24)
{/* Header */}
<div style={{background:"#1a1a1a",padding:"13px 16px",display:"flex",alignItems:"center
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135d
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#fff",fontSize:
<div style={{fontSize:"0.63rem",color:"#3be8b0",display:"flex",alignItems:"center
<span style={{width:5,height:5,borderRadius:"50%",background:"#3be8b0",display:
</div>
</div>
</div>
<button onClick={onClose} style={{background:"rgba(255,255,255,0.08)",border:"none",c
</div>
{/* Messages */}
<div style={{overflowY:"auto",padding:"14px 13px",display:"flex",flexDirection:"column"
{msgs.map((m,i)=>(
<div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex
{m.from==="bot"&&<div style={{width:26,height:26,borderRadius:"50%",background:"l
<div style={{maxWidth:"82%",padding:"10px 14px",borderRadius:m.from==="user"?"16p
{m.text}
</div>
</div>
))}
{loading&&<div style={{display:"flex",alignItems:"flex-start",gap:7}}>
<div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135d
<div style={{padding:"10px 16px",borderRadius:"4px 16px 16px 16px",background:"#222
<div style={{display:"flex",gap:4,alignItems:"center"}}>
{[0,1,2].map(i=><span key={i} style={{width:6,height:6,borderRadius:"50%",backg
</div>
</div>
</div>}
<div ref={bottomRef}/>
</div>
{/* Suggested questions */}
{showSuggestions&&<div style={{padding:"0 12px 10px",borderTop:"1px solid rgba(255,255,
<div style={{fontSize:"0.65rem",fontWeight:600,color:"rgba(255,255,255,0.3)",letterSp
<div style={{display:"flex",flexDirection:"column",gap:5}}>
{["What's the best peptide for fat loss?","How do I reconstitute BPC-157?","Can I s
<button key={i} onClick={()=>send(q)}
style={{textAlign:"left",background:"rgba(59,232,176,0.06)",border:"1px solid r
onMouseEnter={e=>e.currentTarget.style.background="rgba(59,232,176,0.12)"}
onMouseLeave={e=>e.currentTarget.style.background="rgba(59,232,176,0.06)"}>
{q}
</button>
))}
</div>
</div>}
{/* Input */}
<div style={{padding:"10px 12px 12px",borderTop:"1px solid rgba(255,255,255,0.07)",disp
<input value={input} onChange={e=>si(e.target.value)} onKeyDown={e=>e.key==="Enter"&&
placeholder="Ask about any peptide…"
style={{flex:1,padding:"9px 13px",border:"1.5px solid rgba(255,255,255,0.1)",border
onFocus={()=>setSS(false)}/>
<button onClick={()=>send()} disabled={loading||!input.trim()} style={{background:loa
{loading?"…":"Send"}
</button>
</div>
<style>{`@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}
</div>
);
}
function ChatButton({onClick,open}){
const [h,sh]=useState(false);
return <button onClick={onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
style={{position:"fixed",bottom:24,right:16,width:50,height:50,borderRadius:"50%",backgro
{open?"✕":" "}
</button>;
}
// ── NAV ────────────────────────────────────────────
function Nav({user,go,onLogout,cartCount}){
const [open,setOpen]=useState(false);
const close=()=>setOpen(false);
const CATS=[
{label:"Weight Loss",ids:["glp3r","glp2t","glp1"]},
{label:"Recovery & Healing",ids:["bpc157","tb500","ghkcu","glow"]},
{label:"Growth & Longevity",ids:["cjc1295","cjcipa","ipamorlin","tesamorlin","igf1lr3","n
{label:"Neuro & Sleep",ids:["selank","semax","dsip","mt2"]},
];
return <>
{/* Overlay */}
{open&&<div onClick={close} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)
<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:998,display:"flex",alignItems:"
{/* LEFT — hamburger */}
<button onClick={()=>setOpen(p=>!p)} style={{background:"none",border:"none",padding:"6
<span style={{display:"block",width:22,height:2,background:open?C.b:C.ink,borderRadiu
<span style={{display:"block",width:22,height:2,background:open?C.b:C.ink,borderRadiu
<span style={{display:"block",width:22,height:2,background:open?C.b:C.ink,borderRadiu
</button>
{/* CENTER — logo */}
<div onClick={()=>{go("home");close();}} style={{cursor:"pointer",position:"absolute",l
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.52rem",letter
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"
</div>
{/* RIGHT — cart + account icon */}
<div style={{display:"flex",alignItems:"center",gap:10}}>
{/* Cart */}
<button onClick={()=>{go("cart");close();}} style={{background:"none",border:"none",c
<span style={{fontSize:"1.3rem"}}> </span>
{cartCount>0&&<span style={{position:"absolute",top:2,right:2,width:16,height:16,bo
</button>
{/* Account avatar */}
{user
?<button onClick={()=>{go("dashboard");close();}} style={{background:"#3be8b0",colo
:<button onClick={()=>{go("login");close();}} style={{background:"#3be8b0",color:"#
}
</div>
</nav>
{/* Slide-out drawer */}
<div style={{position:"fixed",top:0,left:0,bottom:0,width:Math.min(320,window.innerWidth-
{/* Drawer header */}
<div style={{padding:"20px 20px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)",d
<div style={{display:"flex",alignItems:"center",gap:5}}>
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color
<svg width="11" height="22" viewBox="0 0 14 28" fill="none"><defs><linearGradient i
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.72rem",colo
</div>
<button onClick={close} style={{background:"none",border:"none",fontSize:"1.2rem",cur
</div>
<div style={{padding:"12px 0",flex:1}}>
{/* Main nav items */}
{[
{icon:" ",label:"Home",action:()=>{go("home");close();}},
{icon:" ",label:"Shopping Cart",action:()=>{go("cart");close();},badge:cartCount>0
...(user
?[{icon:" ",label:`${user.fname}'s Account`,action:()=>{go("dashboard");close();
{icon:" ",label:"Sign Out",action:()=>{clearSess();onLogout();go("home");close
:[{icon:" ",label:"Sign In",action:()=>{go("login");close();}},
{icon:" ",label:"Create Account",action:()=>{go("register");close();}}]
),
{icon:" ",label:"Contact Us",action:()=>{go("contact");close();}},
{icon:" ",label:"COA Library",action:()=>{go("coa");close();}},{icon:" ",label:"R
].map(item=>(
<button key={item.label} onClick={item.action}
style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 16px
onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
onMouseLeave={e=>e.currentTarget.style.background="none"}>
<span style={{fontSize:"1rem",width:20,textAlign:"center",flexShrink:0}}>{item.ic
{item.label}
{item.badge&&<span style={{marginLeft:"auto",background:C.r,color:"#fff",fontSize
</button>
))}
{/* Products section — expandable categories */}
<AccordionMenu go={go} close={close}/>
</div>
{/* Drawer footer */}
<div style={{padding:"16px 20px",borderTop:"1px solid rgba(255,255,255,0.07)",flexShrin
<div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.25)",textAlign:"center",line
For research use only · Not for human consumption
</div>
</div>
</div>
<style>{`
*{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}
html{font-size:16px;scroll-behavior:smooth;}
body{overflow-x:hidden;}
input,select,textarea{font-size:16px!important;}
@media(max-width:600px){nav{padding:12px 16px!important;}}
@media(max-width:700px){.footer-grid{grid-template-columns:1fr 1fr!important;}.co-summa
@media(max-width:420px){.footer-grid{grid-template-columns:1fr!important;}}
@media(max-width:480px){.info-card-grid{grid-template-columns:1fr!important;}}
@media(min-width:700px){.co-grid{display:grid;grid-template-columns:1fr 340px;gap:24px;
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
`}</style>
</>;
}
const PRODUCT_META = {
"glp3r":{bestFor:["Fat Loss","Appetite Control","Metabolic Health"],difficulty:"Intermediat
"glp2t":{bestFor:["Fat Loss","GI Health","Metabolic"],difficulty:"Intermediate",stacks:["gl
"glp1":{bestFor:["Fat Loss","Blood Sugar","Appetite"],difficulty:"Beginner",stacks:["glp2t"
"bpc157":{bestFor:["Gut Healing","Tissue Repair","Joint Recovery"],difficulty:"Beginner",st
"tb500":{bestFor:["Muscle Recovery","Tissue Repair","Flexibility"],difficulty:"Beginner",st
"cjc1295":{bestFor:["Muscle Growth","Fat Loss","GH Pulse"],difficulty:"Intermediate",stacks
"cjcipa":{bestFor:["GH Release","Muscle","Fat Loss"],difficulty:"Intermediate",stacks:["ghk
"ipamorlin":{bestFor:["GH Release","Sleep Quality","Recovery"],difficulty:"Beginner",stacks
"tesamorlin":{bestFor:["Visceral Fat","Body Composition","GH"],difficulty:"Intermediate",st
"igf1lr3":{bestFor:["Muscle Growth","Cell Repair","Recovery"],difficulty:"Advanced",stacks:
"ghkcu":{bestFor:["Skin Health","Anti-Aging","Wound Healing"],difficulty:"Beginner",stacks:
"glow":{bestFor:["Skin Repair","Anti-Aging","Collagen"],difficulty:"Beginner",stacks:["ghkc
"nad":{bestFor:["Energy","DNA Repair","Longevity"],difficulty:"Beginner",stacks:["ss31","mo
"motsc":{bestFor:["Metabolism","Insulin Sensitivity","Energy"],difficulty:"Intermediate",st
"glutathione":{bestFor:["Antioxidant","Detox","Immune Support"],difficulty:"Beginner",stack
"ss31":{bestFor:["Mitochondria","Heart Health","Longevity"],difficulty:"Advanced",stacks:["
"selank":{bestFor:["Anxiety Relief","Focus","Neuroprotection"],difficulty:"Beginner",stacks
"semax":{bestFor:["Cognitive","Memory","BDNF Boost"],difficulty:"Beginner",stacks:["selank"
"dsip":{bestFor:["Deep Sleep","Circadian Reset","Recovery"],difficulty:"Beginner",stacks:["
"mt2":{bestFor:["Sleep","Libido","Tanning"],difficulty:"Beginner",stacks:["dsip"]},
"reconst":{bestFor:["Reconstitution","Lab Use"],difficulty:"Beginner",stacks:[]},
};
// ── SHOPIFY CHECKOUT ─────────────────────────────────
const SHOPIFY_DOMAIN = "sequential-peptides.myshopify.com";
const SHOPIFY_TOKEN = "1a55408a6a44c2cc1012197ad1218958";
function buildShopifyCartUrl(cartItems:{id:string,name:string,selectedSize:string,selectedPri
return `https://${SHOPIFY_DOMAIN}`;
}
function shopifyCheckout(cartItems:{id:string,name:string,selectedSize:string,selectedPrice:s
const handleMap:Record<string,string> = {
glp3r:"glp-3-r", glp2t:"glp-2-t", glp1:"glp-1",
bpc157:"bpc-157", tb500:"tb-500",
cjc1295:"cjc-1295", cjcipa:"cjc-1295-ipamorelin-blend",
ipamorlin:"ipamorelin", tesamorlin:"tesamorlin", igf1lr3:"igf-1-lr3",
ghkcu:"ghk-cu", glow:"glow-complex",
nad:"nad", motsc:"mots-c", glutathione:"glutathione", ss31:"ss-31",
selank:"selank", semax:"semax", dsip:"dsip", mt2:"mt2",
reconst:"reconstitution-solution",
};
const handle = handleMap[cartItems[0]?.id] || cartItems[0]?.id || "";
const url = `https://${SHOPIFY_DOMAIN}/products/${handle}`;
// Force true external navigation — bypasses React router completely
window.location.assign(url);
}
const RESEARCH_POTENTIAL: Record<string,{headline:string,points:{icon:string,label:string,det
"glp3r":{headline:"What researchers study this for",points:[
{icon:" {icon:" {icon:" {icon:" ",label:"Weight Reduction",detail:"Phase 2 data documented up to 24% body weight
",label:"Appetite Signaling",detail:"GLP-1 receptor activation is strongly assoc
",label:"Glucose Metabolism",detail:"GIP receptor agonism studied for glucose-de
",label:"Energy Expenditure",detail:"Glucagon receptor activation is associated
insuli
]},
"glp2t":{headline:"What researchers study this for",points:[
{icon:" ",label:"Body Composition",detail:"Dual GLP-1/GIP agonism studied for significan
{icon:" ",label:"Incretin Response",detail:"GIP + GLP-1 co-agonism studied for synergist
{icon:" ",label:"Satiety Pathways",detail:"GLP-1 activation is associated with central a
]},
"glp1":{headline:"What researchers study this for",points:[
{icon:" ",label:"Appetite Regulation",detail:"GLP-1 receptor activation is the most exte
{icon:" ",label:"Glucose-Dependent Insulin",detail:"Studied for glucose-dependent {icon:" ",label:"Metabolic Research",detail:"GLP-1 analogues are the foundation of moder
]},
"bpc157":{headline:"What researchers study this for",points:[
{icon:" ",label:"Tissue Repair Signaling",detail:"BPC-157 has been extensively studied f
{icon:" ",label:"Gut Lining Integrity",detail:"Associated with protection and healing of
{icon:" ",label:"Angiogenesis",detail:"Studied for promotion of new blood vessel formati
{icon:" ",label:"Tendon & Muscle Models",detail:"Published research has examined BPC-157
]},
"tb500":{headline:"What researchers study this for",points:[
{icon:" ",label:"Systemic Healing",detail:"As a synthetic Thymosin Beta-4 fragment, TB-5
{icon:" ",label:"Cell Migration",detail:"Actin regulation is central to cell migration —
{icon:" ",label:"Angiogenesis",detail:"TB-500 has been studied for angiogenesis promotio
{icon:" ",label:"Inflammation Modulation",detail:"Thymosin Beta-4 is associated with dow
]},
"cjc1295":{headline:"What researchers study this for",points:[
{icon:" ",label:"Pulsatile GH Release",detail:"CJC-1295 No DAC's ~30-min half-life speci
{icon:" ",label:"IGF-1 Axis",detail:"GH secretagogues are studied for downstream IGF-1 e
{icon:" ",label:"Pituitary Signaling",detail:"Studied as a GHRH analogue for interaction
]},
"cjcipa":{headline:"Why researchers combine CJC-1295 + Ipamorelin",points:[
{icon:" ",label:"Synergistic GH Output",detail:"CJC-1295 acts on GHRH receptors; Ipamore
{icon:" ",label:"Complementary Receptors",detail:"Two separate receptor pathways stimula
{icon:" ",label:"Selective Profile (Ipamorelin)",detail:"Ipamorelin is specifically sele
]},
"ipamorlin":{headline:"What researchers study this for",points:[
{icon:" {icon:" {icon:" ",label:"Selective GH Release",detail:"Ipamorelin is studied for highly selectiv
",label:"Sleep Architecture",detail:"GH secretagogues are studied in relation to
",label:"Lean Tissue Research",detail:"GH axis activation is associated with fav
]},
"tesamorlin":{headline:"What researchers study this for",points:[
{icon:" ",label:"Visceral Adipose Reduction",detail:"Phase 3 trials (800+ subjects) docu
{icon:" ",label:"IGF-1 Elevation",detail:"Tesamorlin is studied for dose-dependent IGF-1
{icon:" ",label:"GHRH Analogue Research",detail:"As a 44-amino-acid GHRH analogue, Tesam
]},
"igf1lr3":{headline:"What researchers study this for",points:[
{icon:" ",label:"Downstream GH Axis",detail:"IGF-1 LR3 acts downstream of GH — directly
{icon:" ",label:"Extended Half-Life",detail:"The LR3 modification extends half-life vers
{icon:" ",label:"Muscle & Tissue Research",detail:"IGF-1 receptor activation is the most
]},
"ghkcu":{headline:"What researchers study this for",points:[
{icon:" ",label:"4,000+ Gene Activation",detail:"GHK-Cu has been documented to modulate
{icon:" ",label:"Collagen & ECM",detail:"Strongly associated with collagen synthesis, el
{icon:" ",label:"Wound Healing",detail:"GHK-Cu is one of the most studied compounds for
{icon:" ",label:"Anti-Inflammatory",detail:"Associated with down-regulation of inflammat
]},
"glow":{headline:"What researchers study this blend for",points:[
{icon:" ",label:"Skin Matrix (GHK-Cu)",detail:"GHK-Cu provides the collagen, elastin, an
{icon:" ",label:"Cellular Repair (BPC-157)",detail:"BPC-157 contributes fibroblast activ
{icon:" ",label:"Structural Renewal (TB4)",detail:"Thymosin Beta-4 is associated with ke
]},
"nad":{headline:"What researchers study this for",points:[
{icon:" ",label:"Cellular Energy (ATP)",detail:"NAD+ is the essential coenzyme for mitoc
{icon:" ",label:"Sirtuin Activation",detail:"NAD+ is required for sirtuin (SIRT1–7) deac
{icon:" ",label:"DNA Repair (PARP)",detail:"PARP enzymes consume NAD+ during DNA repair.
{icon:" ",label:"Mitochondrial Function",detail:"Declining NAD+ is associated with mitoc
]},
"motsc":{headline:"What researchers study this for",points:[
{icon:" ",label:"Mitochondrial Origin",detail:"MOTS-c is a peptide encoded in the mitoch
{icon:" ",label:"Insulin Sensitivity",detail:"MOTS-c is studied for improving insulin se
{icon:" ",label:"Exercise Performance Pathways",detail:"Published animal data showed MOT
]},
"glutathione":{headline:"What researchers study this for",points:[
{icon:" ",label:"Master Antioxidant",detail:"Glutathione is the body's primary endogenou
{icon:" ",label:"Immune Modulation",detail:"Published research associates glutathione le
{icon:" ",label:"Detoxification Pathways",detail:"Glutathione is essential for Phase II
]},
"ss31":{headline:"What researchers study this for",points:[
{icon:" {icon:" ",label:"Mitochondrial Membrane",detail:"SS-31 specifically targets the inner mi
",label:"Cardiac Research",detail:"SS-31 (Elamipretide) is in Phase 2/3 clinical
{icon:" ",label:"ROS Reduction",detail:"By stabilizing mitochondrial structure, SS-31 re
]},
"selank":{headline:"What researchers study this for",points:[
{icon:" {icon:" {icon:" ",label:"Anxiolytic Pathways",detail:"Selank is studied for GABA-A receptor modu
",label:"BDNF & Neuroplasticity",detail:"Selank has been associated with BDNF el
",label:"Stress Response Modulation",detail:"Studied for normalization of the HP
data s
brain
circad
GH, LH
]},
"semax":{headline:"What researchers study this for",points:[
{icon:" ",label:"BDNF Upregulation",detail:"Semax is one of the most studied peptides fo
{icon:" ",label:"Cognitive Enhancement Models",detail:"Published Russian clinical {icon:" ",label:"Neuroprotection",detail:"Studied for protection against ischemic ]},
"dsip":{headline:"What researchers study this for",points:[
{icon:" ",label:"Deep Sleep Induction",detail:"DSIP is named for its documented ability
{icon:" ",label:"Circadian Rhythm Research",detail:"Studied for modulation of the {icon:" ",label:"Neuroendocrine Signaling",detail:"DSIP is studied for effects on ]},
"mt2":{headline:"What researchers study MT2 for",points:[
{icon:" ",label:"Potent Circadian Modulation",detail:"MT2 is a more potent melatonin ana
{icon:" ",label:"Sleep Architecture",detail:"Published research distinguishes MT2 {icon:" ",label:"Receptor Selectivity Research",detail:"MT2 is studied to understand MT1
]},
"reconst":{headline:"Why bacteriostatic water matters in research",points:[
{icon:" ",label:"Preserving Sterility",detail:"0.9% benzyl alcohol inhibits bacterial gr
{icon:" ",label:"Standard Reconstitution",detail:"Bacteriostatic water is the standard r
{icon:" ",label:"Stability",detail:"Reconstituted peptides dissolved in BAC water are st
]},
from M
};
function ResearchPotentialPlacard({productId, productColor}: {productId: string, productColor
const data = RESEARCH_POTENTIAL[productId];
if (!data) return null;
const isLight = ["#3be8b0","#ffd166","#f59e0b"].includes(productColor);
return (
<div style={{maxWidth:760,margin:"0 auto",padding:"0 24px 40px"}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
<div style={{width:32,height:32,borderRadius:"50%",background:productColor,display:"f
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",color
<div style={{fontSize:"0.66rem",color:"rgba(255,255,255,0.3)",marginTop:2}}>Researc
</div>
</div>
<div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:12}}>
{data.points.map((pt,i)=>(
<div key={i} style={{background:"#1c1c1c",borderRadius:14,padding:"14px 18px",borde
<div style={{width:30,height:30,borderRadius:"50%",background:productColor,displa
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",c
<div style={{background:`${productColor}14`,border:`1px solid ${productColor}30
</div>
</div>
))}
</div>
<div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.0
<span style={{flexShrink:0}}> </span>
<span>Published scientific literature reference only. Alphaomegatides makes no </div>
</div>
claims
);
}
const FORM_TYPE = {
"glp3r":"vial",
"glp2t":"vial",
"glp1":"vial",
"bpc157":"vial",
"tb500":"vial",
"cjc1295":"vial",
"cjcipa":"vial",
"ipamorlin":"vial",
"tesamorlin":"vial",
"igf1lr3":"vial",
"ghkcu":"vial",
"glow":"vial",
"nad":"vial",
"motsc":"vial",
"glutathione":"vial",
"ss31":"vial",
"selank":"vial",
"semax":"vial",
"dsip":"vial",
"mt2":"vial",
"reconst":"solution",
};
function ProductCard({p,go,wishlist=[],toggleWishlist=()=>{}}){
return (
<div onClick={()=>go("product",p.id)}
style={{borderRadius:24,overflow:"hidden",cursor:"pointer",transition:"all 0.25s",boxSh
onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.st
onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShado
<div style={{background:`linear-gradient(160deg,${p.color}55 0%,${p.color}11 40%,#0e0e0
<div style={{position:"absolute",width:160,height:160,borderRadius:"50%",background:p
{/* Form type badge — top right */}
<div style={{position:"absolute",top:12,right:12,background:"rgba(0,0,0,0.5)",backdro
<span style={{fontSize:"0.95rem"}}>{FORM_TYPE[p.id]==="capsule"?" ":FORM_TYPE[p.id
<span style={{fontSize:"0.62rem",fontWeight:600,color:"rgba(255,255,255,0.6)",lette
</div>
<div style={{fontSize:"3.8rem",marginBottom:14,position:"relative",zIndex:1,filter:"d
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",color:"#
<div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.45)",marginBottom:14,positi
{p.chips&&<div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",p
{p.chips.map(chip=>{
const [main,sub]=chip.split("·").map(s=>s.trim());
return <div key={chip} style={{background:"rgba(0,0,0,0.45)",borderRadius:10,padd
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.78rem",c
{sub&&<div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.5)",marginTop:1
</div>;
})}
</div>}
</div>
{/* Bottom bar */}
<div style={{background:"#111111",padding:"12px 16px",borderTop:"1px solid rgba(255,255
{PRODUCT_META[p.id]&&<div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:9
{PRODUCT_META[p.id].bestFor.slice(0,2).map(tag=>(
<span key={tag} style={{fontSize:"0.6rem",fontWeight:500,padding:"2px 8px",border
))}
<span style={{fontSize:"0.6rem",fontWeight:700,padding:"2px 8px",borderRadius:100,b
</div>}
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10
{/* Price + purity */}
<div style={{display:"flex",flexDirection:"column",gap:2}}>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",colo
<span style={{fontSize:"0.58rem",fontWeight:600,color:"#3be8b0",letterSpacing:"0.
</div>
{/* Actions */}
<div style={{display:"flex",gap:7,alignItems:"center"}}>
<button onClick={e=>{e.stopPropagation();toggleWishlist(p.id);}}
style={{width:34,height:34,borderRadius:"50%",background:wishlist.includes(p.id
{wishlist.includes(p.id)?" ":" "}
</button>
<div style={{background:p.color,color:p.color==="#ffd166"||p.color==="#3be8b0"||p
</div>
</div>
</div>
</div>
);
}
const HOME_CATS = [
{id:"all", label:"All", emoji:" "},
{id:"glp", label:"Weight Loss", emoji:" ", ids:["glp3r","glp2t","glp1"]},
{id:"recovery", label:"Recovery", emoji:" ", ids:["bpc157","tb500","ghkcu","glow"
{id:"growth", label:"Growth & GH", emoji:" ", ids:["cjc1295","cjcipa","ipamorlin",
{id:"longevity", label:"Longevity", emoji:" ", ids:["nad","motsc","glutathione","ss
{id:"neuro", label:"Neuro & Sleep", emoji:" ", ids:["selank","semax","dsip","mt2"]}
{id:"accessories",label:"Accessories", emoji:" ", ids:["reconst"]},
];
function HomeCatFilter({go,wishlist=[],toggleWishlist=()=>{}}){
const [active,setActive]=useState("all");
const [search,setSearch]=useState("");
const filtered = PRODUCTS.filter(p=>{
const catMatch = active==="all" || HOME_CATS.find(c=>c.id===active)?.ids?.includes(p.id);
const q=search.toLowerCase().trim();
if(!q) return catMatch;
const allText = [
p.name, p.tag, p.id, p.desc||"",
...(PRODUCT_META[p.id]?.bestFor||[]),
PRODUCT_META[p.id]?.difficulty||"",
...(p.chips||[]),
].join(" ").toLowerCase();
return catMatch && allText.includes(q);
});
return <>
{/* Search bar */}
<div style={{position:"relative",marginBottom:14}}>
<span style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",fontSi
<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search compo
style={{width:"100%",padding:"12px 16px 12px 44px",background:"#1a1a1a",border:"1.5px
onFocus={e=>e.target.style.borderColor="#3be8b0"} onBlur={e=>e.target.style.borderCol
{search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:16,top:"
</div>
{/* Filter pills — single row horizontal scroll */}
<div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:6,marginBottom:24,scroll
{HOME_CATS.map(cat=>(
<button key={cat.id} onClick={()=>setActive(cat.id)}
style={{display:"flex",alignItems:"center",gap:5,padding:"8px 16px",borderRadius:10
<span>{cat.emoji}</span>{cat.label}
{cat.id!=="all"&&<span style={{background:"rgba(255,255,255,0.08)",borderRadius:100
</button>
))}
</div>
{/* Category heading when filtered */}
{active!=="all"&&<div style={{marginBottom:20,display:"flex",alignItems:"center",gap:10}}
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"#ff
<div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.35)"}}>{filtered.length} comp
<button onClick={()=>setActive("all")} style={{marginLeft:"auto",fontSize:"0.75rem",col
</div>}
{/* Product grid */}
{filtered.length===0
?<div style={{textAlign:"center",padding:"48px 0",color:"rgba(255,255,255,0.3)"}}>
<div style={{fontSize:"2.5rem",marginBottom:12}}> </div>
<div style={{fontWeight:600,marginBottom:6,color:"rgba(255,255,255,0.6)"}}>No compoun
<div style={{fontSize:"0.85rem"}}>Try a different search or category</div>
<button onClick={()=>{setSearch("");setActive("all");}} style={{marginTop:16,backgrou
</div>
:<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",g
{filtered.map(p=><ProductCard key={p.id} p={p} go={go} wishlist={wishlist} toggleWi
</div>
}
</>;
}
// ── RESEARCH LIBRARY ─────────────────────────────
const ARTICLES = [
{id:"glp-intro",title:"Understanding GLP Receptor Agonists",category:"Weight Loss",emoji:"
{id:"bpc-tb500",title:"BPC-157 + TB-500: The Ultimate Recovery Stack",category:"Recovery",e
{id:"gh-axis",title:"The GH Axis: CJC-1295, Ipamorlin & Tesamorlin",category:"Growth",emoji
{id:"ghkcu-skin",title:"GHK-Cu: The Copper Peptide Activating 4,000+ Genes",category:"Skin
{id:"nad-mito",title:"NAD+ & Mitochondrial Peptides for Longevity Research",category:"Longe
{id:"neuro-peptides",title:"Selank, Semax & Cognitive Peptide Research",category:"Neuro",em
{id:"recon-guide",title:"Complete Reconstitution Guide for Research Peptides",category:"Pro
{id:"cycling",title:"Research Cycling Protocols: When to Run, When to Rest",category:"Proto
];
function ResearchLibraryPage({go}){
const [activeCat,setAC]=useState("All");
const cats=["All",...new Set(ARTICLES.map(a=>a.category))];
const filtered=activeCat==="All"?ARTICLES:ARTICLES.filter(a=>a.category===activeCat);
const [selected,setSelected]=useState(null);
if(selected) return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh",color
<div style={{maxWidth:720,margin:"0 auto",padding:"32px 20px 80px"}}>
<button onClick={()=>setSelected(null)} style={{background:"none",border:"1px solid rgb
<div style={{fontSize:"2.5rem",marginBottom:16}}>{selected.emoji}</div>
<div style={{fontSize:"0.72rem",fontWeight:600,color:"#3be8b0",letterSpacing:"0.1em",te
<h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.5rem,4vw,2.2rem)",fontWeig
<p style={{fontSize:"0.97rem",color:"rgba(255,255,255,0.6)",lineHeight:1.85,marginBotto
<div style={{background:"rgba(59,232,176,0.07)",border:"1px solid rgba(59,232,176,0.2)"
<div style={{fontWeight:700,fontSize:"0.85rem",marginBottom:8,color:"#3be8b0"}}> Re
<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
{selected.tags.map(tag=>{
const p=PRODUCTS.find(x=>x.name===tag||x.id===tag);
return <button key={tag} onClick={()=>p&&go("product",p.id)}
style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,
{p?p.icon+" ":""}{tag}
</button>;
})}
</div>
</div>
<div style={{background:"rgba(255,107,107,0.07)",border:"1px solid rgba(255,107,107,0.1
All content is for research and educational purposes only. Not medical advice.
</div>
</div>
<SiteFooter go={go}/>
</div>;
return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh",color:"#fff"}}>
<div style={{maxWidth:900,margin:"0 auto",padding:"40px 20px 80px"}}>
<div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"upp
<h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeig
<p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginBottom:28}}>Science-b
{/* Category filter */}
<div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:28}}>
{cats.map(cat=>(
<button key={cat} onClick={()=>setAC(cat)}
style={{padding:"7px 16px",borderRadius:100,border:`1px solid ${activeCat===cat?"
{cat}
</button>
))}
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",ga
{filtered.map(a=>(
<div key={a.id} onClick={()=>setSelected(a)}
style={{background:"#1a1a1a",borderRadius:16,padding:"22px",border:"1px solid rgb
onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(59,232,176,0.3)";e.curr
onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.cu
<div style={{fontSize:"1.8rem",marginBottom:12}}>{a.emoji}</div>
<div style={{fontSize:"0.65rem",fontWeight:600,color:"#3be8b0",letterSpacing:"0.1
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",mar
<div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.45)",lineHeight:1.6,mar
<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
{a.tags.slice(0,2).map(t=><span key={t} style={{fontSize:"0.62rem",padding:"2px
</div>
</div>
))}
</div>
</div>
<SiteFooter go={go}/>
</div>;
}
// ── COA VIEWER MODAL ─────────────────────────────
function CoaModal({url,onClose}){
return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:1100,disp
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",color:"#f
<div style={{display:"flex",gap:10,alignItems:"center"}}>
<a href={url} target="_blank" rel="noreferrer" style={{fontSize:"0.78rem",color:"#3be
<button onClick={onClose} style={{background:"rgba(255,255,255,0.1)",border:"none",co
</div>
</div>
<div style={{flex:1,overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
<iframe src={url} style={{width:"100%",height:"100%",border:"none"}} title="COA"/>
</div>
</div>;
}
// ── SKELETON LOADER ──────────────────────────────
function Skeleton({w="100%",h=16,radius=8,style={}}){
return <div style={{width:w,height:h,borderRadius:radius,background:"linear-gradient(90deg,
}
// ── ACCORDION MENU ───────────────────────────────
const NAV_CATS = [
{label:"Weight Loss", emoji:" ", ids:["glp3r","glp2t","glp1"],
{label:"Recovery & Healing",emoji:" ",ids:["bpc157","tb500","ghkcu","glow"],
{label:"Growth & GH", emoji:" ", ids:["cjc1295","cjcipa","ipamorlin","tesamorlin","ig
{label:"Longevity", emoji:" ", ids:["nad","motsc","glutathione","ss31"],
{label:"Neuro & Sleep", emoji:" ", ids:["selank","semax","dsip","mt2"],
{label:"Accessories", emoji:" ", ids:["reconst"],
];
function AccordionMenu({go,close}){
const [openCat,setOpenCat]=useState(null);
return (
<div style={{borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:8,paddingTop:8}}>
<div style={{padding:"6px 16px 8px",fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.1
{NAV_CATS.map(cat=>(
<div key={cat.catId}>
<button onClick={()=>setOpenCat(openCat===cat.catId?null:cat.catId)}
style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"11px 16px
onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
onMouseLeave={e=>e.currentTarget.style.background="none"}>
<span style={{fontSize:"1rem",width:22,textAlign:"center",flexShrink:0}}>{cat.emo
<span style={{flex:1,fontSize:"0.85rem",fontWeight:600,color:"#fff"}}>{cat.label}
<span style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.25)",marginRight:4}}>{
<span style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.3)",display:"inline-blo
</button>
{openCat===cat.catId&&<div style={{background:"rgba(255,255,255,0.02)",borderTop:"1
<button onClick={()=>{go("category",cat.catId);close();}}
style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"9px 16px
→ View all {cat.label}
</button>
{cat.ids.map(id=>{
const p=PRODUCTS.find(x=>x.id===id); if(!p) return null;
return <button key={id} onClick={()=>{go("product",id);close();}}
style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"7px 16
onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.04)"}
onMouseLeave={e=>e.currentTarget.style.background="none"}>
<span style={{fontSize:"0.8rem",width:18,textAlign:"center",flexShrink:0}}>{p
<span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"no
<span style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.25)",flexShrink:0}
</button>;
})}
</div>}
</div>
))}
</div>
);
}
// ── CATEGORY PAGE ─────────────────────────────────
function CategoryPage({catId,go,wishlist=[],toggleWishlist=()=>{}}){
const cat=NAV_CATS.find(c=>c.catId===catId);
useEffect(()=>{ window.scrollTo(0,0); },[catId]);
if(!cat) return null;
const products=cat.ids.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh",color:"#fff"}}>
<div style={{maxWidth:1140,margin:"0 auto",padding:"48px 24px 80px"}}>
<button onClick={()=>go("home")} style={{background:"none",border:"1px solid rgba(255,2
<div style={{display:"flex",alignItems:"center",gap:14,marginBottom:8}}>
<span style={{fontSize:"2.2rem"}}>{cat.emoji}</span>
<h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWe
</div>
<p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginBottom:36}}>{products
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",ga
{products.map(p=><ProductCard key={p.id} p={p} go={go} wishlist={wishlist} toggleWish
</div>
</div>
<SiteFooter go={go}/>
</div>;
}
// ── HOME ────────────────────────────────────────────
function Home({go,recentlyViewed=[],wishlist=[],toggleWishlist=()=>{}}){
return <div style={{paddingTop:70,background:"#0e0e0e",color:"#ffffff"}}>
<section style={{minHeight:"90vh",display:"flex",flexDirection:"column",alignItems:"cente
<div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:C.g
<div style={{position:"absolute",width:380,height:380,borderRadius:"50%",background:C.b
{/* Animated floating dots */}
<style>{`
@keyframes floatUp{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:0.6
@keyframes floatUp2{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:0.
@keyframes pulseGlow{0%,100%{opacity:0.15}50%{opacity:0.28}}
`}</style>
{[4,3,5,4,3,5,4,3].map((sz,i)=>(
<div key={i} style={{position:"absolute",width:sz,height:sz,borderRadius:"50%",backgr
))}
{/* Brand name + logo mark */}
<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,marginBot
<div style={{display:"flex",alignItems:"center",gap:16}}>
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(3.5rem,
<svg width="52" height="120" viewBox="0 0 44 110" fill="none" xmlns="http://www.w3.
<defs><linearGradient id="herodna" x1="0" y1="0" x2="0" y2="110" gradientUnits="u
<path d="M9 0 C2 14,2 28,9 42 C16 56,19 70,12 84 C8 92,5 100,6 110" stroke="url(#
<path d="M35 0 C42 14,42 28,35 42 C28 56,25 70,32 84 C36 92,39 100,38 110" stroke
<line x1="9" y1="0" x2="35" y2="0" stroke="rgba(255,107,107,0.7)" strokeWidt
<line x1="5" y1="20" x2="39" y2="20" stroke="rgba(220,80,190,0.55)" strokeWidt
<line x1="12" y1="40" x2="32" y2="40" stroke="rgba(168,85,247,0.65)" strokeWidt
<line x1="13" y1="60" x2="31" y2="60" stroke="rgba(100,150,255,0.6)" strokeWidt
<line x1="9" y1="80" x2="35" y2="80" stroke="rgba(59,220,200,0.65)" strokeWidt
<line x1="7" y1="100" x2="37" y2="100" stroke="rgba(59,232,176,0.6)" strokeWidt
<circle cx="9" cy="0" r="5" fill="#ff6b6b" opacity="0.92"/>
<circle cx="35" cy="0" r="5" fill="#ff6b6b" opacity="0.92"/>
<circle cx="12" cy="40" r="4" fill="#a855f7" opacity="0.88"/>
<circle cx="32" cy="40" r="4" fill="#a855f7" opacity="0.88"/>
<circle cx="9" cy="80" r="5" fill="#3be8b0" opacity="0.92"/>
<circle cx="35" cy="80" r="5" fill="#3be8b0" opacity="0.92"/>
</svg>
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(3.5rem,
</div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"clamp(0.65rem,1.
<div style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontWeight:700,fontSiz
</div>
<div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,2
<span style={{width:7,height:7,borderRadius:"50%",background:"#3be8b0",display:"inlin
Research-grade peptides · For in-vitro research use only
</div>
<h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(2.8rem,7vw,5.8rem)",fontWeig
Verified research<br/><span style={{color:"#4f8ef7"}}>peptides</span> for{" "}
<span style={{background:"#3be8b0",color:"#0e0e0e",padding:"0 14px",borderRadius:12}}
</h1>
<p style={{fontSize:"1.05rem",color:"rgba(255,255,255,0.5)",maxWidth:520,lineHeight:1.7
Alphaomegatides supplies pharmaceutical-grade research peptides with independent thir
</p>
<p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontStyle:"italic",fontSize:"c
<div style={{display:"inline-block",background:"rgba(255,107,107,0.1)",border:"1px soli
For research use only · Not for human or veterinary use
</div>
<div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom
<PrimaryBtn onClick={()=>document.getElementById("products").scrollIntoView({behavior
<GhostBtn onClick={()=>go("register")} style={{padding:"13px 32px",fontSize:"0.95rem"
</div>
<div style={{display:"flex",gap:44,flexWrap:"wrap",justifyContent:"center",position:"re
{[["99%","Purity Verified"],["50k+","Orders Fulfilled"],["3rd","Party Lab Tested"],["
<div key={l} style={{textAlign:"center"}}>
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.8rem",fontWeight:800,colo
<div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)",marginTop:2}}>{l}</
</div>
))}
</div>
</section>
<div style={{background:"#141414",padding:"15px 0",overflow:"hidden",whiteSpace:"nowrap",
<span style={{display:"inline-flex",gap:44,animation:"scroll 18s linear infinite"}}>
{[...["Where the tide turns for all.","Ready to turn the tide?","The frontier starts
<span key={i} style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontSize:"0
<span style={{color:"rgba(255,255,255,0.15)"}}>✦</span>{phrase}
</span>
))}
</span>
</div>
{/* Recently Viewed */}
{recentlyViewed.length>0&&<div style={{background:"#0a0a0a",padding:"32px 36px 0",maxWidt
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBo
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",color:"
</div>
<div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>
{recentlyViewed.map(id=>{
const p=PRODUCTS.find(x=>x.id===id);
if(!p) return null;
return <div key={id} onClick={()=>go("product",id)}
style={{display:"flex",alignItems:"center",gap:10,background:"#1a1a1a",border:`1p
onMouseEnter={e=>e.currentTarget.style.borderColor=p.color}
onMouseLeave={e=>e.currentTarget.style.borderColor=p.color+"33"}>
<span style={{fontSize:"1.2rem"}}>{p.icon}</span>
<div>
<div style={{fontSize:"0.78rem",fontWeight:600,color:"#fff",whiteSpace:"nowrap"
<div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.35)",marginTop:1}}>{p
</div>
</div>;
})}
</div>
</div>}
<section id="products" style={{maxWidth:1140,margin:"0 auto",padding:"80px 36px",backgrou
<div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"upp
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.9rem,4vw,2.7rem)",fontWei
<div style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontWeight:600,fontSize:
<div style={{fontSize:"0.83rem",color:"rgba(255,255,255,0.4)",marginBottom:28}}>All pro
{/* ── CATEGORY FILTER BAR ── */}
<HomeCatFilter go={go} wishlist={wishlist} toggleWishlist={toggleWishlist}/>
</section>
<section style={{background:"#141414",padding:"72px 36px"}}>
<div style={{maxWidth:1100,margin:"0 auto"}}>
<div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"u
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.5rem)",fontW
<div style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontWeight:600,fontSiz
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
{[[" ","≥99% Purity","HPLC-verified every batch. Full documentation included."],["
<div key={title} style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padd
<div style={{fontSize:"1.5rem",marginBottom:12}}>{icon}</div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#fff",marginB
<div style={{fontSize:"0.83rem",color:"rgba(255,255,255,0.45)",lineHeight:1.6}}
</div>
))}
</div>
</div>
</section>
<div style={{background:"linear-gradient(135deg,#1a237e,#1565c0)",margin:"0 36px 80px",bo
<div style={{position:"absolute",right:-20,top:-30,fontFamily:"'Syne',sans-serif",fontS
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.6rem,3vw,2.2rem)",fontW
<div style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontWeight:600,fontSiz
<div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.45)"}}>For research use only
</div>
<div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
<button onClick={()=>document.getElementById("products").scrollIntoView({behavior:"sm
<button onClick={()=>go("contact")} style={{background:"transparent",color:"#fff",bor
</div>
</div>
<SiteFooter go={go}/>
</div>;
}
// ── PRODUCT PAGE ────────────────────────────────────
function ProductPage({p,go,onAddToCart,wishlist=[],toggleWishlist=()=>{}}){
const sizes = p.sizes || [{s:p.size,p:p.price}];
const defaultIdx = sizes.findIndex(s=>!s.oos);
const [selIdx,setSelIdx]=useState(defaultIdx>=0?defaultIdx:0);
const [coaUrl,setCoaUrl]=useState(null);
// Always start at top
useEffect(()=>{ window.scrollTo(0,0); },[p.id]);
const sel = sizes[selIdx];
const isLight = p.color===C.g||p.color===C.y||p.color==="#ffd166";
const textOnColor = isLight ? C.ink : "#fff";
return <div style={{paddingTop:70,background:"#0e0e0e",color:"#ffffff"}}>
{/* ── PRODUCT PLACARD HERO ── */}
<div style={{background:`linear-gradient(160deg,${p.color}55 0%,${p.color}11 40%,#080808
<div style={{position:"absolute",width:280,height:280,borderRadius:"50%",background:p.c
{/* Form type badge — top right */}
<div style={{position:"absolute",top:14,right:14,background:"rgba(0,0,0,0.5)",backdropF
<span style={{fontSize:"1rem"}}>{FORM_TYPE[p.id]==="capsule"?" ":FORM_TYPE[p.id]==="
<span style={{fontSize:"0.65rem",fontWeight:600,color:"rgba(255,255,255,0.65)",letter
</div>
<div style={{fontSize:"4.5rem",marginBottom:16,position:"relative",zIndex:1,filter:"dro
<h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(2rem,6vw,3rem)",fontWeight:8
<div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.5)",marginBottom:20,position:
{p.chips&&<div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",pos
{p.chips.map(chip=>{
const [main,sub]=chip.split('·').map(s=>s.trim());
return <div key={chip} style={{background:"rgba(0,0,0,0.5)",borderRadius:12,padding
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.85rem",col
{sub&&<div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.5)",marginTop:2}}
</div>;
})}
</div>}
</div>
{/* ── TOP SECTION: single column, max-width centered ── */}
<div style={{maxWidth:760,margin:"0 auto",padding:"32px 24px 0"}}>
{/* Back + badges */}
<div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:22}}
<button onClick={()=>goBack()} style={{background:"none",border:"1.5px solid rgba(255
<span style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0
<button onClick={()=>toggleWishlist(p.id)} style={{marginLeft:"auto",background:wishl
{wishlist.includes(p.id)?" Saved":" Save"}
</button>
<span style={{background:p.color+"22",color:p.color,borderRadius:100,padding:"4px 12p
</div>
{/* Description */}
<p style={{fontSize:"0.97rem",color:"rgba(255,255,255,0.6)",lineHeight:1.85,marginBotto
{/* Best For + Difficulty */}
{PRODUCT_META[p.id]&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:24,
<span style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.3)",marginRight:4}}>Best fo
{PRODUCT_META[p.id].bestFor.map(tag=>(
<span key={tag} style={{fontSize:"0.72rem",fontWeight:600,padding:"4px 12px",border
))}
</span>
</div>}
<span style={{fontSize:"0.72rem",fontWeight:700,padding:"4px 12px",borderRadius:100,m
{PRODUCT_META[p.id].difficulty==="Beginner"?" ":PRODUCT_META[p.id].difficulty==="A
{/* Price + Size Selector + CTA */}
<div style={{background:"#1c1c1c",borderRadius:18,padding:"22px 24px",border:"1px solid
{/* Size selector */}
{sizes.length>1&&<div style={{marginBottom:18}}>
<div style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.45)",margi
<div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
{sizes.map((sz,i)=>(
<button key={sz.s} onClick={()=>!sz.oos&&setSelIdx(i)} style={{padding:"9px 18p
{sz.s}{sz.oos&&<span style={{fontSize:"0.6rem",marginLeft:4,color:"rgba(255,2
</button>
))}
</div>
</div>}
<div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:10}}>
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.45rem",fontWeight:700,color
<div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.35)"}}>/ {sel.s} · lyophi
</div>
{/* Water dilution guide per size — exact per product */}
{(()=>{
const r = RECON[p.id]&&RECON[p.id][sel.s];
if(!r) return null;
if(r.water==="N/A") return <div style={{display:"flex",alignItems:"center",gap:8,ma
<span style={{fontSize:"1rem"}}> </span>
<div>
<div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.5)",marginBottom:1}}>
<div style={{fontSize:"0.82rem",color:"#3be8b0",fontWeight:600}}>{r.note}</div>
</div>
</div>;
return <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,backg
<span style={{fontSize:"0.85rem",flexShrink:0}}> </span>
<div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
<span style={{fontSize:"0.78rem",color:"#3be8b0",fontWeight:600}}>{r.water} BAC
<span style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.3)"}}>→</span>
<span style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.6)"}}>{r.conc}</span
<span style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.25)"}}>·</span>
<span style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.35)"}}>{r.note}</spa
</div>
</div>;
})()}
<div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",marginBottom:10}}>Resea
<PrimaryBtn color={p.color} tc={textOnColor} full style={{padding:"15px",fontSize:"1r
</div>
{/* Feature pills */}
<div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>
{[" ≥99% Purity"," COA Included"," US Only"," Research Use Only"," Same Da
<span key={t} style={{fontSize:"0.73rem",fontWeight:600,padding:"5px 14px",borderRa
))}
</div>
8px 32
{/* ── INFO CARD (dark, full width, underneath) ── */}
<div style={{background:"#161616",borderRadius:22,overflow:"hidden",boxShadow:"0 {/* Accent header */}
<div style={{background:p.color,padding:"18px 22px",display:"flex",alignItems:"center
<div style={{width:46,height:46,borderRadius:12,background:"rgba(255,255,255,0.22)"
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:
<div style={{fontSize:"0.76rem",color:isLight?"rgba(0,0,0,0.5)":"rgba(255,255,255
</div>
<div style={{marginLeft:"auto",textAlign:"right"}}>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",colo
<div style={{fontSize:"0.68rem",color:isLight?"rgba(0,0,0,0.5)":"rgba(255,255,255
</div>
</div>
{/* Data rows — 2-column grid on wider screens */}
<div className="info-card-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",
{[
{icon:" ",label:"Laboratory",value:p.coa.labs.join(" + ")},
{icon:" ",label:"Method",value:"HPLC + Mass Spec"},
{icon:" ",label:"COA Reports",value:`${p.coa.tests.length} batches verified`},
{icon:" ",label:"Testing",value:"Independent 3rd Party"},
{icon:" ",label:"Form",value:"Lyophilized Powder"},
{icon:" ",label:"Intended Use",value:"Research Only"},
].map(({icon,label,value},i)=>(
<div key={label} style={{background:"#1e1e1e",padding:"16px 20px",display:"flex",
<div style={{display:"flex",alignItems:"center",gap:7}}>
<span style={{fontSize:"0.95rem"}}>{icon}</span>
<span style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.5)",fontWeight:500
</div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",co
</div>
))}
</div>
<div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.35)"}}>Tested by {p.coa
<div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.25)",marginTop:2}}>All
{/* COA download footer */}
<div style={{padding:"14px 22px",borderTop:"1px solid rgba(255,255,255,0.08)",backgro
<div>
</div>
<a href={p.coa.tests[0].url} target="_blank" rel="noreferrer"
style={{background:p.color,color:isLight?"#0e0e0e":"#fff",textDecoration:"none",p
onMouseEnter={e=>e.currentTarget.style.opacity="0.82"} onMouseLeave={e=>e.current
Download COA ↗
</a>
</div>
</div>
</div>
{/* ── RESEARCH POTENTIAL PLACARD ── */}
<ResearchPotentialPlacard productId={p.id} productColor={p.color} />
{/* Guide */}
<div style={{maxWidth:760,margin:"0 auto",padding:"0 24px 56px"}}>
{/* ── STACK SUGGESTIONS ── */}
{PRODUCT_META[p.id]?.stacks?.length>0&&<div style={{marginBottom:36}}>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",marginBott
<span> </span> Commonly Researched With
</div>
<div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
{PRODUCT_META[p.id].stacks.map(sid=>{
const sp=PRODUCTS.find(x=>x.id===sid);
if(!sp)return null;
return <div key={sid} onClick={()=>go("product",sid)}
style={{display:"flex",alignItems:"center",gap:10,background:"#1c1c1c",border:`
onMouseEnter={e=>e.currentTarget.style.borderColor=sp.color}
onMouseLeave={e=>e.currentTarget.style.borderColor=sp.color+"33"}>
<span style={{fontSize:"1.4rem"}}>{sp.icon}</span>
<div>
<div style={{fontWeight:600,fontSize:"0.82rem",color:"#fff"}}>{sp.name}</div>
<div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.4)",marginTop:1}}>{
</div>
</div>;
})}
</div>
</div>}
<div style={{textAlign:"center",marginBottom:44}}>
<h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.9rem",fontWeight:800,letterSpa
<p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.88rem"}}>Reconstitution · Dosin
<div style={{display:"inline-block",background:"rgba(255,107,107,0.08)",border:"1px s
</div>
<div style={{display:"flex",flexDirection:"column",gap:13}}>
{p.guide.map((s,i)=>(
<div key={i} style={{background:"#1c1c1c",borderRadius:17,padding:"22px 26px",borde
<div style={{width:36,height:36,borderRadius:"50%",background:p.color,color:"#fff
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:6,fontS
{s.text&&<div style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.55)",lineHei
{s.chip&&<div style={{background:p.color+"18",border:`1px solid ${p.color}44`,b
{s.grid&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,margin
{s.grid.map(([l,v])=><div key={l} style={{background:"rgba(255,255,255,0.05)"
<div style={{fontSize:"0.66rem",color:"rgba(255,255,255,0.4)",marginBottom:
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.8rem
</div>)}
</div>}
{s.rows&&<div style={{display:"flex",flexDirection:"column",gap:5,marginTop:8}}
{s.rows.map(([l,v])=><div key={l} style={{background:"rgba(255,255,255,0.04)"
<span style={{fontSize:"0.8rem",fontWeight:400,color:"rgba(255,255,255,0.4)
<span style={{fontSize:"0.82rem",fontWeight:600,color:"rgba(255,255,255,0.8
</div>)}
</div>}
{s.cycle&&<div style={{display:"flex",alignItems:"center",gap:9,flexWrap:"wrap"
{s.cycle.map((c,ci)=><span key={ci} style={{display:"inline-flex",alignItems:
<div style={{background:ci===1?"rgba(0,0,0,0.05)":p.color+"18",border:`1px
{ci<s.cycle.length-1&&<span style={{color:C.muted}}>→</span>}
</span>)}
</div>}
</div>
</div>
))}
</div>
<div style={{background:"rgba(255,107,107,0.12)",border:"1px solid rgba(255,107,107,0.3
<span style={{flexShrink:0}}> </span>
<div style={{fontSize:"0.82rem",lineHeight:1.7,color:"rgba(255,150,130,0.85)"}}><stro
</div>
</div>
{/* COA */}
<div style={{background:"#111111",padding:"36px 24px"}}>
<div style={{maxWidth:820,margin:"0 auto"}}>
<div style={{textAlign:"center",marginBottom:36}}>
<div style={{display:"inline-block",background:"rgba(59,232,176,0.12)",color:C.g,fo
Third-Party Verified{p.coa.dual?" · Dual Validated":""}
</div>
<h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.35rem",fontWeight:800,color:
<p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.45)",lineHeight:1.7,maxWidt
Every batch tested independently. Every batch independently tested and verified b
</p>
</div>
<div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,color:"#fff",marginB
<div style={{fontSize:"0.76rem",color:"rgba(255,255,255,0.38)",marginBottom:9}}
<div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
{p.coa.labs.map(l=><span key={l} style={{fontSize:"0.68rem",fontWeight:600,pa
</div>
</div>
<div style={{textAlign:"center"}}>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"2rem",colo
<div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.35)",textTransform:"u
</div>
</div>
<div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:18}}>
{p.coa.tests.map(t=>(
<div key={t.name} style={{display:"flex",alignItems:"center",gap:12,background:
<div style={{flex:1}}>
<div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.7)",marginBottom:
<div style={{fontSize:"0.73rem",fontWeight:700,color:C.g}}>{t.result}</div>
</div>
<a href={t.url} target="_blank" rel="noreferrer"
style={{flexShrink:0,background:"rgba(255,255,255,0.08)",color:"#fff",textD
onMouseEnter={e=>e.target.style.background=C.b} onMouseLeave={e=>e.target.s
View PDF ↗
</a>
</div>
))}
</div>
<div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.28)",textAlign:"center",b
All certificates tested by Freedom Diagnostics — independently verifiable
</div>
</div>
</div>
</div>
<SiteFooter go={go}/>
</div>;
}
// ── CONTACT PAGE ────────────────────────────────────
function ContactPage({go}){
return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
<div style={{maxWidth:480,margin:"0 auto",padding:"48px 20px 80px"}}>
{/* Back */}
<span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:C.muted,cursor:"pointer
{/* Header */}
<div style={{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"upp
<h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,5vw,2.4rem)",fontWeig
<p style={{fontSize:"0.92rem",color:C.muted,lineHeight:1.75,marginBottom:32}}>
Questions about compounds, COA documentation, or an order? We typically respond withi
</p>
{/* Info cards — single column, compact */}
<div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:28}}>
{[
[" ","Email","alphaomegatides@yahoo.com","mailto:alphaomegatides@yahoo.com"],
[" ","Order Support","Questions about an existing order","mailto:alphaomegatides@y
[" [" ","COA & Research Docs","Request lab reports or documentation","mailto:alphaome
","US Fulfillment Only","We ship to US addresses only","#"],
].map(([icon,title,sub,href])=>(
<a key={title} href={href}
style={{background:"#1c1c1c",borderRadius:14,padding:"16px 18px",border:"1px soli
onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 18px rgba(0,0,0,0.07)"}
onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
<div style={{width:40,height:40,borderRadius:10,background:"rgba(255,255,255,0.08
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",m
<div style={{fontSize:"0.78rem",color:C.muted,lineHeight:1.4}}>{sub}</div>
</div>
</a>
))}
</div>
{/* CTA */}
<a href="mailto:alphaomegatides@yahoo.com"
style={{display:"flex",alignItems:"center",justifyContent:"center",background:"#3be8b
onMouseEnter={e=>e.currentTarget.style.background=C.b}
onMouseLeave={e=>e.currentTarget.style.background=C.ink}>
Email Us Now
</a>
<div style={{textAlign:"center",marginTop:10,fontSize:"0.72rem",color:C.muted}}>alphaom
<div style={{textAlign:"center",marginTop:24,fontSize:"0.72rem",color:C.muted,lineHeigh
All Alphaomegatides products are for research use only · Not for human or veterinary
</div>
</div>
<SiteFooter go={go}/>
</div>;
}
// ── REGISTER ────────────────────────────────────────
function Register({go,onLogin}){
const [f,sf]=useState({fname:"",lname:"",email:"",pass:"",phone:"",street:"",apt:"",city:""
const [terms,st]=useState(false);
const [err,se]=useState("");
const set=(k,v)=>sf(p=>({...p,[k]:v}));
function handleAddressSelect(full, parts) {
if(parts && parts.length >= 2) {
const cityState = parts[1].trim().split(" ");
const state = cityState.length > 1 ? cityState[cityState.length-1] : "";
const city = cityState.slice(0, cityState.length > 1 ? -1 : undefined).join(" ");
const zip = parts[2] ? parts[2].trim() : "";
sf(p=>({...p, street:parts[0], city, state: STATES.find(s=>s.includes(state))||"", zip}
}
}
function submit(){
if(!f.fname||!f.lname||!f.email||!f.pass||!f.phone||!f.street||!f.city||!f.state||!f.zip)
if(!f.email.includes("@")){se("Enter a valid email.");return;}
if(f.pass.length<8){se("Password must be at least 8 characters.");return;}
if(!terms){se("Please agree to the Terms of Service.");return;}
const users=getUsers();
if(users[f.email.toLowerCase()]){se("Account already exists with this email.");return;}
const u={...f,email:f.email.toLowerCase(),address:{street:f.street,apt:f.apt,city:f.city,
users[u.email]=u; saveUsers(users); setSess(u); onLogin(u); go("dashboard");
}
return <div style={{paddingTop:70,minHeight:"100vh",background:"#0e0e0e",display:"flex",ali
<div style={{background:"#1a1a1a",borderRadius:24,padding:40,maxWidth:520,width:"100%",bo
<div style={{textAlign:"center",marginBottom:28}}>
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.4rem",fontWeight:800,marginBo
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.55rem",fontWeight:800,letterS
<div style={{fontSize:"0.8rem",color:C.muted,marginTop:4}}> US researchers only · D
</div>
{err&&<div style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,10
<div style={{display:"flex",flexDirection:"column",gap:13}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
<Field label="First Name" value={f.fname} onChange={e=>set("fname",e.target.value)}
<Field label="Last Name" value={f.lname} onChange={e=>set("lname",e.target.value)}
</div>
<Field label="Email Address" type="email" value={f.email} onChange={e=>set("email",e.
<Field label="Password (min 8 chars)" type="password" value={f.pass} onChange={e=>set
<Field label="Phone Number" type="tel" value={f.phone} onChange={e=>set("phone",e.tar
<div style={{borderTop:"1px solid rgba(0,0,0,0.08)",paddingTop:16,display:"flex",flex
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",displ
Shipping Address
<span style={{background:"rgba(79,142,247,0.12)",color:C.b,fontSize:"0.65rem",pad
</div>
<AddressField
label="Street Address"
value={f.street}
onChange={v=>set("street",v)}
onSelect={handleAddressSelect}
placeholder="Start typing your address…"
/>
<Field label="Apt / Suite (optional)" value={f.apt} onChange={e=>set("apt",e.target
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
<Field label="City" value={f.city} onChange={e=>set("city",e.target.value)} place
<StateSelect label="State" value={f.state} onChange={e=>set("state",e.target.valu
</div>
<div style={{maxWidth:160}}>
<Field label="ZIP Code" value={f.zip} onChange={e=>set("zip",e.target.value)} pla
</div>
</div>
<div style={{display:"flex",alignItems:"flex-start",gap:9}}>
<input type="checkbox" checked={terms} onChange={e=>st(e.target.checked)} style={{m
<label style={{fontSize:"0.77rem",color:C.muted,cursor:"pointer",lineHeight:1.5}}>I
</div>
<PrimaryBtn onClick={submit} full style={{padding:"14px",fontSize:"0.95rem"}}>Create
<div style={{textAlign:"center",fontSize:"0.82rem",color:C.muted}}>Already have an ac
</div>
</div>
</div>;
}
// ── LOGIN ────────────────────────────────────────────
function Login({go,onLogin}){
const [email,se]=useState(""); const [pass,sp]=useState(""); const [err,serr]=useState("");
function submit(){
if(!email||!pass){serr("Please enter your email and password.");return;}
const users=getUsers(); const u=users[email.toLowerCase()];
if(!u||u.pass!==pass){serr("Incorrect email or password.");return;}
setSess(u); onLogin(u); go("dashboard");
}
return <div style={{paddingTop:70,minHeight:"100vh",background:"#0e0e0e",display:"flex",ali
<div style={{background:"#1a1a1a",borderRadius:24,padding:40,maxWidth:400,width:"100%",bo
<div style={{textAlign:"center",marginBottom:28}}>
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.4rem",fontWeight:800,marginBo
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.55rem",fontWeight:800,letterS
<div style={{fontSize:"0.8rem",color:C.muted,marginTop:4}}>Sign in to your account</d
</div>
{err&&<div style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,10
<div style={{display:"flex",flexDirection:"column",gap:13}}>
<Field label="Email Address" type="email" value={email} onChange={e=>se(e.target.valu
<Field label="Password" type="password" value={pass} onChange={e=>sp(e.target.value)}
<PrimaryBtn onClick={submit} full style={{padding:"14px",fontSize:"0.95rem"}}>Sign In
<div style={{textAlign:"center",fontSize:"0.82rem",color:C.muted}}>No account? <span
</div>
</div>
</div>;
}
// ── DASHBOARD ────────────────────────────────────────
function Dashboard({user,go,onLogout,wishlistIds=[]}){
const [tab,st]=useState("orders");
const [pf,spf]=useState({fname:user.fname||"",lname:user.lname||"",phone:user.phone||"",...
const [saved,ss]=useState(false);
const [bImgs,sbI]=useState([]); const [aImgs,saI]=useState([]);
const [cmpB,scB]=useState(null); const [cmpA,scA]=useState(null);
const bRef=useRef(); const aRef=useRef();
// Progress tracker state
const [logs,setLogs]=useState(()=>{try{return JSON.parse(localStorage.getItem('nxg_logs_'+u
const [newLog,setNewLog]=useState({date:new Date().toISOString().split('T')[0],time:'',weig
const [showForm,setShowForm]=useState(false);
const [logTab,setLogTab]=useState('weight');
function saveLog(){
if(!newLog.weight&&!newLog.notes) return;
const updated=[{...newLog,id:Date.now()},...logs];
setLogs(updated);
localStorage.setItem('nxg_logs_'+user.email,JSON.stringify(updated));
setNewLog({date:new Date().toISOString().split('T')[0],time:'',weight:'',unit:'lbs',bodyf
setShowForm(false);
}
function deleteLog(id){setLogs(p=>{const u=p.filter(l=>l.id!==id);localStorage.setItem('nxg
const latestWeight=logs.find(l=>l.weight);
const firstWeight=logs.slice().reverse().find(l=>l.weight);
const weightChange=latestWeight&&firstWeight&&latestWeight!==firstWeight?parseFloat(latestW
function saveProfile(){
const users=getUsers();
const updated={...user,...pf,address:{street:pf.street,apt:pf.apt,city:pf.city,state:pf.s
users[user.email]=updated; saveUsers(users); setSess(updated); ss(true); setTimeout(()=>s
}
function handlePhoto(type,files){
Array.from(files).forEach(f=>{
const r=new FileReader(); r.onload=e=>{
const src=e.target.result;
if(type==="b"){sbI(p=>{if(!cmpB)scB(src);return[...p,src];});}
else{saI(p=>{if(!cmpA)scA(src);return[...p,src];});}
}; r.readAsDataURL(f);
});
}
const sColor={shipped:C.b,delivered:C.g,processing:C.y};
const tabs=[["orders"," Orders"],["profile"," Profile"],["progress"," Progress"],["w
return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
<div style={{maxWidth:1020,margin:"0 auto",padding:"40px 36px 80px"}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap
<div>
<div style={{fontSize:"0.68rem",fontWeight:600,letterSpacing:"0.12em",textTransform
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.9rem",fontWeight:800,letter
</div>
<GhostBtn onClick={()=>{clearSess();onLogout();go("home");}}>Sign Out</GhostBtn>
</div>
<div style={{display:"flex",gap:2,flexWrap:"wrap",borderBottom:"2px solid rgba(255,255,
{tabs.map(([id,label])=>(
<button key={id} onClick={()=>st(id)}
style={{background:"none",border:"none",padding:"10px 20px",fontFamily:"inherit",
{label}
</button>
))}
</div>
{tab==="orders"&&<div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",fontWeight:700}}>Orde
<PrimaryBtn onClick={()=>go("home")} style={{padding:"9px 22px",fontSize:"0.82rem"}
</div>
{(!user.orders||!user.orders.length)
?<div style={{textAlign:"center",padding:"56px 0",color:C.muted}}><div style={{font
:(user.orders||[]).map(o=>(
<div key={o.id} style={{background:"#1c1c1c",borderRadius:15,padding:22,border:"1
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-sta
<div>
<div style={{display:"flex",alignItems:"center",gap:9,marginBottom:5}}>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700}}>{o.product}<
<span style={{fontSize:"0.66rem",fontWeight:700,letterSpacing:"0.07em",te
</div>
<div style={{fontSize:"0.75rem",color:C.muted}}>Order {o.id} · {o.date} · Q
{o.tracking&&<div style={{fontSize:"0.72rem",color:C.b,marginTop:3}}> Tra
</div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.15rem"
</div>
</div>
))
}
</div>}
{tab==="profile"&&<div>
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",fontWeight:700,marginBo
<div style={{background:"#1c1c1c",borderRadius:18,padding:28,border:"1px solid rgba(2
<div style={{display:"flex",flexDirection:"column",gap:13}}>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
<Field label="First Name" value={pf.fname||""} onChange={e=>spf(p=>({...p,fname
<Field label="Last Name" value={pf.lname||""} onChange={e=>spf(p=>({...p,lname:
</div>
<Field label="Email (cannot change)" value={user.email} disabled style={{opacity:
<Field label="Phone" value={pf.phone||""} onChange={e=>spf(p=>({...p,phone:e.targ
<div style={{borderTop:"1px solid rgba(0,0,0,0.08)",paddingTop:14,display:"flex",
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",d
Shipping Address <span style={{background:"rgba(79,142,247,0.12)",color:C.b,f
</div>
<AddressField label="Street" value={pf.street||""} onChange={v=>spf(p=>({...p,s
<Field label="Apt / Suite" value={pf.apt||""} onChange={e=>spf(p=>({...p,apt:e.
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
<Field label="City" value={pf.city||""} onChange={e=>spf(p=>({...p,city:e.tar
<StateSelect label="State" value={pf.state||""} onChange={e=>spf(p=>({...p,st
</div>
<div style={{maxWidth:160}}><Field label="ZIP" value={pf.zip||""} onChange={e=>
</div>
<PrimaryBtn onClick={saveProfile} full style={{padding:"13px",fontSize:"0.9rem"}}
{saved&&<div style={{textAlign:"center",color:"#0e8e65",fontSize:"0.82rem",fontWe
</div>
</div>
</div>}
{tab==="progress"&&<div>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",margin
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",fontWeight:700}}>Pr
<div style={{fontSize:"0.8rem",color:C.muted,marginTop:3}}>Weight · Measurements
</div>
<button onClick={()=>setShowForm(p=>!p)} style={{background:"#3be8b0",color:"#0e0e0
{showForm?"Cancel":"+ Log Entry"}
</button>
</div>
{/* Stats summary */}
{logs.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minm
{[
${firs
["Current",latestWeight?`${latestWeight.weight} ${latestWeight.unit}`:"—"," "],
["Starting",firstWeight&&firstWeight!==latestWeight?`${firstWeight.weight} ["Change",weightChange!==null?`${weightChange>0?"+":""}${weightChange.toFixed(1)}
["Entries",logs.length," "],
].map(([label,val,icon])=>(
<div key={label} style={{background:"#1c1c1c",borderRadius:12,padding:"14px 16px"
<div style={{fontSize:"1.1rem",marginBottom:6}}>{icon}</div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",co
<div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.35)",marginTop:2,text
</div>
))}
</div>}
{/* Log entry form */}
{showForm&&<div style={{background:"#1a1a1a",borderRadius:18,padding:24,border:"1px s
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",margi
{/* Date + Time */}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
<div>
<div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,tex
<input type="date" value={newLog.date} onChange={e=>setNewLog(p=>({...p,date:e.
style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,
</div>
<div>
<div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,tex
<input type="time" value={newLog.time} onChange={e=>setNewLog(p=>({...p,time:e.
style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,
</div>
</div>
{/* Sub-tabs */}
<div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
{[["weight"," Weight"],["measurements"," Measurements"],["workout"," <button key={t} onClick={()=>setLogTab(t)}
style={{padding:"6px 14px",borderRadius:100,border:"none",cursor:"pointer",fo
{l}
</button>
Workou
))}
</div>
1fr",g
{/* Weight inputs */}
{logTab==="weight"&&<div style={{display:"grid",gridTemplateColumns:"2fr 1fr <div>
<div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,tex
<input type="number" placeholder="e.g. 185" value={newLog.weight} onChange={e=>
style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,
</div>
<div>
<div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,tex
<select value={newLog.unit} onChange={e=>setNewLog(p=>({...p,unit:e.target.valu
style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,
<option>lbs</option><option>kg</option>
</select>
</div>
<div>
<div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,tex
<input type="number" placeholder="e.g. 18" value={newLog.bodyfat} onChange={e=>
style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,
</div>
</div>}
{/* Measurements */}
{logTab==="measurements"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr"
{[["chest","Chest (in)"],["waist","Waist (in)"],["hips","Hips (in)"],["neck","Nec
<div key={key}>
<div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,t
<input type="number" step="0.1" placeholder="0.0" value={newLog[key]} onChang
style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,25
</div>
))}
</div>}
{/* Workout notes */}
{logTab==="workout"&&<div>
<div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,textT
<textarea placeholder="e.g. Legs day — squats 225lbs 4x8, leg press 400lbs, felt
style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.
</div>}
{/* Photos */}
{logTab==="photos"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1
{[["b"," ","Before",C.r],["a"," ","After","#3be8b0"]].map(([type,icon,label,col
<div key={type}>
<div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,t
<div onClick={()=>(type==="b"?bRef:aRef).current.click()}
style={{border:`2px dashed ${col}44`,borderRadius:12,padding:"20px",textAli
onMouseEnter={e=>{e.currentTarget.style.borderColor=col;e.currentTarget.sty
onMouseLeave={e=>{e.currentTarget.style.borderColor=col+"44";e.currentTarge
<div style={{fontSize:"1.5rem",marginBottom:4}}>{icon}</div>
<div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)"}}>Click to up
</div>
<input ref={type==="b"?bRef:aRef} type="file" accept="image/*" multiple style
<div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:8}}>
{(type==="b"?bImgs:aImgs).map((src,i)=>(
<img key={i} src={src} onClick={()=>type==="b"?scB(src):scA(src)}
style={{width:56,height:56,objectFit:"cover",borderRadius:8,border:`2px
))}
</div>
</div>
))}
</div>}
<button onClick={saveLog} style={{marginTop:16,width:"100%",padding:"12px",backgrou
Save Entry
</button>
</div>}
{/* Photo comparison */}
{(cmpB||cmpA)&&<div style={{background:"#1c1c1c",borderRadius:16,padding:20,border:"1
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",margin
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
{[[cmpB,"BEFORE","#ff6b6b"],[cmpA,"AFTER","#3be8b0"]].map(([src,lbl,col])=>(
<div key={lbl} style={{textAlign:"center"}}>
<div style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.1em",color:co
{src?<img src={src} style={{width:"100%",borderRadius:10,objectFit:"cover",ma
:<div style={{height:140,background:"#252525",borderRadius:10,display:"flex
</div>
))}
</div>
</div>}
{/* Log history */}
{logs.length>0&&<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",margin
<div style={{display:"flex",flexDirection:"column",gap:8}}>
{logs.map(log=>(
<div key={log.id} style={{background:"#1c1c1c",borderRadius:12,padding:"14px 16
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-s
<div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
<div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)"}}>{log.date}
{log.weight&&<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,f
{log.bodyfat&&<div style={{fontSize:"0.78rem",color:"#3be8b0"}}>{log.body
{log.chest&&<div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)"
</div>
<button onClick={()=>deleteLog(log.id)} style={{background:"none",border:"n
onMouseEnter={e=>e.currentTarget.style.color="#ff6b6b"} onMouseLeave={e=>
</div>
{log.notes&&<div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.5)",line
</div>
))}
</div>
</div>}
{logs.length===0&&!showForm&&<div style={{textAlign:"center",padding:"48px 0",color:"
<div style={{fontSize:"2.5rem",marginBottom:12}}> </div>
<div style={{fontWeight:600,marginBottom:6}}>No entries yet</div>
<div style={{fontSize:"0.82rem"}}>Start logging your weight, measurements and worko
</div>}
<div style={{marginTop:16,background:"rgba(59,232,176,0.06)",border:"1px solid </span><span>All progress data stored locally in your browser — never sent
<span> </div>
</div>}
rgba(5
{tab==="wishlist"&&<div>
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",fontWeight:700,marginBo
<div style={{fontSize:"0.83rem",color:C.muted,marginBottom:20}}>Products you've saved
{(!wishlistIds||wishlistIds.length===0)
?<div style={{textAlign:"center",padding:"40px 0",color:C.muted}}>
<div style={{fontSize:"2rem",marginBottom:10}}> </div>
<div>No saved compounds yet.</div>
<div style={{fontSize:"0.8rem",marginTop:6}}>Tap the on any product to save it
</div>
:<div style={{display:"flex",flexDirection:"column",gap:10}}>
{wishlistIds.map(id=>{
const p=PRODUCTS.find(x=>x.id===id);
if(!p)return null;
return <div key={id} style={{background:"#1c1c1c",borderRadius:14,padding:"14px
<div style={{width:44,height:44,borderRadius:10,background:p.color+"22",displ
<div style={{flex:1,minWidth:0}}>
<div style={{fontWeight:600,fontSize:"0.88rem",marginBottom:2}}>{p.name}</d
<div style={{fontSize:"0.72rem",color:C.muted}}>{p.sizes?p.sizes[0].p:p.pri
</div>
<button onClick={()=>go("product",id)} style={{background:p.color,color:p.col
</div>;
})}
</div>
}
</div>}
batche
{tab==="coa"&&<div>
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",fontWeight:700,marginBo
<div style={{fontSize:"0.83rem",color:C.muted,marginBottom:24}}>Third-party lab certi
<div style={{display:"flex",flexDirection:"column",gap:14}}>
{PRODUCTS.map(p=>(
<div key={p.id} style={{background:"#1c1c1c",borderRadius:15,padding:22,border:"1
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-sta
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.98re
<div style={{fontSize:"0.75rem",color:C.muted}}>{p.coa.tests.length} </div>
<div style={{background:"rgba(59,232,176,0.12)",color:"#0e8e65",fontFamily:"'
</div>
<div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
{p.coa.tests.map(t=>(
<a key={t.name} href={t.url} target="_blank" rel="noreferrer"
style={{fontSize:"0.72rem",fontWeight:600,padding:"5px 13px",borderRadius
onMouseEnter={e=>e.target.style.background=C.b} onMouseLeave={e=>e.target
{t.name.split(" ").slice(0,2).join(" ")} ↗
</a>
))}
</div>
</div>
))}
</div>
<div style={{background:"rgba(255,255,255,0.04)",borderRadius:11,padding:"12px All COAs independently verified by Freedom Diagnostics lab.
</div>
</div>}
</div>
</div>;
16px",
}
// ── CHECKOUT PAGE ────────────────────────────────────
function CheckoutPage({product:p, go, user}){
useEffect(()=>{
if(!p) return;
const handleMap={glp3r:"glp-3-r",glp2t:"glp-2-t",glp1:"glp-1",bpc157:"bpc-157",tb500:"tb-
const handle=handleMap[p.id]||p.id;
window.location.href=`https://sequential-peptides.myshopify.com/products/${handle}`;
},[]);
return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh",display:"flex",ali
<div style={{textAlign:"center",padding:"40px 24px",maxWidth:440}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBot
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",color:"
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",color:"
</div>
<div style={{width:56,height:56,borderRadius:"50%",background:"rgba(59,232,176,0.1)",bo
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",marginBott
<p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.88rem",lineHeight:1.7,marginBotto
<div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
{[[" ","Credit Card"],[" ","Apple Pay"],[" ","Shop Pay"]].map(([icon,label])=>(
<div key={label} style={{background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.
))}
</div>
<button onClick={()=>go("cart")} style={{marginTop:24,background:"transparent",color:"r
</div>
</div>;
}
function SiteFooter({go}){
return <footer style={{background:"#0a0a0a",color:"rgba(255,255,255,0.38)",fontSize:"0.78re
{/* FDA Disclaimer bar */}
<div style={{background:"rgba(255,107,107,0.12)",borderTop:"1px solid rgba(255,107,107,0.
<strong style={{color:"rgba(255,150,150,0.95)"}}>FDA DISCLAIMER:</strong> These product
</div>
<div style={{padding:"44px 36px 20px",background:"#0a0a0a"}}>
<div className="footer-grid" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridT
<div>
<div style={{position:"relative",display:"inline-block",marginBottom:14}}>
<div style={{display:"flex",alignItems:"center",gap:6}}>
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",c
<svg width="16" height="34" viewBox="0 0 14 28" fill="none" xmlns="http://www.w
<defs><linearGradient id="footerdna" x1="0" y1="0" x2="0" y2="28" gradientUni
<path d="M3 0 C1 4,1 8,3 12 C5 16,6 20,4 24 C3 26,2 27,2 28" stroke="url(#foo
<path d="M11 0 C13 4,13 8,11 12 C9 16,8 20,10 24 C11 26,12 27,12 28" stroke="
<line x1="3" y1="0" x2="11" y2="0" stroke="rgba(255,107,107,0.6)" strokeWidth
<line x1="2" y1="7" x2="12" y2="7" stroke="rgba(168,85,247,0.5)" strokeWidth=
<line x1="4" y1="14" x2="10" y2="14" stroke="rgba(100,150,255,0.5)" strokeWid
<line x1="3" y1="21" x2="11" y2="21" stroke="rgba(59,232,176,0.6)" strokeWidt
<line x1="2" y1="28" x2="12" y2="28" stroke="rgba(59,232,176,0.5)" strokeWidt
<circle cx="3" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/>
<circle cx="11" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/>
<circle cx="4" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/>
<circle cx="10" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/>
<circle cx="3" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/>
<circle cx="11" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/>
</svg>
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",c
</div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.7rem",lett
<div style={{fontStyle:"italic",fontSize:"0.62rem",color:"rgba(255,255,255,0.2)",
</div>
<p style={{lineHeight:1.7,maxWidth:280,color:"rgba(255,255,255,0.4)",fontSize:"0.8r
<div style={{marginTop:14,display:"flex",gap:10,flexWrap:"wrap"}}>
<span style={{background:"rgba(59,232,176,0.1)",color:C.g,fontSize:"0.68rem",font
<span style={{background:"rgba(59,232,176,0.1)",color:C.g,fontSize:"0.68rem",font
<span style={{background:"rgba(59,232,176,0.1)",color:C.g,fontSize:"0.68rem",font
</div>
</div>
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"rgba(255,255,255,
{[
{label:" Weight Loss",catId:"glp"},
{label:" Recovery & Healing",catId:"recovery"},
{label:" Growth & GH",catId:"growth"},
{label:" Longevity",catId:"longevity"},
{label:" Neuro & Sleep",catId:"neuro"},
{label:" Accessories",catId:"accessories"},
].map(({label,catId})=>(
<div key={catId} onClick={()=>go("category",catId)} style={{cursor:"pointer",marg
))}
</div>
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"rgba(255,255,255,
{[["Contact",()=>go("contact")],["COA Library",()=>go("coa")],["Sign In",()=>go("lo
<div key={l} onClick={fn} style={{cursor:"pointer",marginBottom:9,color:"rgba(255
))}
</div>
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"rgba(255,255,255,
{[["Terms of Service",()=>go("terms")],["Refund Policy",()=>go("refund")],["Privacy
<div key={l} onClick={fn} style={{cursor:"pointer",marginBottom:9,color:"rgba(255
))}
</div>
</div>
<div style={{maxWidth:1100,margin:"0 auto",borderTop:"1px solid rgba(255,255,255,0.07)"
<div>© 2026 Alphaomegatides. All rights reserved.</div>
<div>FOR RESEARCH USE ONLY. NOT FOR USE IN DIAGNOSTIC PROCEDURES. Human/Animal Consum
</div>
</div>
</footer>;
}
// ── LEGAL PAGES ────────────────────────────────────
function LegalPage({title,go,children}){
return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
<div style={{maxWidth:820,margin:"0 auto",padding:"52px 24px 80px"}}>
<span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:C.muted,cursor:"pointer
<h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeig
<div style={{fontSize:"0.78rem",color:C.muted,marginBottom:40}}>Alphaomegatides Terms —
<div style={{display:"flex",flexDirection:"column",gap:28}}>{children}</div>
</div>
<SiteFooter go={go}/>
</div>;
}
function LegalSection({title,children}){
return <div style={{background:"#1a1a1a",borderRadius:16,padding:"28px 32px",border:"1px so
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.05rem",marginBotto
<div style={{fontSize:"0.87rem",color:C.muted,lineHeight:1.85}}>{children}</div>
</div>;
}
They a
function TermsPage({go}){
return <LegalPage title="Terms of Service" go={go}>
<div style={{background:"rgba(255,107,107,0.12)",border:"1px solid rgba(255,107,107,0.3)"
<span style={{flexShrink:0,fontSize:"1.2rem"}}> </span>
<div style={{fontSize:"0.85rem",color:"#5c1f1f",lineHeight:1.7}}><strong>All orders are
</div>
<LegalSection title="Research Use Only">
All products are offered solely for lawful laboratory and in-vitro research use. </LegalSection>
<LegalSection title="Eligibility and Buyer Representations">
<div>You must be at least <strong>21 years old</strong> to place an order. Products may
<br/>By ordering, you represent that you understand the applicable laws, regulations, i
<br/><br/>Alphaomegatides may request verification, limit quantities, delay fulfillment
</LegalSection>
<LegalSection title="Orders, Pricing, and Payment">
Prices are quoted in U.S. dollars and are effective when an order is accepted. Alphaome
</LegalSection>
<LegalSection title="Order Finality and Returns">
Due to the nature of these products, <strong>all orders are final once submitted</stron
</LegalSection>
<LegalSection title="Product Use and Restrictions">
no cir
No product should be considered a food, drug, medical device, or cosmetic. Under </LegalSection>
<LegalSection title="Liability and Warranty Limitations">
Products are provided on an 'as is' and 'as available' basis. All warranties of merchan
</LegalSection>
<LegalSection title="Governing Law">
These terms are governed by Wyoming law. By using this site or placing an order, </LegalSection>
</LegalPage>;
you ac
}
function RefundPage({go}){
return <LegalPage title="Refund Policy" go={go}>
<div style={{background:"rgba(255,107,107,0.12)",border:"1px solid rgba(255,107,107,0.3)"
<span style={{flexShrink:0,fontSize:"1.2rem"}}> </span>
<div style={{fontSize:"0.85rem",color:"#5c1f1f",lineHeight:1.7}}><strong>ALL SALES ARE
</div>
<LegalSection title="Agreement on Purchase">
By placing an order you acknowledge and agree that: Products are sold strictly for labo
</LegalSection>
<LegalSection title="Receipt of Damaged or Incorrect Goods">
Every shipment is photographed, weighed, and sealed prior to dispatch. If a parcel is v
<ol style={{marginTop:10,marginLeft:20,display:"flex",flexDirection:"column",gap:6}}>
<li>Take clear photographs of the outer packaging, inner packaging, and product label
<li>Email the images and a brief description to <strong>alphaomegatides@yahoo.com</st
</ol>
<br/>After review, we may at our sole discretion offer a one-time reshipment of the aff
</LegalSection>
<LegalSection title="Chargebacks">
Initiating an unwarranted chargeback violates the sale agreement. We promptly submit fu
</LegalSection>
<LegalSection title="Questions">
For clarifications prior to ordering, contact us at <strong>alphaomegatides@yahoo.com</
</LegalSection>
</LegalPage>;
}
function PrivacyPage({go}){
return <LegalPage title="Privacy Policy" go={go}>
<div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",background:"#1a1a1a",border
<LegalSection title="Data We Collect">
We collect information you provide directly: contact details (name, address, phone, ema
<br/><br/><strong>We do not sell or provide your information to any third party, advert
</LegalSection>
<LegalSection title="How We Use Your Information">
Your information is used to: process payments and fulfill orders; send order/shipping n
</LegalSection>
<LegalSection title="SMS / Text Message Policy">
SMS consent is not shared with third parties. We will never send unsolicited text messa
</LegalSection>
<LegalSection title="Your Rights">
Depending on your location, you may have the right to: access personal information we h
</LegalSection>
<LegalSection title="Data Security and Retention">
No security measures are perfect. We recommend not using insecure channels to communica
</LegalSection>
<LegalSection title="Children's Data">
Our services are not intended for use by children under 21. We do not knowingly collect
</LegalSection>
<LegalSection title="Contact">
For privacy questions or to exercise your rights: <strong>alphaomegatides@yahoo.com</st
</LegalSection>
</LegalPage>;
}
function CoaLibraryPage({go}){
return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
<div style={{maxWidth:900,margin:"0 auto",padding:"52px 24px 80px"}}>
<span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:C.muted,cursor:"pointer
<div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"upp
<h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeig
<p style={{fontSize:"0.9rem",color:C.muted,lineHeight:1.8,marginBottom:12,maxWidth:660}
<div style={{background:"rgba(59,232,176,0.08)",border:"1px solid rgba(59,232,176,0.2)"
</span><span>All Alphaomegatides COAs tested by <strong>Freedom Diagnostics</
<span> </div>
{/* Testing methodology */}
<div style={{background:"#1a1a1a",borderRadius:16,padding:"28px 32px",border:"1px solid
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.05rem",marginB
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
{[[" HPLC Purity","High-Performance Liquid Chromatography confirms compound ident
<div key={t} style={{background:"#1c1c1c",borderRadius:12,padding:"16px 18px",bor
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",m
<div style={{fontSize:"0.8rem",color:C.muted,lineHeight:1.6}}>{d}</div>
</div>
))}
</div>
</div>
{/* All product COA cards */}
<div style={{display:"flex",flexDirection:"column",gap:18}}>
{PRODUCTS.map(p=>{
const isLight=p.color===C.g||p.color===C.y;
return <div key={p.id} style={{background:"#1c1c1c",borderRadius:16,border:"1px sol
<div style={{background:p.color,padding:"14px 22px",display:"flex",alignItems:"ce
<div style={{display:"flex",alignItems:"center",gap:12}}>
<span style={{fontSize:"1.4rem"}}>{p.icon}</span>
<div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,color:isLight?"#
<div style={{fontSize:"0.72rem",color:isLight?"rgba(0,0,0,0.5)":"rgba(255,2
</div>
</div>
<div style={{display:"flex",alignItems:"center",gap:10}}>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",
</div>
</div>
<div style={{padding:"18px 22px"}}>
<div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
{p.coa.tests.map(t=>(
<a key={t.name} href={t.url} target="_blank" rel="noreferrer"
style={{display:"inline-flex",alignItems:"center",gap:6,background:"#1e1e
onMouseEnter={e=>e.currentTarget.style.background=C.b} onMouseLeave={e=>e
{t.name} ↗
</a>
))}
</div>
</div>
</div>;
<div style={{marginTop:12,fontSize:"0.72rem",color:C.muted}}>Labs: {p.coa.labs.
})}
</div>
<div style={{marginTop:32,background:"#1a1a1a",borderRadius:16,padding:"24px 28px",colo
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#fff",marginBottom:
Certificate fraud is common in the research peptide space. The two most common forms
</div>
</div>
<SiteFooter go={go}/>
</div>;
}
// ── AGE GATE ─────────────────────────────────────────
function AgeGate({onConfirm}){
return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:9999,disp
<div style={{background:"#1a1a1a",borderRadius:24,padding:"44px 36px",maxWidth:440,width:
<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,marginBott
<div style={{display:"flex",alignItems:"center",gap:7}}>
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.8rem",color
<svg width="18" height="36" viewBox="0 0 14 28" fill="none" xmlns="http://www.w3.or
<defs><linearGradient id="agegatedna" x1="0" y1="0" x2="0" y2="28" gradientUnits=
<path d="M3 0 C1 4,1 8,3 12 C5 16,6 20,4 24 C3 26,2 27,2 28" stroke="url(#agegate
<path d="M11 0 C13 4,13 8,11 12 C9 16,8 20,10 24 C11 26,12 27,12 28" stroke="url(
<line x1="3" y1="0" x2="11" y2="0" stroke="rgba(255,107,107,0.6)" strokeWidth="1.
<line x1="2" y1="7" x2="12" y2="7" stroke="rgba(168,85,247,0.5)" strokeWidth="1.4
<line x1="4" y1="14" x2="10" y2="14" stroke="rgba(100,150,255,0.5)" strokeWidth="
<line x1="3" y1="21" x2="11" y2="21" stroke="rgba(59,232,176,0.6)" strokeWidth="1
<line x1="2" y1="28" x2="12" y2="28" stroke="rgba(59,232,176,0.5)" strokeWidth="1
<circle cx="3" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/>
<circle cx="11" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/>
<circle cx="4" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/>
<circle cx="10" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/>
<circle cx="3" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/>
<circle cx="11" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/>
</svg>
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.8rem",color
</div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.65rem",letterS
<div style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontWeight:700,fontSiz
</div>
<div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,marginBott
<div style={{background:"rgba(255,107,107,0.08)",border:"1px solid rgba(255,107,107,0.2
<strong> For Research Use Only</strong><br/>
All products are for in-vitro laboratory research only. Not for human or veterinary c
</div>
<p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.65)",lineHeight:1.75,marginBott
By entering this site you confirm that you are <strong>at least 21 years old</strong>
</p>
<div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
<button onClick={onConfirm} style={{background:"#3be8b0",color:"#0e0e0e",border:"none
I am 21+ and agree →
</button>
<button onClick={()=>window.location.href="https://www.google.com"} style={{backgroun
Exit
</button>
</div>
<div style={{marginTop:18,fontSize:"0.72rem",color:"rgba(255,255,255,0.4)"}}>
Alphaomegatides · Research compounds for qualified researchers · US only
</div>
</div>
</div>;
}
// ── CART PAGE ────────────────────────────────────────
const VARIANT_MAP:Record<string,string> = {
glp3r:"45024999932112",glp2t:"45024999964880",glp1:"45025000030416",
bpc157:"45025000063184",tb500:"45025000095952",cjc1295:"45025000128720",
cjcipa:"45025000161488",ipamorlin:"45025000194256",tesamorlin:"45025000227024",
igf1lr3:"45025000259792",ghkcu:"45025000325328",glow:"45025000358096",
nad:"45025000390864",motsc:"45025000423632",glutathione:"45025000456400",
ss31:"45025000489168",selank:"45025000521936",semax:"45025000554704",
dsip:"45025000587472",mt2:"45025000620240",reconst:"45025000653008",
};
function CheckoutLink({cart,total}:{cart:{id:string}[],total:number}){
const items = cart.map(i=>VARIANT_MAP[i.id]?`${VARIANT_MAP[i.id]}:1`:null).filter(Boolean);
const cartParam = items.join(",");
const url = items.length>0
? `https://sequential-peptides.myshopify.com/cart/${cartParam}?storefront=true`
: `https://sequential-peptides.myshopify.com`;
return (
<a href={url} target="_blank" rel="noreferrer"
style={{width:"100%",padding:"16px",background:"#3be8b0",color:"#0e0e0e",borderRadius:1
<span> </span> Checkout via Shopify · ${total.toFixed(2)}
</a>
);
}
function CartPage({cart,go,onRemove,onCheckout,onAddToCart}){
const total=cart.reduce((s,i)=>s+parseFloat((i.selectedPrice||i.price).replace("$","")),0);
// Check if any vial product is in cart (not caps or solution)
const hasVial=cart.some(i=>!["reconst"].includes(i.id));
const bacInCart=cart.some(i=>i.id==="reconst");
const bacProduct=PRODUCTS.find(p=>p.id==="reconst");
const [bacAdded,setBacAdded]=useState(false);
function addBac(){
if(bacProduct&&onAddToCart){
onAddToCart(bacProduct,"30ml","$24.99");
setBacAdded(true);
}
}
return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
<div style={{maxWidth:640,margin:"0 auto",padding:"40px 20px 120px"}}>
<span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:C.muted,cursor:"pointer
<h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,5vw,2.4rem)",fontWeig
<p style={{fontSize:"0.85rem",color:C.muted,marginBottom:28}}>{cart.length} item{cart.l
{cart.length===0
?<div style={{textAlign:"center",padding:"60px 0"}}>
<div style={{fontSize:"3rem",marginBottom:16}}> </div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.1rem",margin
<p style={{color:C.muted,marginBottom:24,fontSize:"0.9rem"}}>Browse our research co
<PrimaryBtn onClick={()=>go("home")}>View All Compounds →</PrimaryBtn>
</div>
:<>
<div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
{cart.map((item,i)=>{
const isLight=item.color==="#ffd166"||item.color==="#3be8b0";
return <div key={i} style={{background:"#1c1c1c",borderRadius:14,padding:"16px
<div style={{width:52,height:52,borderRadius:10,background:item.color+"22",di
<div style={{flex:1,minWidth:0}}>
<div style={{fontWeight:600,fontSize:"0.88rem",marginBottom:3}}>{item.name}
<div style={{fontSize:"0.75rem",color:C.muted}}>{item.selectedSize||item.si
</div>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem"
<button onClick={()=>onRemove(i)} style={{background:"rgba(255,107,107,0.1)",
</div>;
})}
</div>
{/* BAC Water upsell */}
{hasVial&&!bacInCart&&!bacAdded&&<div style={{background:"linear-gradient(135deg,rg
<div style={{width:48,height:48,borderRadius:10,background:"rgba(59,232,176,0.12)
<div style={{flex:1,minWidth:0}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
<div style={{fontWeight:700,fontSize:"0.88rem",color:"#fff"}}>Reconstitution
<div style={{fontSize:"0.65rem",fontWeight:700,background:"rgba(59,232,176,0.
</div>
<div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.45)",lineHeight:1.5}}
</div>
<div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,fl
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",c
<button onClick={addBac} style={{background:"#3be8b0",color:"#0e0e0e",border:"n
</div>
</div>}
{/* Added confirmation */}
{bacAdded&&<div style={{background:"rgba(59,232,176,0.08)",borderRadius:12,padding:
</span><span>Reconstitution Solution added to cart</span>
<span> </div>}
{/* Total */}
<div style={{background:"#1c1c1c",borderRadius:14,padding:"18px 20px",border:"1px s
<div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSiz
<span style={{color:C.muted}}>Subtotal ({cart.length} item{cart.length!==1?"s":
<span>${total.toFixed(2)}</span>
</div>
<div style={{display:"flex",justifyContent:"space-between",fontSize:"0.85rem"}}>
<span style={{color:C.muted}}>Shipping</span>
<span style={{color:"#3be8b0"}}>Calculated at checkout</span>
</div>
</div>
<CheckoutLink cart={cart} total={total}/>
<p style={{textAlign:"center",fontSize:"0.72rem",color:C.muted}}> Secure checkout
</>
}
</div>
<SiteFooter go={go}/>
</div>;
}
// ── APP ─────────────────────────────────────────────
export default function App(){
const [pg,spg]=useState("home");
const [pid,spid]=useState(null);
const [user,su]=useState(()=>getSess());
const [chat,sc]=useState(false);
const [aged,sa]=useState(()=>{try{return localStorage.getItem("nxg_age")==="1";}catch{retur
const [cart,setCart]=useState([]);
const [catId,setCatId]=useState(null);
const [wishlist,setWishlist]=useState(()=>{try{return JSON.parse(localStorage.getItem("nxg_
const [recentlyViewed,setRecentlyViewed]=useState(()=>{try{return JSON.parse(localStorage.g
const [history,setHistory]=useState([{pg:"home",pid:null}]);
const [showTop,setShowTop]=useState(false);
// Scroll-to-top visibility
useEffect(()=>{
const onScroll=()=>setShowTop(window.scrollY>400);
window.addEventListener("scroll",onScroll);
return()=>window.removeEventListener("scroll",onScroll);
},[]);
const scrollPos = useRef(0);
function toggleWishlist(id){
setWishlist(prev=>{
const updated=prev.includes(id)?prev.filter(x=>x!==id):[...prev,id];
localStorage.setItem("nxg_wish",JSON.stringify(updated));
return updated;
});
}
function go(p,id=null){
// Save scroll position when leaving home page
if(pg==="home") scrollPos.current = window.scrollY;
if(p==="product"&&id){
setRecentlyViewed(prev=>{
const updated=[id,...prev.filter(x=>x!==id)].slice(0,6);
localStorage.setItem("nxg_recent",JSON.stringify(updated));
return updated;
});
}
setHistory(h=>[...h,{pg:p,pid:id}]);
spg(p); if(id){spid(id); if(p==="category")setCatId(id);}
setTimeout(()=>window.scrollTo(0,0),0);
}
function goBack(){
setHistory(h=>{
if(h.length<=1) return h;
const prev=h[h.length-2];
spg(prev.pg); spid(prev.pid);
// If returning to home, restore saved scroll position
if(prev.pg==="home"){
setTimeout(()=>window.scrollTo({top:scrollPos.current,behavior:"smooth"}),80);
} else {
window.scrollTo(0,0);
}
});
return h.slice(0,-1);
}
// Swipe right to go back
const touchStartX=useRef(0);
const touchStartY=useRef(0);
function onTouchStart(e){ touchStartX.current=e.touches[0].clientX; touchStartY.current=e.t
function onTouchEnd(e){
if(pg==="cart") return;
const dx=e.changedTouches[0].clientX-touchStartX.current;
const dy=Math.abs(e.changedTouches[0].clientY-touchStartY.current);
if(dx>80&&dy<40&&touchStartX.current<30&&history.length>1) goBack();
}
function confirmAge(){ localStorage.setItem("nxg_age","1"); sa(true); }
function addToCart(product,selectedSize,selectedPrice){
setCart(c=>[...c,{...product,selectedSize,selectedPrice}]);
}
function removeFromCart(idx){ setCart(c=>c.filter((_,i)=>i!==idx)); }
const prod=PRODUCTS.find(p=>p.id===pid);
const canGoBack=history.length>1;
return <div style={{fontFamily:"'DM Sans',sans-serif",background:"#0e0e0e",minHeight:"100vh
<style>{`
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:trans
.page-fade{animation:fadeIn 0.22s ease-out}
`}</style>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ops
{!aged && <AgeGate onConfirm={confirmAge}/>}
<Nav user={user} go={go} onLogout={()=>su(null)} cartCount={cart.length}/>
{pg==="home"&&<div key="home" className="page-fade"><Home go={go} recentlyViewed={recen
{pg==="product"&&prod&&<div key={"product-"+prod.id} className="page-fade"><ProductPage p
{pg==="checkout"&&prod&&<CheckoutPage product={prod} go={go} user={user}/>}
{pg==="cart"&&<CartPage cart={cart} go={go} onRemove={removeFromCart} onAddToCart={(prod,
if(cart.length===0) return;
const handle = ({
glp3r:"glp-3-r",glp2t:"glp-2-t",glp1:"glp-1",bpc157:"bpc-157",tb500:"tb-500",
cjc1295:"cjc-1295",cjcipa:"cjc-1295-ipamorelin-blend",ipamorlin:"ipamorelin",
tesamorlin:"tesamorlin",igf1lr3:"igf-1-lr3",ghkcu:"ghk-cu",glow:"glow-complex",
nad:"nad",motsc:"mots-c",glutathione:"glutathione",ss31:"ss-31",
selank:"selank",semax:"semax",dsip:"dsip",mt2:"mt2",reconst:"reconstitution-solution"
} as Record<string,string>)[cart[0]?.id] || cart[0]?.id;
const url = `https://sequential-peptides.myshopify.com/products/${handle}`;
alert("Opening Shopify: " + url);
}}/>}
{pg==="register"&&<Register go={go} onLogin={su}/>}
{pg==="login"&&<Login go={go} onLogin={su}/>}
{pg==="contact"&&<ContactPage go={go}/>}
{pg==="terms"&&<TermsPage go={go}/>}
{pg==="refund"&&<RefundPage go={go}/>}
{pg==="privacy"&&<PrivacyPage go={go}/>}
{pg==="coa"&&<CoaLibraryPage go={go}/>}
{pg==="research"&&<div key="research" className="page-fade"><ResearchLibraryPage go={go}/
{pg==="category"&&catId&&<div key={"cat-"+catId} className="page-fade"><CategoryPage catI
{pg==="dashboard"&&(user?<Dashboard user={user} go={go} onLogout={()=>su(null)} wishlistI
{chat&&<ChatBot onClose={()=>sc(false)}/>}
<ChatButton onClick={()=>sc(p=>!p)} open={chat}/>
{/* ── SCROLL TO TOP + BACK BUTTONS ── */}
<div style={{position:"fixed",bottom:24,left:16,display:"flex",flexDirection:"column",gap
{canGoBack&&<button onClick={goBack}
style={{width:40,height:40,borderRadius:"50%",background:"rgba(20,20,20,0.92)",border
onMouseEnter={e=>e.currentTarget.style.background="rgba(59,232,176,0.2)"}
onMouseLeave={e=>e.currentTarget.style.background="rgba(30,30,30,0.95)"}>←</button>}
{showTop&&<button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
style={{width:40,height:40,borderRadius:"50%",background:"rgba(20,20,20,0.92)",border
onMouseEnter={e=>e.currentTarget.style.background="rgba(59,232,176,0.2)"}
onMouseLeave={e=>e.currentTarget.style.background="rgba(30,30,30,0.95)"}>↑</button>}
<button onClick={()=>{const footer=document.querySelector("footer");if(footer)footer.sc
style={{width:40,height:40,borderRadius:"50%",background:"rgba(20,20,20,0.92)",border
onMouseEnter={e=>e.currentTarget.style.background="rgba(59,232,176,0.2)"}
onMouseLeave={e=>e.currentTarget.style.background="rgba(20,20,20,0.92)"}>↓</button>
</div>
</div>;
}
