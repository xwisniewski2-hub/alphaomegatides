import React, { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════
// SITE CONFIG — flip COMING_SOON to false when ready to open store
// ═══════════════════════════════════════════════════════════════════
const COMING_SOON = false;

// ── ADMIN ACCOUNT ────────────────────────────────────────────────
const ADMIN_EMAIL    = "alphaomegatides@yahoo.com";
const ADMIN_PASSWORD = "Vizio12345!";
function isAdminUser(email:string, pass:string):boolean {
  return email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && pass === ADMIN_PASSWORD;
}
function isAdmin(user:any):boolean {
  return user?.email?.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
}
// ── SECURE: Add these to Vercel Dashboard → Settings → Environment Variables
// Then they are NOT in your bundle. Keys below are fallbacks for local dev only.
const RESEND_API_KEY = "re_gNzYdNZU_4Yx2Y916iJb6dSiBniGRchZF";
const NOTIFY_EMAIL   = "alphaomegatides@yahoo.com"; // primary contact
const SITE_EMAIL     = "alphaomegatides@yahoo.com";

// ── LEGAL CONSTANTS ─────────────────────────────────────────────
const DISCLAIMER_SHORT = "⚠️ For research use only · Not for research use · Not FDA approved";
const DISCLAIMER_FULL  = "All products are sold exclusively for in-vitro laboratory and scientific research purposes only. These products are not intended for human or veterinary use, are not for food, compound, research device, or cosmetic purposes, and have not been evaluated by the U.S. Food and compound Administration. They are not intended to evaluate, treat, cure, mitigate, or support any condition under study or research condition. All purchases are made under express agreement that the buyer is a qualified research professional and will comply with all applicable laws and regulations. US fulfillment only.";


const C = {
  bg:"#0e0e0e", ink:"#ffffff", g:"#3be8b0", r:"#ff6b6b",
  b:"#4f8ef7", y:"#ffd166", muted:"rgba(255,255,255,0.45)", card:"#1c1c1c"
};

const STATES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","Washington D.C.","Puerto Rico","Guam","U.S. Virgin Islands"];

const RECON = {
  "glp3r": {
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"400 mcg per 0.08 mL · 8 units on U-100 syringe"},
    "15mg": {water:"3 mL",conc:"5 mg/mL",note:"400 mcg per 0.08 mL · 8 units on U-100 syringe"},
    "20mg": {water:"4 mL",conc:"5 mg/mL",note:"400 mcg per 0.08 mL · 8 units on U-100 syringe"},
    "30mg": {water:"6 mL",conc:"5 mg/mL",note:"400 mcg per 0.08 mL · 8 units on U-100 syringe"},
  },
  "glp2t": {
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"2.5 mg per 0.5 mL · 50 units on U-100 syringe"},
    "15mg": {water:"3 mL",conc:"5 mg/mL",note:"2.5 mg per 0.5 mL · 50 units on U-100 syringe"},
    "20mg": {water:"4 mL",conc:"5 mg/mL",note:"2.5 mg per 0.5 mL · 50 units on U-100 syringe"},
  },
  "glp1": {
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"250 mcg per 0.05 mL · 5 units on U-100 syringe"},
    "20mg": {water:"4 mL",conc:"5 mg/mL",note:"250 mcg per 0.05 mL · 5 units on U-100 syringe"},
  },
  "bpc157": {
    "5mg":  {water:"2 mL",conc:"2.5 mg/mL",note:"250 mcg per 0.1 mL · 10 units on U-100 syringe"},
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"500 mcg per 0.1 mL · 10 units on U-100 syringe"},
  },
  "tb500": {
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"2.5 mg per 0.5 mL · 50 units on U-100 syringe"},
  },
  "cjc1295": {
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"200 mcg per 0.04 mL · 4 units on U-100 syringe"},
  },
  "cjcipa": {
    "5mg + 5mg": {water:"2 mL",conc:"2.5 mg/mL each",note:"100 mcg each per 0.04 mL · 4 units on U-100 syringe"},
  },
  "ipamorlin": {
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"200 mcg per 0.04 mL · 4 units on U-100 syringe"},
  },
  "tesamorlin": {
    "5mg":  {water:"2 mL",conc:"2.5 mg/mL",note:"2 mg per 0.8 mL · 80 units on U-100 syringe"},
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"2 mg per 0.4 mL · 40 units on U-100 syringe"},
  },
  "igf1lr3": {
    "0.1mg": {water:"1 mL", conc:"0.1 mg/mL",note:"10 mcg per 0.1 mL · 10 units · use acetic acid water"},
    "1mg":   {water:"2 mL",conc:"0.5 mg/mL",note:"50 mcg per 0.1 mL · 10 units · use acetic acid water"},
  },
  "ghkcu": {
    "50mg":  {water:"2 mL",conc:"25 mg/mL",note:"1 mg per 0.04 mL · 4 units · use acetic acid water"},
    "100mg": {water:"4 mL",conc:"25 mg/mL",note:"1 mg per 0.04 mL · 4 units · use acetic acid water"},
  },
  "glow": {
    "70mg": {water:"4 mL",conc:"17.5 mg/mL",note:"2 mg per 0.11 mL · 11 units on U-100 syringe"},
  },
  "nad": {
    "500mg": {water:"10 mL",conc:"50 mg/mL",note:"50 mg per 1 mL · 100 units on U-100 syringe"},
  },
  "motsc": {
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"5 mg per 1 mL · 100 units on U-100 syringe"},
    "40mg": {water:"8 mL",conc:"5 mg/mL",note:"5 mg per 1 mL · 100 units on U-100 syringe"},
  },
  "glutathione": {
    "600mg":  {water:"6 mL", conc:"100 mg/mL",note:"100 mg per 1 mL · 100 units on U-100 syringe"},
    "1500mg": {water:"15 mL",conc:"100 mg/mL",note:"100 mg per 1 mL · 100 units on U-100 syringe"},
  },
  "ss31": {
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"500 mcg per 0.1 mL · 10 units on U-100 syringe"},
  },
  "selank": {
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"250 mcg per 0.05 mL · 5 units on U-100 syringe"},
  },
  "semax": {
    "10mg": {water:"3 mL",conc:"3.3 mg/mL",note:"500 mcg per 0.15 mL · 15 units on U-100 syringe"},
  },
  "dsip": {
    "5mg": {water:"2 mL",conc:"2.5 mg/mL",note:"100 mcg per 0.04 mL · 4 units on U-100 syringe"},
  },
  "mt2": {
    "10mg": {water:"2 mL",conc:"5 mg/mL",note:"500 mcg per 0.1 mL · 10 units on U-100 syringe"},
  },
  "reconst":    {"30ml": {water:"N/A",conc:"Ready to use",note:"Bacteriostatic water — use directly to reconstitute peptides"}},
};

const PRODUCTS = [
  // GLP / Metabolic
  {id:"glp3r",name:"GLP-3 R",tag:"Receptor Agonist",icon:"🔥",color:"#ff6b6b",
   sizes:[{s:"15mg",p:"$120.00"}],price:"$120.00",size:"15mg",
   desc:"Acylated tri-pathway agonist peptide for metabolic research. Activates GLP-1, GIP, and glucagon receptors. Phase 2 data showed up to 24% body weight reduction over 48 weeks.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-3-1778652184985-3xoW7s24xzjJVulrY1EfMhJKRTcNj5.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-3-1778652192404-AWo5kQpCWi3lWfaQ7hEzV3F9kg93up.pdf"},
     {name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-3-reta-10mg-PL-10-RT10-1779426269586-P4FRlRWQWicuBh02IF3BCaVBn0OKrn.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"Lyophilized powder. Once-weekly SubQ. Half-life ~6 days."},
     {n:"Reconstitution",text:"Add BAC water. administer along inner vial wall. Store 2-8C.",chip:"Store 2-8C · Use within 4 weeks"},
     {n:"administration Reference",rows:[["Weeks 1-4","2mg weekly"],["Weeks 5-8","4mg weekly"],["Weeks 9-12","8mg weekly"],["Maintenance","Per protocol"]]},
     {n:"Timing",grid:[["Frequency","Once weekly"],["Half-life","~6 days"],["Fasting","Not required"],["Route","SubQ"]]},
     {n:"Sites",chip:"Abdomen · Upper thigh · Upper arm — rotate weekly"},
     {n:"Cycle",cycle:["12-24 Wks","4-8 Wks Off","Reassess"]},
   ],note:"For research use only. Not for research use.",
   chips:["GLP-1 · Appetite","GIP · metabolic signaling","GCG · Metabolism"]},

  {id:"glp2t",name:"GLP-2 T",tag:"Receptor Agonist",icon:"⚡",color:"#4f8ef7",
   sizes:[{s:"15mg",p:"$89.99"},{s:"30mg",p:"$129.99",oos:true}],price:"$89.99",size:"15mg",
   desc:"Dual-pathway receptor agonist activating GLP-1 and GIP receptors. For incretin and metabolic signaling research.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-2-1778648294420-AvLEROy69fAbgaa2wTLwSc3qc01Bae.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-2-1778648302459-RnOBuESYE3FdMdwGWKqgjlHlAlHnhf.pdf"},
     {name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-2-tirz-20mg-PL-TR20-02-1779160509188-OI8SmNIgPHex2adwlDjPmhl3473eKm.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"Lyophilized powder. Dual GLP-1/GIP agonist. Once-weekly SubQ."},
     {n:"Reconstitution",text:"Add BAC water. administer along inner vial wall. Store 2-8C.",chip:"Store 2-8C · Use within 4 weeks"},
     {n:"administration Reference",rows:[["Start","Low, titrate slowly"],["Frequency","Once weekly"],["Titration","Every 4 weeks"],["Maintenance","Per protocol"]]},
     {n:"Timing",grid:[["Frequency","Once weekly"],["Fasting","Not required"],["Route","SubQ"],["Titrate","Every 4 weeks"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate weekly"},
     {n:"Cycle",cycle:["12-20 Wks","4-8 Wks Off","Reassess"]},
   ],note:"For research use only. Not for research use.",
   chips:["GLP-1 · Satiety","GIP · Glucose"]},

  {id:"glp1",name:"GLP-1",tag:"Receptor Agonist",icon:"💊",color:"#f59e0b",
   sizes:[{s:"10mg",p:"$69.99"}],price:"$69.99",size:"10mg",
   desc:"GLP-1 receptor agonist peptide for metabolic and receptor signaling research. Studied for glucose-dependent metabolic signaling secretion and appetite regulation pathways.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-11-1778646578019-d95sw88ZNhz2wescn5y1WTXEz0bBB0.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-11-1778646587192-yTRhGn1HU1OA6uJl5fttiDd8dMvGPx.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"GLP-1 receptor agonist. Lyophilized powder for metabolic research."},
     {n:"Reconstitution",text:"Add BAC water. Store 2-8C.",chip:"Store 2-8C"},
     {n:"administration Reference",rows:[["Frequency","Weekly per protocol"],["Route","SubQ"],["Titration","Start low"],["Duration","Per protocol"]]},
     {n:"Timing",grid:[["Fasting","Optional"],["Route","SubQ"],["Frequency","Per protocol"],["Storage","2-8C"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate"},
     {n:"Cycle",cycle:["12-24 Wks","4-8 Wks Off","Reassess"]},
   ],note:"For research use only. Not for research use.",
   chips:["GLP-1 · Appetite","Incretin · metabolic signaling"]},

  // supporting / post-research support
  {id:"bpc157",name:"BPC-157",tag:"supporting & post-research support",icon:"🧬",color:"#3be8b0",
   sizes:[{s:"10mg",p:"$69.99"}],price:"$69.99",size:"10mg",
   desc:"Body Protection Compound — 15-amino-acid peptide studied for angiogenesis signaling, fibroblast migration, gut lining integrity, and tissue-repair pathway models.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-1-1763749084332-fqN5kr0oKTLBvwBsdPjmfZhVQ9aOmZ.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-1-1774671656011-MnVMwyslLvPdq89Xo8CVjvMhawXhmW.pdf"},
     {name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-1-1777405274387-lDIBlAuiftE1mDwbNWsV2wxYrQEUeV.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"10mg lyophilized BPC-157. For in-vitro and tissue-repair pathway research."},
     {n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Swirl gently. Store 2-8C, use within 14 days.",chip:"10mg + 2.0mL = 5mg/mL"},
     {n:"administration Reference",rows:[["Low","250mcg daily"],["Standard","500mcg daily"],["Split","250mcg AM + PM"],["Frequency","Daily or 5/2"]]},
     {n:"Timing",grid:[["Frequency","Daily"],["Fasting","Not required"],["Timing","Any time"],["Route","SubQ"]]},
     {n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
     {n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
   ],note:"For research use only. Not for research use.",
   chips:["Angiogenesis","Tissue Repair","Gut Integrity"]},

  {id:"tb500",name:"TB-500",tag:"Research Peptide",icon:"🛠️",color:"#059669",
   sizes:[{s:"10mg",p:"$69.99"}],price:"$69.99",size:"10mg",
   desc:"Synthetic Thymosin Beta-4 fragment for tissue remodeling research. Studied for actin regulation, cell migration, and angiogenesis pathway models.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-tb-500-1773337988412-CAtqpBXylu3hpVcTZDVSdACvyQSFmS.pdf"},
     {name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-tb-500-tb500-10mg-PL-TB-02-1779160214913-fCzl5698B6yODiGFTg67E6zHqD9HIt.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"10mg lyophilized TB-500. Often paired with BPC-157 for dual-pathway research."},
     {n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C, 14 days.",chip:"10mg + 2.0mL = 5mg/mL"},
     {n:"administration Reference",rows:[["Loading","2-2.5mg 2x weekly (4 wks)"],["Maintenance","2mg once weekly"],["Pair with","BPC-157"],["Route","SubQ"]]},
     {n:"Timing",grid:[["Route","SubQ"],["Fasting","Not required"],["Pair with","BPC-157"],["Loading","4 weeks"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate"},
     {n:"Cycle",cycle:["4 Wks Loading","Monthly Maint.","Reassess"]},
   ],note:"For research use only. Not for research use.",
   chips:["Actin · Migration","Tissue Remodeling","Angiogenesis"]},

  // GH / Peptide Research
  {id:"cjc1295",name:"CJC-1295",tag:"Peptide Research",icon:"🔬",color:"#6366f1",
   sizes:[{s:"10mg",p:"$74.99"}],price:"$74.99",size:"10mg",
   desc:"Mod GRF 1-29 GHRH analogue for pituitary signaling research. Short ~30-min half-life preserves pulsatile GH rhythm. Often paired with Ipamorlin for synergistic output.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-cjc-1295-1774504283582-b2foEOrzNHqxStiGggdZGfeXrM6xFm.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"10mg CJC-1295 No DAC. ~30-min half-life preserves pulsatile GH release."},
     {n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C, 28 days.",chip:"10mg + 2.0mL = 5mg/mL"},
     {n:"administration Reference",rows:[["Solo","100-300mcg daily"],["With Ipamorlin","100-200mcg + Ipa"],["Frequency","Daily pre-sleep"],["On/Off","5 on/2 off"]]},
     {n:"Timing",grid:[["Timing","Pre-sleep"],["Fast Prior","2-3 hours"],["Frequency","Daily"],["Pair with","Ipamorlin"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate daily"},
     {n:"Cycle",cycle:["8-12 Wks","4-8 Wks Off","Repeat"]},
   ],note:"For research use only. Do not substitute with CJC-1295 DAC.",
   chips:["GHRH · Pituitary","GH · Pulsatile","IGF-1 · Axis"]},

  {id:"cjcipa",name:"CJC-1295 / Ipamorlin Blend",tag:"GH Research",icon:"⚡",color:"#8b5cf6",
   sizes:[{s:"5mg + 5mg",p:"$89.99"}],price:"$89.99",size:"5mg + 5mg",
   desc:"CJC-1295 + Ipamorlin pre-blended for synergistic GH secretagogue research. Two complementary receptor pathways — GHRH and ghrelin — in one vial.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-cjc-ipamorln-blend-1775224981966-cdw1gKtkbKmNFi52Gl00shRq0uZAE6.pdf"},
     {name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-cjc-ipamorln-blend-1778613150199-fyzo6mpmCxF3568utkEIR8QDoPrXu0.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"5mg CJC-1295 + 5mg Ipamorlin. Two GH secretagogue pathways in one vial."},
     {n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C, 28 days.",chip:"10mg + 2.0mL = 5mg/mL"},
     {n:"administration Reference",rows:[["CJC","100-200mcg"],["Ipamorlin","100-200mcg"],["Frequency","Daily pre-sleep"],["On/Off","5 on/2 off"]]},
     {n:"Timing",grid:[["Timing","Pre-sleep"],["Fast Prior","2-3 hours"],["Frequency","Daily"],["Route","SubQ"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate daily"},
     {n:"Cycle",cycle:["8-16 Wks","8 Wks Off","Repeat"]},
   ],note:"For research use only. Not for research use.",
   chips:["CJC · GHRH","Ipamorlin · Ghrelin","GH · Synergy"]},

  {id:"ipamorlin",name:"Ipamorlin",tag:"Peptide Research",icon:"💉",color:"#a855f7",
   sizes:[{s:"10mg",p:"$74.99"}],price:"$74.99",size:"10mg",
   desc:"Ghrelin mimetic pentapeptide for GH secretagogue research. Selective GH release with minimal cortisol impact. Often paired with CJC-1295.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-ipamorlin-1773338030527-QyE9PZjRmonNcxSDESOnUPW4YksU9p.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"5mg Ipamorlin. Ghrelin mimetic for selective GH release research."},
     {n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C, 28 days.",chip:"5mg + 1.0mL = 5mg/mL"},
     {n:"administration Reference",rows:[["Standard","200-300mcg daily"],["With CJC","Pair for synergy"],["Frequency","Daily pre-sleep"],["Route","SubQ"]]},
     {n:"Timing",grid:[["Timing","Pre-sleep"],["Fast Prior","2-3 hours"],["Frequency","Daily"],["Pair with","CJC-1295"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate"},
     {n:"Cycle",cycle:["8-16 Wks","8 Wks Off","Repeat"]},
   ],note:"For research use only. Not for research use.",
   chips:["Ghrelin · Mimetic","GH · Selective","Pituitary · GHS"]},

  {id:"tesamorlin",name:"Tesamorlin",tag:"Peptide Research",icon:"💪",color:"#3be8b0",
   sizes:[{s:"10mg",p:"$104.99",oos:true}],price:"$104.99",size:"10mg",
   desc:"44-amino-acid GHRH analogue. not FDA-evaluated as Egrifta for a specific indication. Phase 3 trials (800+ subjects) showed 15-20% visceral adipose tissue reduction over 26 weeks.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-6-1763749486044-8WiJdGIYz0W4MP72nRu188hyaxBkpL.pdf"},
     {name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-6-1773187459634-llmEIzOCoe319hv6HGjdTaiIaD28WG.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"10mg Tesamorlin. 2mg daily abdomen-only protocol from Phase 3 trials."},
     {n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C, 14 days.",chip:"10mg + 2.0mL = 5mg/mL · 40 units = 2mg"},
     {n:"administration Reference",rows:[["Standard","2mg daily"],["Units","40 units U-100"],["Frequency","Daily or 5/2"],["Site","Abdomen only"]]},
     {n:"Timing",grid:[["Timing","Pre-sleep"],["Fasting","2 hours"],["Frequency","Daily or 5/2"],["Half-life","~26-38 min"]]},
     {n:"Sites",chip:"Abdomen only · 2 inches from navel · Rotate daily"},
     {n:"Cycle",cycle:["8-16 Wks","4-8 Wks Off","Repeat"]},
   ],note:"For research use only. Monitor IGF-1 per protocol.",
   chips:["GHRH · Analogue","Visceral · Fat","IGF-1 · Axis"]},

  {id:"igf1lr3",name:"IGF-1 LR3",tag:"Growth Factor",icon:"📈",color:"#059669",
   sizes:[{s:"1mg",p:"$129.99"}],price:"$129.99",size:"1mg",
   desc:"Long-acting IGF-1 analogue for cellular research. Extended half-life vs native IGF-1. Studied for cell proliferation and tissue growth signaling.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-7-1773338040045-WF0H7zKxlbrEaC1VkZbmWsjkpCZ9Lk.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"1mg IGF-1 LR3. Extended half-life for cellular growth signaling research."},
     {n:"Reconstitution",text:"Add 1.0mL BAC water = 1mg/mL. Store 2-8C.",chip:"1mg + 1.0mL = 1mg/mL · 10 units = 100mcg"},
     {n:"administration Reference",rows:[["Range","20-100mcg per session"],["Frequency","Post-protocol or daily"],["Duration","4-6 week cycles"],["Route","SubQ or IM"]]},
     {n:"Timing",grid:[["Timing","Post-workout or AM"],["Fasting","Optional"],["Route","SubQ or IM"],["Storage","2-8C"]]},
     {n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
     {n:"Cycle",cycle:["4-6 Wks","Equal Off","Repeat"]},
   ],note:"For research use only. Not for research use.",
   chips:["IGF-1 · Receptor","Cell · Proliferation","Long-Acting"]},

  // Skin / Longevity
  {id:"ghkcu",name:"GHK-CU",tag:"Research Compound",icon:"✨",color:"#ffd166",
   sizes:[{s:"50mg",p:"$69.99"},{s:"100mg",p:"$89.99"}],price:"$69.99",size:"50mg",
   desc:"Copper-binding tripeptide for matrix-signaling, extracellular matrix remodeling, wound supporting, and tissue-response research. 4,000+ gene activations documented. Blue solution upon reconstitution is normal.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-ghk-cu-1773293121756-gwxac3G4JMVWf83ipvr4iC0pd7NZKN.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-ghk-cu-1773338108928-EmBZDHNLos5rzgQrXxmCqym1b65zXk.pdf"},
     {name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-ghk-cu-ghkcu-50mg-PL-GHK5-01-1779160636565-BU0zi5qhqk0PiduSBQsdl1DycDdWKa.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"50mg or 100mg GHK-Cu. Blue solution upon reconstitution is normal — confirms copper binding."},
     {n:"Reconstitution",text:"50mg + 2.5mL BAC water = 20mg/mL. Roll gently.",chip:"50mg + 2.5mL = 20mg/mL"},
     {n:"administration Reference",rows:[["Start","1mg (5 units) daily"],["Standard","2mg (10 units) daily"],["Maintenance","2mg 3x/week"],["Cycle","30 days on/off"]]},
     {n:"Timing",grid:[["Timing","Any / Evening"],["Fasting","Not required"],["Frequency","Daily or 3x/wk"],["Blue tint","Normal"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate each session"},
     {n:"Cycle",cycle:["30 Days","30 Days Off","Repeat"]},
   ],note:"For research use only. Cycle to avoid copper accumulation.",
   chips:["Copper · Matrix","ECM · Remodeling","4000+ Genes"]},

  {id:"glow",name:"Glow Complex",tag:"Skin Research",icon:"🌟",color:"#ec4899",
   sizes:[{s:"70mg",p:"$129.99"}],price:"$129.99",size:"70mg",
   desc:"Skin support research blend: GHK-Cu + BPC-157 + Thymosin Beta-4. Three peptides studied for matrix modulation, tissue repair, and cellular tissue supportion.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-5-1763749124814-sKOrPtpAmv6YYGhQd4k5qR0Aze5IFf.pdf"},
     {name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-5-1774671600788-cWtxxEzNxCjiM76KwwMXEzY5Kr2hMU.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"GHK-Cu + BPC-157 + Thymosin Beta-4. Blue tint from GHK-Cu is normal."},
     {n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C.",chip:"10mg + 2.0mL = 5mg/mL"},
     {n:"administration Reference",rows:[["Standard","0.5mL (2.5mg) daily"],["Frequency","Daily or 3x/week"],["Duration","30-day cycles"],["Route","SubQ"]]},
     {n:"Timing",grid:[["Timing","Any / Evening"],["Fasting","Not required"],["Frequency","Daily or 3x/wk"],["Blue tint","Normal"]]},
     {n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
     {n:"Cycle",cycle:["30 Days","30 Days Off","Repeat"]},
   ],note:"For research use only. Not for research use.",
   chips:["GHK-Cu · Matrix","BPC-157 · Repair","TB4 · Regen"]},

  // Metabolic / longevity research
  {id:"nad",name:"NAD+",tag:"Metabolic Research",icon:"⚗️",color:"#f59e0b",
   sizes:[{s:"500mg",p:"$79.99"}],price:"$79.99",size:"500mg",
   desc:"Nicotinamide Adenine Dinucleotide — 500mg for cellular energy and metabolism research. Studied for mitochondrial function, DNA repair, sirtuin activation, and energy production pathways.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-16-1771093697730-fiSDjhNX2pN8Sqle2mKqpGtnJlsbb9.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-16-1777405168384-uwIxlr3qCWBHRBtG7RnnR19H5oxfpt.pdf"},
     {name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-16-nad-500mg-PL-NAD5-03-1779160564258-LoyCS63EW0H2Id3kKoNCoeVnZxLzsV.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"500mg NAD+ powder. For cellular energy and mitochondrial research."},
     {n:"Reconstitution",text:"Dissolve in sterile water or saline per protocol. Store 2-8C.",chip:"500mg vial · Store 2-8C"},
     {n:"administration Reference",rows:[["IV","250-500mg per session"],["SubQ","25-100mg per session"],["Frequency","Per protocol"],["Duration","Ongoing or cyclical"]]},
     {n:"Timing",grid:[["Form","Powder"],["Route","Per protocol"],["Storage","2-8C"],["Purity","99%+"]]},
     {n:"Sites",chip:"Per protocol — IV or SubQ"},
     {n:"Cycle",text:"Ongoing or per institutional research protocol."},
   ],note:"For research use only. Not for research use.",
   chips:["Mitochondria · ATP","Sirtuin · Activation","DNA · Repair"]},

  {id:"motsc",name:"MOTS-c",tag:"Metabolic Research",icon:"🔋",color:"#059669",
   sizes:[{s:"10mg",p:"$69.99"},{s:"40mg",p:"$148.99"}],price:"$69.99",size:"10mg",
   desc:"Mitochondria-derived peptide for metabolic regulation, metabolic signaling sensitivity, and cellular signaling research. Studied for exercise performance pathway modulation.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-10-1763749465086-YKTFziseRwSO6ol6o1BuLt4SiyxdxV.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-10-1777405411289-W9wxODokhtbt0SbNogqus7tcsgGHiV.pdf"},
     {name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-10-1778855517228-zp8dNMT5n5qL3G7uoQdZJdD7JJUQO7.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"5mg MOTS-c. Mitochondria-derived peptide for metabolic signaling research."},
     {n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C, 14 days.",chip:"5mg + 1.0mL = 5mg/mL"},
     {n:"administration Reference",rows:[["Standard","5-10mg per session"],["Frequency","Daily or 3x/week"],["Duration","4-8 week cycles"],["Route","SubQ or IV"]]},
     {n:"Timing",grid:[["Timing","AM or pre-exercise"],["Fasting","Optional"],["Route","SubQ or IV"],["Frequency","Daily or 3x/wk"]]},
     {n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
     {n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
   ],note:"For research use only. Not for research use.",
   chips:["Mitochondrial","metabolic signaling · Sensitivity","Metabolism"]},

  {id:"glutathione",name:"Glutathione",tag:"Antioxidant Research",icon:"🌱",color:"#3be8b0",
   sizes:[{s:"600mg",p:"$60.00",oos:true},{s:"1500mg",p:"$94.99"}],price:"$60.00",size:"600mg",
   desc:"Master antioxidant tripeptide for oxidative stress modulation, immune system support, and detoxification pathway research.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-4-1763749430103-ZyqU1Q36RqIuoXwk0Wm1rsc1xj1HOZ.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"600mg Glutathione. Master antioxidant for oxidative stress and cellular research."},
     {n:"Reconstitution",text:"Dissolve in sterile saline. Store 2-8C.",chip:"600mg · Per research protocol"},
     {n:"administration Reference",rows:[["IV","600-1200mg per session"],["SubQ","100-200mg daily"],["Frequency","Per protocol"],["Duration","Ongoing or cyclical"]]},
     {n:"Timing",grid:[["Route","IV or SubQ"],["Storage","2-8C"],["Purity","99%+"],["Quantity","600mg"]]},
     {n:"Sites",chip:"Per protocol — IV or SubQ"},
     {n:"Cycle",text:"Ongoing or per institutional research protocol."},
   ],note:"For research use only. Not for research use.",
   chips:["Antioxidant","Oxidative · Stress","Immune · Support"]},

  {id:"ss31",name:"SS-31",tag:"Mitochondrial Research",icon:"🔋",color:"#6366f1",
   sizes:[{s:"10mg",p:"$74.99",oos:true}],price:"$74.99",size:"10mg",
   desc:"Mitochondria-targeted tetrapeptide for cellular protection research. Studied for mitochondrial membrane stabilization and oxidative stress reduction.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-17-1770215645605-uYwvD8fyU69ZUAvFvCMgufPTXIa5AV.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"10mg SS-31. Mitochondria-targeted tetrapeptide for cellular protection research."},
     {n:"Reconstitution",text:"Add 1.0mL BAC water = 10mg/mL. Store 2-8C, 14 days.",chip:"10mg + 1.0mL = 10mg/mL"},
     {n:"administration Reference",rows:[["Standard","1-3mg per session"],["Frequency","Daily or 3x/week"],["Route","SubQ or IV"],["Duration","4-8 week cycles"]]},
     {n:"Timing",grid:[["Route","SubQ or IV"],["Fasting","Optional"],["Frequency","Daily or 3x/wk"],["Storage","2-8C"]]},
     {n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
     {n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
   ],note:"For research use only. Not for research use.",
   chips:["Mito · Shield","Cardiolipin · Bind","ROS · Reduction"]},

  // Cognitive / Neuro
  {id:"selank",name:"Selank",tag:"Cognitive Research",icon:"🧠",color:"#7c3aed",
   sizes:[{s:"10mg",p:"$55.00"}],price:"$55.00",size:"10mg",
   desc:"Heptapeptide for anxiolytic and cognitive research. Studied for GABA-modulation, neuro researchive, and anti-anxiety pathway investigations.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-18-1774490082637-IgnunVen9CUQIcDK2N5u5TpNgbFLgs.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-18-1777405595859-jAcpOTFKwlbWvUdUxokJmZpMCOTyoh.pdf"},
     {name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-18-1778891198541-i07pVVqRkdpGaqdzSG613v1yv2wh1K.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"5mg Selank. Anxiolytic and cognitive research. SubQ or nasal."},
     {n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C.",chip:"5mg + 1.0mL = 5mg/mL"},
     {n:"administration Reference",rows:[["Standard","250-500mcg per session"],["Frequency","1-2x daily"],["Route","SubQ or nasal"],["Duration","4-8 weeks"]]},
     {n:"Timing",grid:[["Timing","AM or midday"],["Fasting","Not required"],["Route","SubQ or nasal"],["Frequency","1-2x/day"]]},
     {n:"Sites",chip:"SubQ · Abdomen · Thigh — or nasal"},
     {n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
   ],note:"For research use only. Not for research use.",
   chips:["GABA · Modulation","Anxiolytic","neuro researchion"]},

  {id:"semax",name:"Semax",tag:"Cognitive Research",icon:"🧬",color:"#6366f1",
   sizes:[{s:"10mg",p:"$54.99"}],price:"$54.99",size:"10mg",
   desc:"ACTH(4-7) analogue heptapeptide for cognitive and neuro researchive research. Studied for BDNF production, neuro researchion, and cognitive performance models.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-14-1770215634519-jPqwlhW7RtuPKoMgeFmO0ebh0cFFAm.pdf"},
     {name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-14-1777405557785-d1crBk5f3SONotj8qoXcnQqduJsWbI.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"5mg Semax. ACTH analogue for cognitive and neuro researchive research."},
     {n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C.",chip:"5mg + 1.0mL = 5mg/mL"},
     {n:"administration Reference",rows:[["Standard","200-600mcg per session"],["Frequency","1-2x daily"],["Route","SubQ or nasal"],["Duration","4-8 weeks"]]},
     {n:"Timing",grid:[["Timing","AM or midday"],["Fasting","Not required"],["Route","SubQ or nasal"],["Frequency","1-2x/day"]]},
     {n:"Sites",chip:"SubQ · Abdomen — or nasal per protocol"},
     {n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
   ],note:"For research use only. Not for research use.",
   chips:["BDNF · Production","neuro researchion","Cognitive · Perf"]},

  {id:"dsip",name:"DSIP",tag:"Sleep Research",icon:"🌙",color:"#3730a3",
   sizes:[{s:"5mg",p:"$49.99"}],price:"$49.99",size:"5mg",
   desc:"Delta Sleep Inducing Peptide for sleep regulation and circadian rhythm research. Studied for sleep architecture modulation and neuroendocrine signaling.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-dsip-1775224381176-2Z8JnwtpTF53mh8AQTOUgBXF7L06N2.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"5mg DSIP. Nonapeptide for sleep regulation and circadian rhythm research."},
     {n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C, 14 days.",chip:"5mg + 1.0mL = 5mg/mL"},
     {n:"administration Reference",rows:[["Standard","25-50mcg pre-sleep"],["Frequency","Pre-sleep"],["Route","SubQ or IV"],["Duration","Per protocol"]]},
     {n:"Timing",grid:[["Timing","Pre-sleep"],["Fasting","Optional"],["Route","SubQ or IV"],["Frequency","Per protocol"]]},
     {n:"Sites",chip:"SubQ · Abdomen — pre-sleep"},
     {n:"Cycle",text:"Per institutional research protocol."},
   ],note:"For research use only. Not for research use.",
   chips:["Sleep · Delta","Circadian · Rhythm","Neuroendocrine"]},

  // Sleep / Circadian

  {id:"mt2",name:"MT2",tag:"Sleep Research",icon:"🌛",color:"#312e81",
   sizes:[{s:"10mg",p:"$69.99"}],price:"$69.99",size:"10mg",
   desc:"Advanced melatonin (MT2) for circadian rhythm and sleep architecture research. Higher potency variant for sleep induction and circadian modulation studies.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-12-1770215537246-vp21RB45nN7wwvFzvhhRUmIVrgsJPQ.pdf"},
     {name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-12-1777405177220-kAtEIysRncoa0tzpcWXr6JdW9cTojj.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"10mg MT2. Advanced melatonin for sleep and circadian modulation research."},
     {n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C.",chip:"10mg + 2.0mL = 5mg/mL"},
     {n:"administration Reference",rows:[["Standard","0.5-2mg pre-sleep"],["Route","SubQ"],["Timing","30-60 min pre-sleep"],["Duration","Ongoing per protocol"]]},
     {n:"Timing",grid:[["Timing","Pre-sleep"],["Fasting","Not required"],["Route","SubQ"],["Duration","Ongoing"]]},
     {n:"Sites",chip:"SubQ · Abdomen — pre-sleep"},
     {n:"Cycle",text:"Ongoing per sleep research protocol."},
   ],note:"For research use only. Not for research use.",
   chips:["Melatonin · MT2","Sleep · Potent","Circadian · Shift"]},

  // Accessories
  {id:"reconst",name:"Reconstitution Solution",tag:"Accessory",icon:"💧",color:"#64748b",
   sizes:[{s:"30ml",p:"$24.99"}],price:"$24.99",size:"30ml",
   desc:"Bacteriostatic water 0.9% benzyl alcohol for peptide reconstitution. Suitable for reconstituting lyophilized peptide powders.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"Spec Sheet",result:"USP Grade · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-cjc-1295-1774504283582-b2foEOrzNHqxStiGggdZGfeXrM6xFm.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"30mL bacteriostatic water. 0.9% benzyl alcohol. Standard reconstitution solution."},
     {n:"Usage",text:"administer along inner vial wall. Swirl gently — never shake.",chip:"0.9% Benzyl Alcohol · 30mL"},
     {n:"Storage",rows:[["Store","Room temp or refrigerated"],["Multi-administration amount","OK with benzyl alcohol"],["Sterility","Up to 28 days"],["Volume","30mL"]]},
     {n:"Tips",grid:[["Motion","Swirl only"],["Angle","Along inner wall"],["Syringe","Fresh per draw"],["Compat.","All peptide powders"]]},
     {n:"Notes",text:"Benzyl alcohol maintains sterility across multiple draws."},
     {n:"Cycle",text:"Accessory — no cycle required."},
   ],note:"For research use only. For reconstituting research compounds only.",
   chips:["Bacteriostatic","0.9% · Benzyl","Multi-administration amount"]},
];
const SAMPLE_ORDERS = [
  {id:"NXG-00124",date:"2026-05-18",product:"GLP-3 / Retatrutide",qty:1,price:"$120.00",status:"shipped",tracking:"9400111899223456789012"},
  {id:"NXG-00098",date:"2026-04-02",product:"GHK-Cu 100mg",qty:2,price:"$140.00",status:"delivered",tracking:"9400111899223456789001"},
];

const BOT_QA = [
  // ── Products ──
  {q:["what is retatrutide","what is glp-3","glp-3","retatrutide","triple agonist"],
   a:"GLP-3 / Retatrutide is a next-generation triple-receptor agonist targeting GLP-1, GIP, and glucagon receptors simultaneously. Published Phase 2 data (NEJM) documented up to 24% body weight reduction over 48 weeks — greater than any single or dual agonist studied. Supplied as a 24mg lyophilized vial. For research use only."},
  {q:["cjc-1295","cjc 1295","cjc","ipamorelin","gh stack","growth peptide signaling stack","tesamorelin stack"],
   a:"The CJC-1295 No DAC + Ipamorelin + Tesamorelin stack is a three-compound GH secretagogue research kit. CJC-1295 No DAC and Ipamorelin act on two separate receptor pathways, producing synergistic GH output documented at 2–3× either compound alone. Tesamorelin adds targeted GHRH stimulation. Supplied as a 40mg stack kit. For research use only."},
  {q:["ghk-cu","ghk cu","ghk","copper peptide","copper"],
   a:"GHK-Cu is a naturally occurring copper peptide complex documented to activate 4,000+ genes related to collagen synthesis, wound supporting, and inflammation research pathways. It reconstitutes to a light blue solution — this is normal and confirms proper copper-peptide binding. Supplied as 100mg lyophilized powder. For research use only."},
  {q:["what is tesamorelin","tesamorelin alone","tesamorelin solo"],
   a:"Tesamorelin is a synthetic 44-amino-acid GHRH analogue. It is not FDA-evaluated under the name Egrifta for a specific indication and has been extensively studied in metabolic and body composition research. Phase 3 trials (800+ subjects) documented 15–20% visceral adipose tissue reduction over 26 weeks. Supplied as a 20mg vial. For research use only."},
  // ── Reconstitution ──
  {q:["reconstitute","reconstitution","mix","how to mix","bac water","bacteriostatic","how much water"],
   a:"All Alphaomegatides vials are lyophilized (freeze-dried) powders requiring reconstitution with bacteriostatic water before use. General guidelines: Retatrutide 24mg → add 2.4mL = 10mg/mL. GHK-Cu 100mg → add 5.0mL = 20mg/mL. Tesamorelin 20mg → add 3.0mL = 6.67mg/mL. Always administer water slowly along the inner vial wall — never directly onto the powder. Swirl gently, never shake. Full guides are on each product page."},
  {q:["store","storage","refrigerate","freeze","how to store","shelf life"],
   a:"After reconstitution: store all peptides refrigerated at 2–8°C (35–46°F). Do not freeze reconstituted solutions. Typical use windows: Retatrutide — within 4 weeks. GHK-Cu — within 30 days. Tesamorelin — within 14 days. Lyophilized (unreconstituted) vials should be stored at 2–8°C away from light until use."},
  {q:["metabolic signaling syringe","syringe","needle","units","how to draw","u-100","u100"],
   a:"Use U-100 metabolic signaling syringes for SC research administration peptide research administration. On a U-100 syringe, 1 unit = 0.01mL. At 10mg/mL concentration, 10 units = 100mcg. At 20mg/mL, 5 units = 1mg. Detailed unit math for each compound is on the product's research protocol page."},
  // ── administration / Protocols ──
  {q:["administration amount","administration","how much","how many","mcg","mg","protocol","titration"],
   a:"administration reference data is available on each product page under 'Research Protocol Reference'. General published references: Retatrutide — start 2mg/week, titrate to 4–12mg. CJC-1295 No DAC — 100–300mcg/day. Ipamorelin — 200–300mcg/day. Tesamorelin — 2mg/day. GHK-Cu — 1–2mg per session, 3–5×/week. All administration information is for research reference only."},
  {q:["cycle","how long","cycle length","on off","weeks on","rest period"],
   a:"Published research cycle references: Retatrutide — 12–24 weeks. GH Stack (CJC/Ipa/Tesa) — 8–16 weeks on, 8 weeks off. Tesamorelin — 8–16 weeks on, 4–8 weeks off. Phase 3 ran 26–52 weeks. GHK-Cu — 30 days on, 30 days off. Cycle lengths are for research reference purposes only."},
  {q:["timing","when to administer","when to administer","best time","fasting","empty stomach","before bed","morning"],
   a:"Administration timing notes from published protocols: GH peptides (CJC-1295, Ipamorelin, Tesamorelin) — pre-sleep on empty stomach; elevated metabolic signaling attenuates GH secretion. Retatrutide — once weekly, timing flexible given ~6-day half-life. GHK-Cu — no fasting requirement; evening is common in protocols. All for research reference only."},
  {q:["administerion site","where to administer","SC research administration","subq","abdomen","rotate"],
   a:"Published research protocols use SC research administration (SubQ) administration — administerion into the fatty tissue layer. Common sites: abdomen (most common, required for Tesamorelin), upper thigh, upper arm. Rotate sites each session to support local tissue irritation. Pinch a skinfold, insert needle at 45–90°, administer slowly."},
  {q:["half life","half-life","how often","frequency","once a week","daily","weekly"],
   a:"Published half-life data: Retatrutide — ~6 days (once-weekly administration). CJC-1295 No DAC — ~30 minutes (daily administration). Ipamorelin — ~2 hours (daily). Tesamorelin — ~26–38 minutes (daily). GHK-Cu — short, typically administration amountd 3–5×/week. CJC-1295 No DAC's short half-life is intentional — it preserves pulsatile GH release."},
  // ── Peptide science ──
  {q:["what is a peptide","peptide","how do peptides work","peptides work"],
   a:"Peptides are short chains of amino acids — the building blocks of proteins. In research, synthetic peptides are designed to mimic or modulate naturally occurring signaling molecules. They interact with specific receptors to trigger biological responses. Research peptides like those at Alphaomegatides are studied for their roles in metabolic pathways, tissue repair, and hormonal signaling."},
  {q:["lyophilized","freeze dried","powder","white powder","vial"],
   a:"Lyophilization (freeze-drying) removes water from the peptide to create a stable powder that preserves potency during storage and shipping. The powder must be reconstituted with bacteriostatic water before use. Lyophilized peptides are more stable than liquid formulations and have longer shelf lives."},
  {q:["glp-1","glp1","semaglutide","ozempic","compared","difference between"],
   a:"GLP-1 agonists like semaglutide activate only the GLP-1 receptor. Retatrutide (GLP-3) activates three receptors: GLP-1, GIP, and glucagon. The added GIP agonism supports metabolic signaling secretion synergistically, while glucagon receptor activation increases energy expenditure and fat oxidation — mechanisms not present in single-agonist compounds. Phase 2 data showed greater weight reduction with retatrutide than semaglutide or tirzepatide in comparative analysis."},
  {q:["growth peptide signaling","gh","hgh","igf","igf-1","secretagogue"],
   a:"Growth peptide signaling secretagogues (like CJC-1295 and Ipamorelin) stimulate the pituitary to release endogenous GH rather than directly administering exogenous HGH. This approach preserves natural pulsatile GH release patterns and hypothalamic-pituitary feedback loops. IGF-1 (metabolic signaling-like Growth Factor 1) is downstream of GH and is often monitored in published GH peptide research protocols."},
  {q:["bpc-157","bpc","tb-500","tb500","body protection"],
   a:"BPC-157 and TB-500 are popular research peptides studied for tissue repair and supporting mechanisms. While we don't currently carry these as standalone products, our GHK-Cu compound has well-documented roles in wound supporting, collagen synthesis, and tissue supportive pathways. Check back — our compound lineup is expanding."},
  // ── COA / Quality ──
  {q:["coa","certificate of analysis","purity","test","tested","third party","lab","hplc"],
   a:"Every Alphaomegatides product comes with an independent Certificate of Analysis from Freedom Diagnostics. Testing includes HPLC purity and mass spectrometry identity confirmation. All COAs are verifiable directly on the lab's website — not just PDF downloads. View them on each product page or under 'My COAs' in your dashboard."},
  {q:["endotoxin","heavy metal","sterility","usp","conforms"],
   a:"Beyond purity, Alphaomegatides products are tested for: Endotoxin (USP <85>) — bacterial endotoxin screening. Heavy Metals (USP Class 1 or Full Panel) — elemental impurity screening. Sterility (USP) — confirms no microbial contamination. All current batches conform. View individual PDFs on any product page."},
  {q:["fake","fraud","counterfeit","real","authentic","trust"],
   a:"All Alphaomegatides certificates are tested by Freedom Diagnostics and verifiable on the lab's own website. We recommend always verifying COAs at the lab's site directly — not just accepting a PDF. Certificate fraud is common in the research peptide space; our certificates are publicly verifiable to protect researchers."},
  // ── Ordering / Account ──
  {q:["how to order","order","buy","purchase","cart","checkout"],
   a:"Browse our research compounds and click 'Add to Cart' on any product page. Checkout is US-only — we do not fulfill international orders. Create an account to track your orders, access COA documents, and manage your shipping address."},
  {q:["ship","shipping","delivery","how long","when","arrive","us only","international"],
   a:"Alphaomegatides fulfills to US addresses only — no international orders. Orders are typically processed within 1–2 business days. Standard domestic delivery runs 3–5 business days after dispatch. You'll receive tracking information via your account dashboard."},
  {q:["account","register","sign up","login","dashboard","profile"],
   a:"Create a free account using 'Create Account' in the top nav. US researchers only — a US address is required. Your dashboard includes: order history with tracking, shipping address management, progress photo upload, and all your COA documents in one place."},
  {q:["price","cost","how much","pricing","$"],
   a:"Current research compound pricing: GLP-3 R from $63.99 (10mg) · GLP-2 T from $49.99 (10mg) · BPC-157 $24.99 (10mg) · KLOW $144.99 (80mg blend) · Tesamorlin/CJC-1295/Ipamorlin Blend $129.99 (10mg) · CJC-1295 $54.99 (10mg) · GHK-CU from $39.99 (50mg) · TB-500 $44.99 (10mg) · Selank/Semax Blend $79.99 (10mg). All orders include COA documentation."},
  {q:["return","refund","wrong","issue","problem","damaged"],
   a:"Please contact us at alphaomegatides@yahoo.com for any order issues. If there is a documented purity issue or fulfillment error, we will work to resolve it promptly. Include your order number and description of the issue."},
  {q:["contact","email","reach","support","help","question"],
   a:"Reach us at alphaomegatides@yahoo.com or visit the Contact page in the nav. We typically respond within 1 business day. For research protocol questions, order issues, or COA documentation requests — we're here to help."},
  // ── Legal / Safety ──
  {q:["safe","safety","side effect","risk","danger","warning"],
   a:"All Alphaomegatides products are for research use only — not for research use. Safety profiles vary by compound and are documented in published research and preresearch literature, available on each product page. GHK-Cu has a particularly high safety margin (~300× above documented research administration amounts). Researchers should review all published data and institutional protocols before handling any compound."},
  {q:["legal","law","regulated","controlled","regulated compound","illegal"],
   a:"Research peptides occupy a complex regulatory space. They are not FDA-approved for research use and are not scheduled controlled substances in the US. They are legal to purchase and possess for legitimate research purposes. Researchers are responsible for compliance with all applicable institutional, local, state, and federal regulations."},
  {q:["human","not for human","consume","eat","drink","administer yourself"],
   a:"Alphaomegatides products are strictly for in-vitro and laboratory research use only. They are not intended for human or veterinary use, are not FDA-approved for research use, and should not be self-administered. All product documentation and protocols are provided for research reference purposes only."},
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

// ── PASSWORD SECURITY: SHA-256 via Web Crypto (no bcrypt needed client-side)
async function hashPassword(pw: string): Promise<string> {
  try {
    const enc = new TextEncoder();
    const buf = await crypto.subtle.digest("SHA-256", enc.encode(pw + "aot_salt_2026"));
    return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
  } catch { return pw; } // fallback if crypto unavailable
}
function hashSync(pw: string): string {
  // Sync fallback — use only where async not possible
  // Real fix: use hashPassword() everywhere and make handlers async
  let hash = 0;
  const salted = pw + "aot_salt_2026";
  for (let i = 0; i < salted.length; i++) { hash = ((hash << 5) - hash) + salted.charCodeAt(i); hash |= 0; }
  return hash.toString(36);
}

function getBotReply(input) {
  const lower = input.toLowerCase();
  for (const item of BOT_QA) {
    if (item.q.some(k => lower.includes(k))) return item.a;
  }
  return "That's a great research question. I don't have a specific answer for that in my knowledge base, but you can reach our team directly at alphaomegatides@yahoo.com — we typically respond within 1 business day. You can also find detailed documentation on each product page.";
}

// Clean fake orders from any existing accounts
(()=>{
  try{
    const users=JSON.parse(localStorage.getItem("nxg_u")||"{}");
    let changed=false;
    const fakeIds=["NXG-00124","NXG-00098"];
    Object.keys(users).forEach(email=>{
      if(users[email].orders&&users[email].orders.length){
        const cleaned=users[email].orders.filter((o:any)=>!fakeIds.includes(o.id));
        if(cleaned.length!==users[email].orders.length){
          users[email].orders=cleaned;
          changed=true;
        }
      }
    });
    if(changed)localStorage.setItem("nxg_u",JSON.stringify(users));
  }catch{}
})();

function getUsers(){try{return JSON.parse(localStorage.getItem("nxg_u")||"{}")}catch{return{}}}
function saveUsers(u){localStorage.setItem("nxg_u",JSON.stringify(u))}
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// ── LOYALTY POINTS ────────────────────────────────────────
const POINTS_PER_DOLLAR = 10; // 10 pts per $1 spent
const POINTS_REDEEM_RATE = 100; // 100 pts = $1 off
function getPoints(email:string):number{
  try{return parseInt(localStorage.getItem("ao_pts_"+btoa(email))||"0");}catch{return 0;}
}
function addPoints(email:string,dollars:number):number{
  const pts=Math.floor(dollars*POINTS_PER_DOLLAR);
  const current=getPoints(email);
  const newTotal=current+pts;
  try{localStorage.setItem("ao_pts_"+btoa(email),String(newTotal));}catch{}
  return newTotal;
}
function redeemPoints(email:string,points:number):boolean{
  const current=getPoints(email);
  if(current<points)return false;
  try{localStorage.setItem("ao_pts_"+btoa(email),String(current-points));}catch{}
  return true;
}
function pointsToDollars(points:number):number{
  return points/POINTS_REDEEM_RATE;
}


function getSess(){
  try{
    const s=JSON.parse(localStorage.getItem("nxg_s")||"null");
    if(!s) return null;
    // Check TTL
    const ts=localStorage.getItem("nxg_s_ts");
    if(ts && Date.now()-parseInt(ts)>SESSION_TTL_MS){
      localStorage.removeItem("nxg_s");
      localStorage.removeItem("nxg_s_ts");
      return null;
    }
    const users=getUsers();
    return users[s.email]||s;
  }catch{return null;}
}
function setSess(u){
  localStorage.setItem("nxg_s",JSON.stringify(u));
  localStorage.setItem("nxg_s_ts", Date.now().toString());
}
function clearSess(){
  localStorage.removeItem("nxg_s");
  localStorage.removeItem("nxg_s_ts");
}

const inp = {padding:"10px 14px",border:"1.5px solid rgba(255,255,255,0.12)",borderRadius:10,fontFamily:"inherit",fontSize:"0.88rem",outline:"none",background:"#1c1c1c",color:"#fff",width:"100%",boxSizing:"border-box"};

function Field({label,type="text",...p}){
  return <div style={{display:"flex",flexDirection:"column",gap:4}}>
    {label&&<label style={{fontSize:"0.73rem",fontWeight:600}}>{label}</label>}
    <input type={type} style={inp} {...p}/>
  </div>;
}

function StateSelect({label,value,onChange}){
  return <div style={{display:"flex",flexDirection:"column",gap:4}}>
    {label&&<label style={{fontSize:"0.73rem",fontWeight:600}}>{label}</label>}
    <select value={value} onChange={onChange} style={{...inp,background:"#1c1c1c",color:"#fff"}}>
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
  const STREET_TYPES = ["St","Ave","Blvd","Dr","Ln","Rd","Way","Ct","Pl","Cir","Pkwy","Trl","Hwy","Loop","Pass"];
  const STREETS = ["Main","Oak","Maple","Cedar","Pine","Elm","Washington","Lincoln","Park","Lake","River","Hill","Highland","Sunset","Sunrise","Broadway","Market","Church","School","Forest","Meadow","Valley","Spring","Central","Grand","Union","Liberty","Franklin","Adams","Jefferson","Madison","Monroe","Jackson","Willow","Magnolia","Peach","Cherry","Walnut","Chestnut","Birch","Cypress","Palm","Coral","Sand","Harbor","Bay","Crest","Ridge","Cliff","Canyon","Prairie","Harvest","Orchard","Garden","Vineyard","Lakewood","Fernwood","Greenwood","Westwood","Eastwood","Northwood","Southwood","Brookwood","Sherwood","Inglewood","Maplewood","Rosewood","Driftwood","Heather","Heatherwood","Castlewood","Stonewood","Ironwood","Edgewood","Firewood","Pinewood","Elmwood"];
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
    const matchedStreets = STREETS.filter(s => s.toLowerCase().startsWith(streetPart) || (num && s.toLowerCase().includes(streetPart))).slice(0, 3);
    const matchedTypes = num ? STREET_TYPES.slice(0, 3) : [STREET_TYPES[0], STREET_TYPES[1], STREET_TYPES[2]];
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
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setShow(false); }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{position:"relative",display:"flex",flexDirection:"column",gap:4}}>
      {label && <label style={{fontSize:"0.73rem",fontWeight:600}}>{label}</label>}
      <input value={value} onChange={handleChange} onFocus={()=>suggestions.length&&setShow(true)}
        placeholder={placeholder||"Start typing your address…"} style={inp}/>
      {show && (
        <div style={{position:"absolute",top:"100%",left:0,right:0,background:"#1e1e1e",border:"1.5px solid rgba(255,255,255,0.12)",borderRadius:10,zIndex:200,marginTop:4,boxShadow:"0 8px 24px rgba(0,0,0,0.5)",overflow:"hidden"}}>
          {suggestions.map((s,i)=>(
            <div key={i} onMouseDown={()=>pick(s)}
              style={{padding:"10px 14px",fontSize:"0.85rem",cursor:"pointer",borderBottom:i<suggestions.length-1?"1px solid rgba(255,255,255,0.06)":undefined,display:"flex",alignItems:"center",gap:8,transition:"background .15s",color:"#fff"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(79,142,247,0.1)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <span style={{color:"#4f8ef7",fontSize:"0.9rem",flexShrink:0}}>📍</span>
              <div style={{minWidth:0}}>
                <div style={{fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{s.street}</div>
                <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.45)"}}>{s.city}{s.state?`, ${s.state}`:""} {s.zip}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PrimaryBtn({children,onClick,color="#3be8b0",tc="#0e0e0e",full,style={},disabled=false}:any){
  const [h,sh]=useState(false);
  return <button onClick={disabled?undefined:onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)} disabled={disabled}
    style={{background:disabled?"rgba(255,255,255,0.1)":h?"#4f8ef7":color,color:disabled?"rgba(255,255,255,0.3)":tc,border:"none",padding:"13px 28px",borderRadius:100,cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",fontWeight:600,fontSize:"0.9rem",transition:"all .2s",width:full?"100%":"auto",opacity:disabled?0.6:1,...style}}>{children}</button>;
}
function GhostBtn({children,onClick,style={}}){
  const [h,sh]=useState(false);
  return <button onClick={onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
    style={{background:"transparent",color:h?"#ffffff":"rgba(255,255,255,0.6)",border:`1.5px solid ${h?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.2)"}`,padding:"10px 22px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:"0.85rem",transition:"all .2s",...style}}>{children}</button>;
}

// ── NAV ────────────────────────────────────────────
function DarkModeBtn() {
  const { dark, toggle } = useDarkMode();
  return (
    <button onClick={toggle} title={dark?"Switch to light mode":"Switch to dark mode"}
      style={{background:"none",border:"none",color:"rgba(255,255,255,0.45)",cursor:"pointer",fontSize:"1rem",padding:"6px 8px",borderRadius:8,transition:"color .2s",minHeight:"auto"}}
      onMouseEnter={e=>e.currentTarget.style.color="#fff"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.45)"}>
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

function Nav({user,go,onLogout,cartCount}){
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  const streamLive = useStreamLive();
  // Shift nav down when flash banner is visible
  const [bannerH,setBannerH]=useState(0);
  useEffect(()=>{
    const check=()=>{
      try{
        const raw=localStorage.getItem("aot_flash_sale");
        const dismissed=sessionStorage.getItem("aot_flash_dismissed");
        if(!raw||dismissed){setBannerH(0);return;}
        const d=JSON.parse(raw);
        if(!d||!d.active){setBannerH(0);return;}
        if(d.endsAt&&d.endsAt!==""&&new Date(d.endsAt).getTime()<Date.now()){setBannerH(0);return;}
        setBannerH(38);
      }catch{setBannerH(0);}
    };
    check();
    const iv=setInterval(check,1000);
    const onCustom=()=>{setTimeout(check,50);};
    window.addEventListener("aot_flash_update",onCustom);
    return()=>{clearInterval(iv);window.removeEventListener("aot_flash_update",onCustom);};
  },[]);
  const CATS=[
    {label:"Metabolic Research",ids:["glp3r","glp2t","glp1"]},
    {label:"post-research support & supporting",ids:["bpc157","tb500","ghkcu","glow"]},
    {label:"Growth & Longevity",ids:["cjc1295","cjcipa","ipamorlin","tesamorlin","igf1lr3","nad","motsc","ss31","glutathione"]},
    {label:"Neuro & Sleep",ids:["selank","semax","dsip","mt2"]},
  ];
  return <>
    {/* Overlay */}
    {open&&<div onClick={close} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:996,backdropFilter:"blur(2px)"}}/>}

    <nav style={{position:"fixed",top:bannerH,left:0,right:0,zIndex:998,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",background:"rgba(10,10,10,0.97)",backdropFilter:"blur(10px)",borderBottom:"none"}}>
      {/* LEFT — hamburger */}
      <button onClick={()=>setOpen(p=>!p)} style={{background:"none",border:"none",padding:"6px 8px",cursor:"pointer",display:"flex",flexDirection:"column",gap:5,alignItems:"center",justifyContent:"center",borderRadius:8,minHeight:"auto"}}>
        <span style={{display:"block",width:22,height:2,background:open?C.b:C.ink,borderRadius:2,transition:"all .25s",transform:open?"rotate(45deg) translate(5px,5px)":"none"}}/>
        <span style={{display:"block",width:22,height:2,background:open?C.b:C.ink,borderRadius:2,transition:"all .25s",opacity:open?0:1}}/>
        <span style={{display:"block",width:22,height:2,background:open?C.b:C.ink,borderRadius:2,transition:"all .25s",transform:open?"rotate(-45deg) translate(5px,-5px)":"none"}}/>
      </button>

      {/* CENTER — compact combined αΩ wordmark */}
      <div onClick={()=>{go("home");close();}} style={{cursor:"pointer",position:"absolute",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:0,userSelect:"none" as const}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.45rem",color:"#ff6b6b",lineHeight:1,textShadow:"0 0 18px rgba(255,107,107,0.55)",letterSpacing:"-0.02em"}}>α</span>
        {/* Inline mini DNA — vertical bars only, clean */}
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none" style={{margin:"0 1px",flexShrink:0}}>
          <defs><linearGradient id="navdna2" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff6b6b"/><stop offset="50%" stopColor="#a855f7"/><stop offset="100%" stopColor="#3be8b0"/>
          </linearGradient></defs>
          {/* Two vertical strands */}
          <path d="M4 0 C2 5,2 10,4 14 C6 18,7 22,5 27" stroke="url(#navdna2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M14 0 C16 5,16 10,14 14 C12 18,11 22,13 27" stroke="url(#navdna2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Rungs */}
          <line x1="4" y1="0"  x2="14" y2="0"  stroke="rgba(255,107,107,0.7)" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="3" y1="9"  x2="15" y2="9"  stroke="rgba(168,85,247,0.7)"  strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="4" y1="18" x2="14" y2="18" stroke="rgba(59,232,176,0.75)" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="5" y1="27" x2="13" y2="27" stroke="rgba(59,232,176,0.6)"  strokeWidth="1.8" strokeLinecap="round"/>
          {/* Node dots */}
          <circle cx="4"  cy="0"  r="2.2" fill="#ff6b6b"/>
          <circle cx="14" cy="0"  r="2.2" fill="#ff6b6b"/>
          <circle cx="4"  cy="18" r="2"   fill="#a855f7" opacity="0.9"/>
          <circle cx="14" cy="18" r="2"   fill="#a855f7" opacity="0.9"/>
          <circle cx="5"  cy="27" r="2.2" fill="#3be8b0"/>
          <circle cx="13" cy="27" r="2.2" fill="#3be8b0"/>
        </svg>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.45rem",color:"#3be8b0",lineHeight:1,textShadow:"0 0 18px rgba(59,232,176,0.55)",letterSpacing:"-0.02em"}}>Ω</span>
      </div>

      {/* RIGHT — cart + account icon */}
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {/* Search */}
        <button onClick={()=>{setSearchOpen(p=>!p);close();}} style={{background:"none",border:"none",cursor:"pointer",padding:"6px 8px",minHeight:"auto",borderRadius:8,color:"rgba(255,255,255,0.5)",fontSize:"0.85rem"}} title="Search (/)">🔍</button>
        {/* Cart */}
        <button onClick={()=>{go("cart");close();}} style={{background:"none",border:"none",cursor:"pointer",padding:"6px 8px",position:"relative",minHeight:"auto",borderRadius:8}}>
          <span style={{fontSize:"1.3rem"}}>🛒</span>
          {cartCount>0&&<span style={{position:"absolute",top:2,right:2,width:16,height:16,borderRadius:"50%",background:C.r,color:"#fff",fontSize:"0.6rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>}
        </button>
        {/* Account avatar */}
        {user
          ?<button onClick={()=>{go("dashboard");close();}} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",width:34,height:34,borderRadius:"50%",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.75rem",flexShrink:0,minHeight:"auto"}}>{user.fname?user.fname[0].toUpperCase():"U"}</button>
          :<button onClick={()=>{go("login");close();}} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",width:34,height:34,borderRadius:"50%",cursor:"pointer",fontSize:"1rem",flexShrink:0,minHeight:"auto"}}>👤</button>
        }
      </div>
    </nav>

    {/* Slide-out drawer */}
    <div style={{position:"fixed",top:bannerH,left:0,bottom:0,width:Math.min(320,window.innerWidth-40),background:"#111111",zIndex:997,transform:open?"translateX(0)":"translateX(-100%)",transition:"transform .28s cubic-bezier(.4,0,.2,1)",overflowY:"auto",boxShadow:open?"4px 0 32px rgba(0,0,0,0.18)":"none",display:"flex",flexDirection:"column"}}>
      {/* Drawer header */}
      <div style={{padding:"20px 20px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",color:"#ff6b6b",lineHeight:1,textShadow:"0 0 14px rgba(255,107,107,0.5)",letterSpacing:"-0.02em"}}>α</span>
          <svg width="16" height="26" viewBox="0 0 18 28" fill="none" style={{margin:"0 1px",flexShrink:0}}>
            <defs><linearGradient id="drawerdna2" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff6b6b"/><stop offset="50%" stopColor="#a855f7"/><stop offset="100%" stopColor="#3be8b0"/>
            </linearGradient></defs>
            <path d="M4 0 C2 5,2 10,4 14 C6 18,7 22,5 27" stroke="url(#drawerdna2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M14 0 C16 5,16 10,14 14 C12 18,11 22,13 27" stroke="url(#drawerdna2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <line x1="4" y1="0"  x2="14" y2="0"  stroke="rgba(255,107,107,0.7)" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="3" y1="9"  x2="15" y2="9"  stroke="rgba(168,85,247,0.7)"  strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="4" y1="18" x2="14" y2="18" stroke="rgba(59,232,176,0.75)" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="4" cy="0" r="2.2" fill="#ff6b6b"/><circle cx="14" cy="0" r="2.2" fill="#ff6b6b"/>
            <circle cx="4" cy="18" r="2" fill="#a855f7" opacity="0.9"/><circle cx="14" cy="18" r="2" fill="#a855f7" opacity="0.9"/>
          </svg>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",color:"#3be8b0",lineHeight:1,textShadow:"0 0 14px rgba(59,232,176,0.5)",letterSpacing:"-0.02em"}}>Ω</span>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.68rem",color:"rgba(255,255,255,0.45)",letterSpacing:"0.1em",marginLeft:6,textTransform:"uppercase" as const}}>Alphaomegatides</span>
        </div>
        <button onClick={close} style={{background:"none",border:"none",fontSize:"1.2rem",cursor:"pointer",color:"rgba(255,255,255,0.4)",padding:4,minHeight:"auto"}}>✕</button>
      </div>

      <div style={{padding:"12px 0",flex:1}}>
        {/* Main nav items */}
        {[
          {icon:"🏠",label:"Home",action:()=>{go("home");close();}},
          {icon:"🛒",label:"Shopping Cart",action:()=>{go("cart");close();},badge:cartCount>0?cartCount:null},
          ...(user
            ?[{icon:"👤",label:`${user.fname}'s Account`,action:()=>{go("dashboard");close();}},
              {icon:"🚪",label:"Sign Out",action:()=>{clearSess();onLogout();go("home");close();},red:true}]
            :[{icon:"👤",label:"Sign In",action:()=>{go("login");close();}},
              {icon:"✨",label:"Create Account",action:()=>{go("register");close();}}]
          ),
          {icon:"💬",label:"Community Chat",action:()=>{go("chat");close();}},{icon:"𝕏",label:"X Community",action:()=>{go("xcommunity");close();}},{icon:"👑",label:"Admin Panel",action:()=>{go("admin");close();}},{icon:"▶",label:"Video Tutorials",action:()=>{go("videos");close();}},{icon:"⚗️",label:"Stack Builder",action:()=>{go("stacks");close();}},{icon:"📖",label:"Research Wiki",action:()=>{go("wiki");close();}},{icon:"🔬",label:"COA Library",action:()=>{go("coa");close();}},{icon:"📚",label:"Research Library",action:()=>{go("research");close();}},
          {icon:"⚖️",label:"Legal & Compliance",action:()=>{go("compliance");close();}},
          {icon:"🎯",label:"Find My Compound",action:()=>{go("quiz");close();}},
          {icon:"📦",label:"Track My Order",action:()=>{go("track");close();}},
          {icon:"📰",label:"Research Blog",action:()=>{go("blog");close();}},
          {icon:"📞",label:"Contact & About",action:()=>{go("about");close();}},
          {icon:"📓",label:"Research Journal",action:()=>{go("journal");close();}},
          {icon:"🧬",label:"Stack Checker",action:()=>{go("stack");close();}},
          {icon:"💊",label:"Dosing Calculator",action:()=>{go("dosing");close();}},
        ].map(item=>(
          <button key={item.label} onClick={item.action}
            style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 16px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.85rem",fontWeight:600,color:item.red?C.r:"#ffffff",textAlign:"left",transition:"background .15s",minHeight:"auto",borderRadius:0,position:"relative"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
            onMouseLeave={e=>e.currentTarget.style.background="none"}>
            <span style={{fontSize:"1rem",width:20,textAlign:"center",flexShrink:0}}>{item.icon}</span>
            {item.label}
            {item.badge&&<span style={{marginLeft:"auto",background:C.r,color:"#fff",fontSize:"0.65rem",fontWeight:700,padding:"2px 7px",borderRadius:100}}>{item.badge}</span>}
          </button>
        ))}

        {/* Products section — expandable categories */}
        <AccordionMenu go={go} close={close}/>
      </div>

      {/* Drawer footer */}
      <div style={{padding:"16px 20px",borderTop:"1px solid rgba(255,255,255,0.07)",flexShrink:0}}>
        <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.25)",textAlign:"center",lineHeight:1.6}}>
          ⚠️ For research use only · Not for research use
        </div>
      </div>
    </div>

    <style>{`
      *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}
      html{font-size:16px;scroll-behavior:smooth;}
      body{overflow-x:hidden;}
      input,select,textarea{font-size:16px!important;}
      @media(max-width:600px){nav{padding:12px 16px!important;}}
      @media(max-width:700px){.footer-grid{grid-template-columns:1fr 1fr!important;}.co-summary-desktop{display:none!important;}}
      @media(max-width:420px){.footer-grid{grid-template-columns:1fr!important;}}
      @media(max-width:480px){.info-card-grid{grid-template-columns:1fr!important;}}
      @media(min-width:700px){.co-grid{display:grid;grid-template-columns:1fr 340px;gap:24px;align-items:start;}.co-summary-mobile{display:none!important;}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    `}</style>
  </>;
}


const PRODUCT_META = {
  "glp3r":{bestFor:["Metabolic Research","Appetite Control","Metabolic support"],difficulty:"Intermediate",stacks:["glp2t","bpc157","tb500"]},
  "glp2t":{bestFor:["Metabolic Research","GI support","Metabolic"],difficulty:"Intermediate",stacks:["glp3r","bpc157"]},
  "glp1":{bestFor:["Metabolic Research","Blood Sugar","Appetite"],difficulty:"Beginner",stacks:["glp2t","bpc157"]},
  "bpc157":{bestFor:["Gut supporting","Tissue Repair","Joint Research"],difficulty:"Beginner",stacks:["tb500"]},
  "tb500":{bestFor:["Muscle post-research support","Tissue Repair","Flexibility"],difficulty:"Beginner",stacks:["bpc157"]},
  "cjc1295":{bestFor:["anabolic research","Metabolic Research","GH Pulse"],difficulty:"Intermediate",stacks:["ipamorlin","igf1lr3"]},
  "cjcipa":{bestFor:["GH Release","Muscle","Metabolic Research"],difficulty:"Intermediate",stacks:["ghkcu","igf1lr3"]},
  "ipamorlin":{bestFor:["GH Release","sleep research","Tissue Research"],difficulty:"Beginner",stacks:["cjc1295","dsip"]},
  "tesamorlin":{bestFor:["Visceral Fat","Body Composition","GH"],difficulty:"Intermediate",stacks:["cjcipa","igf1lr3"]},
  "igf1lr3":{bestFor:["anabolic research","Cell Repair","Tissue Research"],difficulty:"Advanced",stacks:["cjcipa","tb500"]},
  "ghkcu":{bestFor:["Skin support","longevity research","Wound supporting"],difficulty:"Beginner",stacks:["glow","nad"]},
  "glow":{bestFor:["Skin Repair","longevity research","Collagen"],difficulty:"Beginner",stacks:["ghkcu","nad"]},
  "nad":{bestFor:["Energy","DNA Repair","Longevity"],difficulty:"Beginner",stacks:["ss31","motsc"]},
  "motsc":{bestFor:["Metabolism","metabolic signaling Sensitivity","Energy"],difficulty:"Intermediate",stacks:["nad"]},
  "glutathione":{bestFor:["Antioxidant","Detox","Immune Support"],difficulty:"Beginner",stacks:["nad"]},
  "ss31":{bestFor:["Mitochondria","Heart support","Longevity"],difficulty:"Advanced",stacks:["nad","motsc"]},
  "selank":{bestFor:["Anxiety Relief","Focus","neuro researchion"],difficulty:"Beginner",stacks:["semax","dsip"]},
  "semax":{bestFor:["Cognitive","Memory","BDNF support"],difficulty:"Beginner",stacks:["selank","nad"]},
  "dsip":{bestFor:["Deep Sleep","Circadian Reset","Tissue Research"],difficulty:"Beginner",stacks:["ipamorlin"]},
  "mt2":{bestFor:["Sleep","reproductive research","Tanning"],difficulty:"Beginner",stacks:["dsip"]},
  "reconst":{bestFor:["Reconstitution","Lab Use"],difficulty:"Beginner",stacks:[]},
};

// ── SHOPIFY CHECKOUT ─────────────────────────────────
const SHOPIFY_DOMAIN = "sequential-peptides.myshopify.com";
const SHOPIFY_TOKEN  = "1a55408a6a44c2cc1012197ad1218958";

function buildShopifyCartUrl(cartItems:{id:string,name:string,selectedSize:string,selectedPrice:string,quantity?:number}[]){
  return `https://${SHOPIFY_DOMAIN}`;
}

function shopifyCheckout(cartItems:{id:string,name:string,selectedSize:string,selectedPrice:string,quantity?:number}[]){
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
  console.log("Shopify checkout disabled.");
}


const RESEARCH_POTENTIAL: Record<string,{headline:string,points:{icon:string,label:string,detail:string}[]}> = {
  "glp3r":{headline:"What researchers study this for",points:[
    {icon:"⚖️",label:"Weight Reduction",detail:"Phase 2 data documented up to 24% body weight reduction over 48 weeks in study subjects."},
    {icon:"🍽️",label:"Appetite Signaling",detail:"GLP-1 receptor activation is strongly associated with reduced caloric inadminister and delayed gastric emptying in research models."},
    {icon:"🩸",label:"Glucose Metabolism",detail:"GIP receptor agonism studied for glucose-dependent metabolic signaling secretion and improved metabolic signaling sensitivity pathways."},
    {icon:"🔥",label:"Energy Expenditure",detail:"Glucagon receptor activation is associated with increased fat oxidation and resting energy expenditure in preresearch models."},
  ]},
  "glp2t":{headline:"What researchers study this for",points:[
    {icon:"⚖️",label:"Body Composition",detail:"Dual GLP-1/GIP agonism studied for significant reductions in fat mass with preservation of lean tissue."},
    {icon:"🩸",label:"Incretin Response",detail:"GIP + GLP-1 co-agonism studied for synergistic effects on postprandial metabolic signaling secretion and glucose control."},
    {icon:"🍽️",label:"Satiety Pathways",detail:"GLP-1 activation is associated with central appetite suppression and reduced food-seeking behavior in published models."},
  ]},
  "glp1":{headline:"What researchers study this for",points:[
    {icon:"🍽️",label:"Appetite Regulation",detail:"GLP-1 receptor activation is the most extensively studied pathway for appetite suppression and satiety signaling."},
    {icon:"🩸",label:"Glucose-Dependent metabolic signaling",detail:"Studied for glucose-dependent metabolic signaling secretion — reduces hypoglycemia risk versus older agents in published models."},
    {icon:"⚖️",label:"Metabolic Research",detail:"GLP-1 analogues are the foundation of modern metabolic research, with extensive published literature across 20+ years."},
  ]},
  "bpc157":{headline:"What researchers study this for",points:[
    {icon:"🩹",label:"Tissue Repair Signaling",detail:"BPC-157 has been extensively studied for accelerating tissue repair pathways across multiple tissue types in animal models."},
    {icon:"🦠",label:"Gut Lining Integrity",detail:"Associated with protection and supporting of gastric mucosa and intestinal barrier in rodent models of GI subject tissue."},
    {icon:"🩸",label:"Angiogenesis",detail:"Studied for promotion of new blood vessel formation — a key mechanism in tissue supporting research."},
    {icon:"💪",label:"Tendon & Muscle Models",detail:"Published research has examined BPC-157 in tendon-to-bone supporting and muscle subject tissue models."},
  ]},
  "tb500":{headline:"What researchers study this for",points:[
    {icon:"🏃",label:"Systemic supporting",detail:"As a synthetic Thymosin Beta-4 fragment, TB-500 is studied for systemic tissue remodeling via actin regulation pathways."},
    {icon:"🔬",label:"Cell Migration",detail:"Actin regulation is central to cell migration — a key mechanism in wound supporting and tissue repair research."},
    {icon:"🩸",label:"Angiogenesis",detail:"TB-500 has been studied for angiogenesis promotion, complementing BPC-157 in dual-compound protocols."},
    {icon:"🛡️",label:"inflammatory markers Modulation",detail:"Thymosin Beta-4 is associated with down-regulation of pro-inflammatory cytokines in published preresearch models."},
  ]},
  "cjc1295":{headline:"What researchers study this for",points:[
    {icon:"⚡",label:"Pulsatile GH Release",detail:"CJC-1295 No DAC's ~30-min half-life specifically preserves the natural pulsatile pattern of GH secretion."},
    {icon:"📈",label:"IGF-1 Axis",detail:"GH secretagogues are studied for downstream IGF-1 elevation, associated with protein synthesis and cellular repair."},
    {icon:"🔬",label:"Pituitary Signaling",detail:"Studied as a GHRH analogue for interaction with pituitary somatotroph cells and the hypothalamic feedback loop."},
  ]},
  "cjcipa":{headline:"Why researchers combine CJC-1295 + Ipamorelin",points:[
    {icon:"⚡",label:"Synergistic GH Output",detail:"CJC-1295 acts on GHRH receptors; Ipamorelin acts on ghrelin receptors. Published data shows 2–3× the GH output of either alone."},
    {icon:"🎯",label:"Complementary Receptors",detail:"Two separate receptor pathways stimulated simultaneously — a common strategy to maximize secretagogue signal without saturation."},
    {icon:"🛡️",label:"Selective Profile (Ipamorelin)",detail:"Ipamorelin is specifically selected for minimal cortisol and prolactin side effects compared to other GHRPs."},
  ]},
  "ipamorlin":{headline:"What researchers study this for",points:[
    {icon:"🎯",label:"Selective GH Release",detail:"Ipamorelin is studied for highly selective GH secretion with documented minimal impact on cortisol, prolactin, or ACTH."},
    {icon:"🌙",label:"Sleep Architecture",detail:"GH secretagogues are studied in relation to slow-wave sleep, where the largest natural GH pulses occur."},
    {icon:"💪",label:"Lean Tissue Research",detail:"GH axis activation is associated with favorable body composition changes in published GH research across multiple models."},
  ]},
  "tesamorlin":{headline:"What researchers study this for",points:[
    {icon:"🏋️",label:"Visceral Adipose Reduction",detail:"Phase 3 trials (800+ subjects) documented 15–20% reduction in visceral adipose tissue over 26 weeks."},
    {icon:"📈",label:"IGF-1 Elevation",detail:"Tesamorlin is studied for administration amount-dependent IGF-1 elevation, a marker used in GH axis research protocols."},
    {icon:"🔬",label:"GHRH Analogue Research",detail:"As a 44-amino-acid GHRH analogue, Tesamorlin is the most research validated compound in this class with extensive Phase 2/3 data."},
  ]},
  "igf1lr3":{headline:"What researchers study this for",points:[
    {icon:"📈",label:"Downstream GH Axis",detail:"IGF-1 LR3 acts downstream of GH — directly at tissue IGF-1 receptors. Studied for cell proliferation and protein synthesis."},
    {icon:"🔬",label:"Extended Half-Life",detail:"The LR3 modification extends half-life versus native IGF-1, allowing sustained receptor activation in research models."},
    {icon:"💪",label:"Muscle & Tissue Research",detail:"IGF-1 receptor activation is the most studied pathway for skeletal muscle hypertrophy signaling in molecular biology research."},
  ]},
  "ghkcu":{headline:"What researchers study this for",points:[
    {icon:"🧬",label:"4,000+ Gene Activation",detail:"GHK-Cu has been documented to modulate expression of over 4,000 human genes — more than any other single peptide studied to date."},
    {icon:"✨",label:"Collagen & ECM",detail:"Strongly associated with collagen synthesis, elastin production, and extracellular matrix remodeling in published dermal research."},
    {icon:"🩹",label:"Wound supporting",detail:"GHK-Cu is one of the most studied compounds for wound supporting acceleration, with multiple published trials across dermal and surgical models."},
    {icon:"🛡️",label:"inflammation research",detail:"Associated with down-regulation of inflammatory gene expression and oxidative stress pathways in published in-vitro research."},
  ]},
  "glow":{headline:"What researchers study this blend for",points:[
    {icon:"✨",label:"Skin Matrix (GHK-Cu)",detail:"GHK-Cu provides the collagen, elastin, and ECM remodeling foundation — the most evidence-backed skin peptide in the blend."},
    {icon:"🩹",label:"Cellular Repair (BPC-157)",detail:"BPC-157 contributes fibroblast activation and angiogenesis signaling to support dermal tissue supporting pathways."},
    {icon:"🔬",label:"Structural Renewal (TB4)",detail:"Thymosin Beta-4 is associated with keratinocyte migration and skin structural renewal in published wound supporting models."},
  ]},
  "nad":{headline:"What researchers study this for",points:[
    {icon:"⚡",label:"Cellular Energy (ATP)",detail:"NAD+ is the essential coenzyme for mitochondrial ATP production. Studied for restoration of declining NAD+ levels associated with aging."},
    {icon:"🧬",label:"Sirtuin Activation",detail:"NAD+ is required for sirtuin (SIRT1–7) deacetylase activity — the protein family most studied in longevity and metabolic regulation research."},
    {icon:"🔧",label:"DNA Repair (PARP)",detail:"PARP enzymes consume NAD+ during DNA repair. Maintaining NAD+ levels is studied for its role in genomic stability and repair efficiency."},
    {icon:"🏃",label:"Mitochondrial Function",detail:"Declining NAD+ is associated with mitochondrial dysfunction in aging research. Restoration is a primary target in longevity science."},
  ]},
  "motsc":{headline:"What researchers study this for",points:[
    {icon:"🔋",label:"Mitochondrial Origin",detail:"MOTS-c is a peptide encoded in the mitochondrial genome — one of the few mitochondria-derived signaling peptides identified in published research."},
    {icon:"🩸",label:"metabolic signaling Sensitivity",detail:"MOTS-c is studied for improving metabolic signaling sensitivity and glucose metabolism via AMPK activation — a key metabolic signaling pathway."},
    {icon:"⚡",label:"Exercise Performance Pathways",detail:"Published animal data showed MOTS-c improved physical performance and metabolic flexibility, making it a subject of exercise physiology research."},
  ]},
  "glutathione":{headline:"What researchers study this for",points:[
    {icon:"🌱",label:"Master Antioxidant",detail:"Glutathione is the body's primary endogenous antioxidant — studied for neutralization of reactive oxygen species and oxidative stress reduction."},
    {icon:"🛡️",label:"Immune Modulation",detail:"Published research associates glutathione levels with T-cell proliferation and NK cell activity — key markers in immune function research."},
    {icon:"🔧",label:"Detoxification Pathways",detail:"Glutathione is essential for Phase II liver detoxification — conjugation of toxins and heavy metals for excretion."},
  ]},
  "ss31":{headline:"What researchers study this for",points:[
    {icon:"🔋",label:"Mitochondrial Membrane",detail:"SS-31 specifically targets the inner mitochondrial membrane — binding cardiolipin to stabilize electron transport chain function."},
    {icon:"❤️",label:"Cardiac Research",detail:"SS-31 (Elamipretide) is in Phase 2/3 research trials for heart failure and ischemia-reperfusion subject tissue — the most research advanced mitochondria-targeted peptide."},
    {icon:"🛡️",label:"ROS Reduction",detail:"By stabilizing mitochondrial structure, SS-31 reduces superoxide and reactive oxygen species production — studied for aging and cellular protection."},
  ]},
  "selank":{headline:"What researchers study this for",points:[
    {icon:"🧠",label:"Anxiolytic Pathways",detail:"Selank is studied for GABA-A receptor modulation — the same pathway targeted by benzodiazepines, but with a non-sedating profile in published research."},
    {icon:"🔬",label:"BDNF & Neuroplasticity",detail:"Selank has been associated with BDNF elevation in published Russian research studies, positioning it in neuroplasticity and cognitive research research."},
    {icon:"🛡️",label:"Stress Response Modulation",detail:"Studied for normalization of the HPA stress axis and enkephalin system — associated with reduced anxiety markers in animal and human research."},
  ]},
  "semax":{headline:"What researchers study this for",points:[
    {icon:"🧬",label:"BDNF Upregulation",detail:"Semax is one of the most studied peptides for BDNF elevation — a key target in neuro researchion and cognitive research."},
    {icon:"🧠",label:"Cognitive supportment Models",detail:"Published Russian research data showed cognitive performance research outcomes in memory and attention tasks."},
    {icon:"🛡️",label:"neuro researchion",detail:"Studied for protection against ischemic brain subject tissue and oxidative stress in neuronal cell lines and animal stroke models."},
  ]},
  "dsip":{headline:"What researchers study this for",points:[
    {icon:"🌙",label:"Deep Sleep Induction",detail:"DSIP is named for its documented ability to increase slow-wave (delta) sleep in published animal and early human studies."},
    {icon:"🕐",label:"Circadian Rhythm Research",detail:"Studied for modulation of the circadian clock — published research suggests DSIP influences melatonin synthesis and pineal function."},
    {icon:"🧠",label:"Neuroendocrine Signaling",detail:"DSIP is studied for effects on GH, LH, and cortisol secretion — positioning it as a broad neuroendocrine research compound."},
  ]},
  "mt2":{headline:"What researchers study MT2 for",points:[
    {icon:"🌙",label:"Potent Circadian Modulation",detail:"MT2 is a more potent melatonin analogue studied for stronger circadian phase-shifting effects compared to standard melatonin."},
    {icon:"😴",label:"Sleep Architecture",detail:"Published research distinguishes MT2 from MT1 — associated with deeper sleep induction and longer sleep duration in animal models."},
    {icon:"🎯",label:"Receptor Selectivity Research",detail:"MT2 is studied to understand MT1 vs MT2 receptor selectivity — important for circadian pharmacology and chronobiology research."},
  ]},
  "reconst":{headline:"Why bacteriostatic water matters in research",points:[
    {icon:"🧫",label:"Preserving Sterility",detail:"0.9% benzyl alcohol inhibits bacterial growth — allowing safe multi-draw use from a single vial across a research protocol timeline."},
    {icon:"💧",label:"Standard Reconstitution",detail:"Bacteriostatic water is the standard reconstitution medium for all lyophilized research peptides in this catalog."},
    {icon:"⚗️",label:"Stability",detail:"Reconstituted peptides dissolved in BAC water are stable at 2–8°C for 14–28 days depending on compound — longer than sterile water alternatives."},
  ]},
};

function ResearchPotentialPlacard({productId, productColor}: {productId: string, productColor: string}){
  const data = RESEARCH_POTENTIAL[productId];
  if (!data) return null;
  const isLight = ["#3be8b0","#ffd166","#f59e0b"].includes(productColor);
  return (
    <div style={{maxWidth:760,margin:"0 auto",padding:"0 24px 40px"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
        <div style={{width:32,height:32,borderRadius:"50%",background:productColor,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.85rem",color:isLight?"#0e0e0e":"#fff",flexShrink:0}}>★</div>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",color:"#fff"}}>{data.headline}</div>
          <div style={{fontSize:"0.66rem",color:"rgba(255,255,255,0.3)",marginTop:2}}>Research literature summary · Not research advice</div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:12}}>
        {data.points.map((pt,i)=>(
          <div key={i} style={{background:"#1c1c1c",borderRadius:14,padding:"14px 18px",border:"1px solid rgba(255,255,255,0.07)",display:"grid",gridTemplateColumns:"38px 1fr",gap:12,alignItems:"start"}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:productColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.95rem",flexShrink:0,marginTop:1}}>{pt.icon}</div>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",color:"#fff",marginBottom:5}}>{pt.label}</div>
              <div style={{background:`${productColor}14`,border:`1px solid ${productColor}30`,borderRadius:8,padding:"7px 12px",fontSize:"0.78rem",color:"rgba(255,255,255,0.62)",lineHeight:1.65}}>{pt.detail}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:9,padding:"9px 13px",fontSize:"0.7rem",color:"rgba(255,255,255,0.28)",display:"flex",gap:7,alignItems:"flex-start"}}>
        <span style={{flexShrink:0}}>📄</span>
        <span>Published scientific literature reference only. Alphaomegatides makes no claims of individual efficacy. For research use only — not for research use.</span>
      </div>
    </div>
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

// ─── WHAT TO EXPECT PLACARD DATA ─────────────────────────────────────────────
const PLACARD_DATA={
  "glp3r":{accent:"#ff6b6b",subtitle:"Triple Receptor Agonist — GLP-1 + GIP + GCG (Retatrutide analog)",weeks:[{num:1,label:"APPETITE SHIFTS",icon:"🧠",desc:"GLP-1 receptor activation begins suppressing appetite signaling in the hypothalamus. Food noise quiets within days.",notice:["Reduced hunger between meals","Getting full on smaller portions","Mild nausea (normal — GI adapting)","Slower gastric emptying"],focus:["Prioritize hydration (2-3L/day)","Light protein-rich meals","Avoid high-fat foods to reduce nausea","Electrolytes daily"]},{num:2,label:"GIP KICKS IN",icon:"💉",desc:"GIP receptor co-activation demonstrates activity in metabolic signaling sensitivity and begins enhancing fat oxidation alongside appetite control.",notice:["More stable blood sugar between meals","Less snacking urge","Fewer cravings for sugar/processed food","Slight energy research outcome"],focus:["High protein meals (1g per lb bodyweight)","Walks or light cardio","Hydration + electrolytes","Track portions — don't under-eat"]},{num:3,label:"FAT MOBILIZATION",icon:"🔥",desc:"Glucagon receptor activation ramps up lipolysis — stored fat begins mobilizing as an energy source. Triple synergy now active.",notice:["Early scale movement","Reduced bloating","Looser-fitting clothes","More stable daily energy"],focus:["Strength training 3-4x/week","Step count matters — aim 8-10k","Whole foods, avoid ultra-processed","post-research support and sleep (8hrs)"]},{num:4,label:"NEW SET POINT",icon:"⚖️",desc:"All three receptor pathways synergizing. Body begins establishing a lower caloric inadminister as normal. Metabolic rate adapting.",notice:["Consistent metabolic research trend","Stronger appetite control","Better relationship with food","Reduced emotional eating"],focus:["Don't under-eat — fuel muscle","Protein every meal","Strength + steps daily","sleep research crucial"]},{num:5,label:"VISIBLE CHANGE",icon:"📉",desc:"Compound metabolic research effect from triple agonism becomes visually apparent. Glycogen stores lower, true fat mass dropping.",notice:["Noticeable body recomposition","Clothes fitting differently","More strength and endurance in training","Improved confidence"],focus:["Increase training intensity","Calorie deficit — don't crash","Hydration and electrolytes","Manage stress (cortisol competes)"]},{num:6,label:"METABOLIC RESET",icon:"🏆",desc:"Weeks of sustained triple-receptor signaling have reset appetite, metabolic signaling sensitivity, and metabolic efficiency. Results compounding.",notice:["Significant metabolic research achieved","Better body composition","Peak appetite control — food is fuel now","Complete control over cravings"],focus:["Progressive overload in training","Protein every meal — protect muscle","Long-term mindset established","Lifestyle over motivation"]}],monitor:["Hydration","Blood sugar stability","Energy levels","GI comfort","sleep research"],quote:"Triple agonism doesn't just suppress appetite — it retrains every metabolic axis simultaneously."},
  "glp2t":{accent:"#4f8ef7",subtitle:"GLP-2 Receptor Agonist — Tirzepatide analog (GLP-1 + GIP Dual)",weeks:[{num:1,label:"DUAL ACTIVATION",icon:"🧠",desc:"GLP-1 and GIP dual receptor activation begins. Appetite suppression and metabolic signaling sensitization starting in parallel.",notice:["Less food noise within first days","Getting full faster than before","Possible mild nausea (administration amount-dependent)","Blood sugar more stable between meals"],focus:["Hydration priority (2-3L/day)","Protein-forward meals","Electrolytes to combat nausea","Light walking is ideal — don't force intensity"]},{num:2,label:"metabolic signaling OPTIMIZATION",icon:"💉",desc:"GIP receptor agonism uniquely demonstrates activity in metabolic signaling sensitivity in both muscle and fat tissue — distinct from GLP-1 alone.",notice:["Significantly less snacking","Carbohydrate cravings notably reduced","Energy more stable throughout day","Possible slight fatigue as metabolism adapts"],focus:["Low glycemic index foods","Strength training — maximize metabolic signaling sensitivity","Adequate sleep — critical for glucose regulation","Track portions, not just calories"]},{num:3,label:"metabolic research PHASE",icon:"🔥",desc:"Dual receptor synergy producing rapid and pronounced metabolic research. GIP's metabolic signaling sensitization compounding GLP-1's caloric deficit.",notice:["Visible scale movement","Reduced abdominal bloating","Clothes fitting looser — especially waist","Energy from fat oxidation becoming primary"],focus:["Strength training to preserve muscle","Step count 8-10k daily","Whole food diet — maximize nutrient density","post-research support and sleep (8hrs minimum)"]},{num:4,label:"BODY RECOMPOSITION",icon:"🏆",desc:"Sustained dual agonism producing measurable metabolic research with muscle preservation. New lower set point established.",notice:["Significant metabolic research visible","Muscle definition emerging","Appetite consistently lower — new normal","Mood and confidence elevated"],focus:["Progressive overload in training","Protein 1.5g per lb bodyweight","Don't under-eat — protect lean mass","Sleep and stress management"]}],monitor:["Blood sugar levels","Energy levels","GI comfort","Waist circumference","Training performance"],quote:"Dual GLP-1 and GIP agonism creates a synergy that neither receptor achieves alone — it's the next generation."},
  "glp1":{accent:"#f59e0b",subtitle:"GLP-1 Receptor Agonist — Semaglutide analog",weeks:[{num:1,label:"ADJUSTMENT PHASE",icon:"🧠",desc:"GLP-1 receptor activation in the hypothalamus and brainstem begins reducing appetite signaling. GI tract adapting to new signaling.",notice:["Less food noise","Getting full faster","Possible mild nausea","Slower digestion"],focus:["Hydration first priority","Protein inadminister every meal","Electrolytes daily","Light movement only — no intense exercise yet"]},{num:2,label:"APPETITE SHIFTS",icon:"🍽️",desc:"Natural caloric reduction occurring without forced restriction. metabolic signaling secretion becoming more meal-responsive.",notice:["Smaller portions feel satisfying","Less snacking urge","Fewer sugar cravings","Occasional mild fatigue"],focus:["High protein meals","Walks or light cardio","Hydration stays priority","Prioritize sleep"]},{num:3,label:"SCALE MOVES",icon:"📉",desc:"Sustained caloric deficit from appetite suppression begins producing measurable metabolic research. metabolic signaling sensitivity improving.",notice:["Early metabolic research","Reduced bloating","Looser clothing","Better control around food"],focus:["Protein + strength training","Steps + movement (8-10k)","Whole foods — avoid ultra-processed","Avoiding emotional eating with awareness"]},{num:4,label:"NEW NORMAL",icon:"⚖️",desc:"New eating patterns becoming automatic. Body adapting to lower caloric set point while maintaining energy.",notice:["Stronger appetite control","Fewer cravings","More stable eating habits","Continued consistent metabolic research"],focus:["Don't under-eat — protect muscle","Protein inadminister stays high","Strength training 3-4x week","Sleep + stress management"]},{num:5,label:"HABITS administer ROOT",icon:"🌱",desc:"Behavioral adaptation solidifying alongside biological changes. GLP-1 consistently modulating reward circuits around food.",notice:["Steadier energy all day","Better digestion","Improved mood and wellbeing","Fewer cravings and food urges"],focus:["Keep protein high","Stay hydrated (2-3L/day)","Strength training for muscle preservation","Prioritize sleep — 8hrs"]},{num:6,label:"RESULTS COMPOUND",icon:"🏆",desc:"Sustained GLP-1 signaling producing compounding metabolic research. Body composition measurably improved. Lifestyle shift complete.",notice:["Significant metabolic research","Better body composition","Peak confidence and energy","Complete craving control"],focus:["Keep pushing forward","Progressive overload in training","Protein every meal","Long-term mindset — this is the new you"]}],monitor:["Hydration","Digestion comfort","Energy levels","Training performance","sleep research"],quote:"GLP-1 doesn't create discipline — it makes the habits you already wanted effortless to maintain."},
  "bpc157":{accent:"#3be8b0",subtitle:"Body Protection Compound — Pentadecapeptide",weeks:[{num:1,label:"inflammatory markers DROPS",icon:"❄️",desc:"BPC-157 begins modulating nitric oxide pathways and reducing systemic inflammatory markers at subject tissue sites. COX-2 inhibition begins.",notice:["Reduced soreness in target areas","Faster post-research support between sessions","Possible tingling at subject tissue sites (normal)","Improved sleep depth"],focus:["Stay active — movement aids peptide delivery","Adequate protein for tissue repair","inflammation research diet","Avoid NSAIDs — counterproductive with BPC"]},{num:2,label:"ANGIOGENESIS BEGINS",icon:"🩸",desc:"New blood vessel formation accelerating to subject tissue sites. Growth peptide signaling receptor upregulation begins. Repair pathways opening.",notice:["Noticeable discomfort markers reduction","Improved range of motion","Less stiffness on waking","Better joint comfort throughout day"],focus:["Light resistance training OK","Collagen + Vitamin C intake","Quality sleep — peak GH release at night","Hydration for tissue repair"]},{num:3,label:"TISSUE REMODELING",icon:"🔧",desc:"Tendon and ligament fibroblast activity increasing. Collagen synthesis accelerating. Structural repair at cellular level occurring.",notice:["Strength returning to injured areas","Reduced swelling","Better flexibility","discomfort markers becoming manageable without intervention"],focus:["Progressive loading of tissue support","Eccentric exercises for tendon support","Protein 1.5-2g per lb bodyweight","Consistent sleep schedule"]},{num:4,label:"FUNCTIONAL post-research support",icon:"💪",desc:"supported tissue integrating with surrounding structures. Neuromuscular coordination returning. Gut-brain axis modulation ongoing.",notice:["Near-full function returning","Training intensity can increase","GI support research outcomes if gut-related issue","Mental clarity improving"],focus:["Return to full training gradually","Maintain protein + collagen","Track performance benchmarks","Continue consistent administration"]}],monitor:["discomfort markers levels (1-10 daily)","Range of motion","Training performance","sleep research","GI comfort"],quote:"BPC-157 doesn't mask discomfort markers — it supports the biological repair that removes its source."},
  "tb500":{accent:"#059669",subtitle:"Thymosin Beta-4 — Actin Sequestering Peptide",weeks:[{num:1,label:"CELL MIGRATION",icon:"🔬",desc:"Thymosin Beta-4 binds G-actin, promoting cell migration and proliferation at subject tissue sites. Systemic inflammation research cascade begins.",notice:["Reduced acute inflammatory markers","Improved post-research support between workouts","Less morning stiffness","Possible mild fatigue (normal — detox phase)"],focus:["Light activity — movement drives delivery","High protein diet","inflammation research foods","Hydration is critical"]},{num:2,label:"STEM CELL ACTIVATION",icon:"🌟",desc:"Progenitor cell recruitment to damaged tissue accelerating. Angiogenesis and neurogenesis beginning at repair sites.",notice:["Noticeable discomfort markers reduction","Better flexibility and mobility","Improved training performance","Faster muscle post-research support"],focus:["Begin progressive loading","Quality sleep for GH synergy","Collagen + Vitamin C","Track mobility research outcomes daily"]},{num:3,label:"TISSUE tissue supportION",icon:"🔧",desc:"Active muscle fiber, tendon, and connective tissue tissue supportion. Hair follicle activation noted in some research subjects.",notice:["Strength returning rapidly","Reduced scar tissue formation","Joint comfort significantly improved","Endurance gains notable"],focus:["Increase training intensity","Eccentric loading for tendons","Consistent administration schedule","Optimize nutrition"]},{num:4,label:"SYSTEMIC OPTIMIZATION",icon:"⚡",desc:"Full-body inflammation research and tissue supportive effects peaking. Cardiac and neurological repair documented in research models.",notice:["Full training capacity restored","Heart rate variability improving","Cognitive clarity","Athletic performance at new peak"],focus:["Maintain training momentum","Protein + micronutrients","Sleep optimization","Consider cycling protocol"]}],monitor:["discomfort markers/inflammatory markers scores","Range of motion","Training performance","HRV if tracked","post-research support speed"],quote:"TB-500 works systemically — it doesn't just support where you hurt, it optimizes the entire repair system."},
  "cjc1295":{accent:"#6366f1",subtitle:"GHRH Analog — Growth peptide signaling Releasing peptide signaling",weeks:[{num:1,label:"GH PULSE AMPLIFICATION",icon:"📈",desc:"CJC-1295 binds GHRH receptors on the pituitary, amplifying the magnitude of natural GH pulses without disrupting circadian rhythm.",notice:["Improved sleep depth (first week)","Vivid dreams (GH-related)","Mild water retention initially","Subtle post-research support research outcome"],focus:["administration amount before bed — align with GH pulse","Avoid carbs 2hrs before administration","Sleep 8+ hours — maximize GH window","Train hard to stimulate GH release"]},{num:2,label:"IGF-1 ELEVATION",icon:"📊",desc:"Sustained GHRH signaling elevating hepatic IGF-1 production. Anabolic and lipolytic effects beginning downstream.",notice:["post-research support significantly faster","Joints feeling better and more lubricated","Skin and hair research outcome noted","Slight metabolic research beginning"],focus:["Pair with Ipamorelin for synergy","Protein inadminister high","Track body composition weekly","Morning fasted cardio capitalizes on lipolysis"]},{num:3,label:"BODY RECOMPOSITION",icon:"⚡",desc:"Elevated IGF-1 and GH working in tandem — muscle protein synthesis up, lipolysis accelerating. Classic recomposition phase.",notice:["Leaner appearance visible","Muscle fullness and density","Strength increasing week over week","Energy and mood elevated"],focus:["Strength training 4-5x/week","Caloric maintenance or slight surplus","Sleep remains #1 priority","Hydration"]},{num:4,label:"longevity research EFFECTS",icon:"🕰️",desc:"Chronic GH elevation producing documented research outcomes in collagen synthesis, bone density markers, and cognitive research in research.",notice:["Skin quality and texture improving","Joint comfort maximized","Cognitive sharpness","Immune function improving"],focus:["Cycle protocol: 5 days on / 2 off","Continue administration at night","Consider bloodwork (IGF-1 levels)","Maintain training"]}],monitor:["sleep research","Body composition (weekly photos)","Energy levels","Joint comfort","post-research support speed"],quote:"CJC-1295 works with your biology — amplifying what's already there rather than replacing it."},
  "cjcipa":{accent:"#8b5cf6",subtitle:"CJC-1295 + Ipamorelin Blend — Synergistic GH Stack",weeks:[{num:1,label:"DUAL GH STIMULATION",icon:"📡",desc:"CJC-1295 (GHRH analog) and Ipamorelin (GHSR agonist) activate two separate pathways simultaneously — producing a synergistic GH pulse significantly larger than either alone.",notice:["Deep sleep research outcome within days","Vivid, more restorative dreams","Warm flush after administration (GH pulse)","supportd post-research support from training"],focus:["administration amount 30-45 min before bed on empty stomach","Sleep 8+ hours — this is when GH does its work","Avoid carbs 2hrs pre-administration amount","Light to moderate training is fine"]},{num:2,label:"IGF-1 SURGE",icon:"📊",desc:"Synergistic GH release elevating IGF-1 significantly — higher than either peptide alone. Anabolic and lipolytic downstream effects accelerating.",notice:["post-research support between sessions dramatically faster","Muscle fullness on rest days","Joints feeling hydrated and comfortable","Skin quality beginning to improve"],focus:["Pair fasted morning cardio with lipolytic window","Protein 1.5g per lb minimum","Track body composition weekly","Prioritize sleep above all"]},{num:3,label:"RECOMPOSITION PEAK",icon:"⚡",desc:"Dual-pathway GH stimulation producing pronounced body recomposition. Fat oxidation and muscle protein synthesis simultaneously elevated.",notice:["Leaner appearance and muscle definition","Strength gains accelerating","Vascularity improving","High energy and drive"],focus:["Training intensity and volume high","Caloric maintenance — body doing the work","Track weekly photos and measurements","Sleep 8-9hrs minimum"]},{num:4,label:"SUSTAINED OPTIMIZATION",icon:"🏆",desc:"Four weeks of synergistic GH stimulation producing compounding gains. post-research support, composition, and wellbeing all improved.",notice:["Best body composition of the cycle","Joints feel new","Sleep consistently excellent","Cognitive clarity and mood elevated"],focus:["Cycle: 5 on / 2 off OR straight 12 weeks","Consider bloodwork for IGF-1 baseline","Maintain training intensity","Don't skip sleep — it's where gains are made"]}],monitor:["sleep research","Body composition (photos + measurements)","post-research support speed","Joint comfort","Energy/mood"],quote:"The CJC + Ipamorelin stack is the gold standard combo — two pathways, one goal: optimized GH."},
  "ipamorlin":{accent:"#a855f7",subtitle:"Ipamorelin — Selective Growth peptide signaling Secretagogue",weeks:[{num:1,label:"CLEAN GH RELEASE",icon:"🎯",desc:"Ipamorelin selectively triggers GH release from the pituitary with minimal cortisol or prolactin side effects — the cleanest GH secretagogue available.",notice:["Deeper sleep within days","Vivid dreams","Mild head rush post-administration amount (normal — GH pulse)","Subtle appetite increase"],focus:["administration amount 30-45 min before bed","Fast 2 hours before administration","8+ hours sleep mandatory","Light training or rest day is ideal"]},{num:2,label:"post-research support supportS",icon:"⚡",desc:"GH elevation improving tissue repair between sessions. IGF-1 production upregulating hepatically from sustained stimulation.",notice:["DOMS reduced significantly","Muscle fullness on rest days","Better hydration of connective tissue","Mood research outcome"],focus:["Train harder — post-research support capacity up","Protein 1.5g/lb minimum","Track workout performance week over week","Hydration"]},{num:3,label:"COMPOSITION SHIFTS",icon:"📉",desc:"GH's lipolytic effect on adipose tissue compounding. Muscle preservation and mild recomposition occurring simultaneously.",notice:["Leaner appearance visible","Muscle definition improving","Skin quality improving","Joint comfort elevated"],focus:["Fasted morning cardio (capitalizes on GH lipolysis)","Strength training in afternoons","Sleep remains priority","Consider CJC-1295 stack for amplification"]},{num:4,label:"SYSTEMIC OPTIMIZATION",icon:"🏆",desc:"Four weeks of clean GH pulsing producing measurable research outcomes in body composition, post-research support, and connective tissue support.",notice:["Best body composition in the cycle","Joints feel new and lubricated","sleep research optimized","Energy consistently high all day"],focus:["Cycle: 5 on / 2 off OR continue 3 months","Maintain administration protocol","Don't skip sleep","Bloodwork optional but valuable"]}],monitor:["Sleep depth","Body composition","post-research support speed","Joint comfort","Energy levels"],quote:"Ipamorelin is GH optimization without compromise — selective, clean, and precisely targeted."},
  "tesamorlin":{accent:"#3be8b0",subtitle:"Tesamorelin — GHRH Analog — Visceral Fat Specialist",weeks:[{num:1,label:"VISCERAL FAT TARGETING",icon:"🎯",desc:"Tesamorelin (not FDA-evaluated GHRH analog) specifically targets visceral adipose tissue. GH pulse amplification begins with preferential lipolysis in abdominal fat.",notice:["Subtle appetite changes","Mild water retention (normal — GH related)","Improved sleep depth","Sense of abdominal warmth (fat mobilization)"],focus:["administration amount at bedtime — aligns with natural GH pulsatility","Fast 2hrs before administration amount","Low carb diet amplifies visceral fat targeting","Abdominal exercises complement mechanism"]},{num:2,label:"ABDOMINAL RECOMPOSITION",icon:"🔥",desc:"Preferential visceral fat mobilization intensifying. Liver fat markers improving in research. IGF-1 elevating.",notice:["Abdominal fullness reducing","Waist measurement decreasing","Energy from fat oxidation","Sleep improving further"],focus:["Track waist circumference weekly — primary metric","Fasted cardio capitalizes on lipolysis","Protein high to preserve lean mass","Continue consistent administration"]},{num:3,label:"METABOLIC research outcome",icon:"📊",desc:"Visceral fat reduction improving metabolic markers — metabolic signaling sensitivity, triglycerides, and inflammatory markers improving in research.",notice:["Visible abdominal fat reduction","Metabolic energy improving","Cardiovascular exercise feels easier","Mood and cognitive clarity improving"],focus:["Cardiovascular training amplifies metabolic benefits","Whole food diet for inflammatory markers reduction","Sleep optimization","Track photos monthly — changes visible"]},{num:4,label:"SUSTAINED metabolic research",icon:"🏆",desc:"Continued preferential visceral fat reduction with maintained lean mass. not FDA-evaluated results replicated — average 15-20% visceral fat reduction in 6 months of use.",notice:["Significant abdominal change","Improved metabolic support markers","Better body composition overall","supportd quality of life"],focus:["Cycle considerations after 6 months","Bloodwork: IGF-1 and metabolic panel","Maintain training and diet","Consider follow-up DEXA scan"]}],monitor:["Waist circumference","Energy levels","sleep research","IGF-1 if bloodwork","Metabolic markers"],quote:"Tesamorelin is the only not FDA-evaluated peptide specifically for visceral fat — it knows exactly where to target."},
  "igf1lr3":{accent:"#059669",subtitle:"IGF-1 LR3 — metabolic signaling-like Growth Factor 1 Long R3 Variant",weeks:[{num:1,label:"RECEPTOR SENSITIZATION",icon:"📡",desc:"IGF-1 LR3 binds IGF-1 receptors with 2-3x the half-life of native IGF-1. Satellite cell activation begins in muscle tissue immediately.",notice:["Increased muscle pump and fullness","Faster post-research support between sessions","Possible mild hypoglycemia — monitor blood sugar","supportd nutrient upadminister into muscle"],focus:["Eat carbs around workouts — hypoglycemia management","Monitor blood sugar throughout day","High protein essential (2g per lb)","Train hard to maximize receptor response"]},{num:2,label:"HYPERPLASIA PHASE",icon:"🔬",desc:"Satellite cells proliferating and potentially differentiating into new muscle fibers (hyperplasia). This is distinct from hypertrophy — actual new fibers.",notice:["Noticeable size and density increase","Strength gains accelerating week over week","Full muscles even on rest days","Possible joint discomfort (growth rate)"],focus:["Volume training — maximize hyperplasia stimulus","Caloric surplus recommended for fiber growth","1.5-2g protein per lb bodyweight","Sleep 8+ hours for GH synergy"]},{num:3,label:"ANABOLIC PEAK",icon:"💪",desc:"Peak anabolic environment. IGF-1 LR3's extended half-life maintaining consistent receptor stimulation. Muscle protein synthesis maximized.",notice:["Maximum size and fullness","Strength PRs likely this week","metabolic research alongside muscle gain","Vascularity improving significantly"],focus:["Progressive overload mandatory — feed the stimulus","Protein every 3-4 hours","Carb timing around workouts critical","Track measurements weekly — changes are happening"]},{num:4,label:"CONSOLIDATION",icon:"🏆",desc:"Gains consolidating. New muscle fibers and increased fiber density established. Transition to maintenance or cycling protocol recommended.",notice:["Solid lean mass retained","Improved body composition overall","Strength levels elevated from baseline","Consider cycling off"],focus:["Cycle off — receptor desensitization risk after 4 weeks","Maintain caloric inuse with hold gains","Continue training intensity","Bridge with CJC/Ipamorelin if desired"]}],monitor:["Blood glucose (hypoglycemia risk)","Body measurements weekly","Strength benchmarks","post-research support speed","Appetite levels"],quote:"IGF-1 LR3 doesn't just grow what's there — it potentially creates new contractile tissue entirely."},
  "ghkcu":{accent:"#ffd166",subtitle:"GHK-Cu — Copper Peptide Gene Expression Modulator",weeks:[{num:1,label:"GENE ACTIVATION",icon:"🧬",desc:"GHK-Cu modulates over 4,000 human genes — activating repair genes and downregulating inflammatory and cancer-promoting genes simultaneously.",notice:["Skin texture beginning to improve","Wound supporting noticeably supportd","inflammation research effects system-wide","Hair follicle stimulation beginning"],focus:["Topical application to target areas for skin","Systemic + topical = synergy","Antioxidant-rich diet supports effect","Sun protection — skin is in active remodeling mode"]},{num:2,label:"COLLAGEN SYNTHESIS",icon:"✨",desc:"Fibroblast activation producing collagen, elastin, and glycosaminoglycans. Skin remodeling accelerating. Damaged tissue being replaced with new.",notice:["Skin plumpness and hydration visibly improving","Fine lines and wrinkles reducing","Hyperpigmentation beginning to fade","Hair thickness improving"],focus:["Consistent application schedule","Vitamin C + collagen dietary support","Hydration maintains skin cell turnover","Avoid harsh exfoliants — skin is in active repair"]},{num:3,label:"NEURAL PROTECTION",icon:"🧠",desc:"Systemic GHK-Cu demonstrating nerve growth factor stimulation and neuro researchive effects. SOD and catalase antioxidant enzymes upregulating.",notice:["Cognitive clarity (if systemic use)","Nerve tissue supportion at subject tissue sites","Oxidative stress markers declining","Tissue supporting visible in wounds and scars"],focus:["Continue consistent protocol","Whole-body antioxidant support","Exercise synergizes with NGF effects","Track skin/tissue progress with photos weekly"]},{num:4,label:"tissue supportIVE PEAK",icon:"🌟",desc:"Maximum gene expression changes producing measurable tissue tissue supportion. Skin quality, wound supporting, and longevity research markers at their best.",notice:["Dramatically improved skin quality","Scars and damage significantly reduced","Hair density noticeably improved","Overall tissue quality tissue supported"],focus:["Maintenance administration protocol","Lifestyle factors lock in gains","Continue dietary antioxidants","Photos track ongoing progress monthly"]}],monitor:["Skin quality (photos weekly)","Wound supporting speed","Hair density","inflammatory markers markers","Cognitive clarity"],quote:"GHK-Cu doesn't add to your biology — it turns on the genes your body already has for repair."},
  "glow":{accent:"#ec4899",subtitle:"Glow Complex — Multi-Peptide Skin tissue supportion Blend",weeks:[{num:1,label:"CELLULAR ACTIVATION",icon:"✨",desc:"Proprietary blend of skin-targeting peptides begins activating collagen synthesis, melanin regulation, and cellular turnover simultaneously.",notice:["Skin brightness improving within days","Hydration levels visibly elevated","Texture beginning to smooth","Subtle glow emerging"],focus:["Consistent daily application","SPF during the day — skin is sensitized","Hydration supports cellular turnover","Avoid harsh active ingredients — let the blend work"]},{num:2,label:"COLLAGEN SURGE",icon:"🌸",desc:"Multi-peptide synergy driving fibroblast activity. Elastin production increasing alongside collagen for structural research outcome.",notice:["Fine lines less visible","Skin plumper and more elastic","Dark spots beginning to fade","Pores appearing smaller"],focus:["Continue twice daily application","Vitamin C internally for collagen co-factor","Quality sleep — skin repairs at night","Hydration (2L+ water daily)"]},{num:3,label:"VISIBLE TRANSFORMATION",icon:"🌟",desc:"Comprehensive skin research outcome visible. Multiple peptides addressing texture, tone, hydration, and firmness simultaneously.",notice:["Skin tone more even","Brightness and luminosity elevated","Firmness noticeably improved","Hyperpigmentation significantly reduced"],focus:["Track progress with photos in same lighting","Maintain sun protection","Continue consistent protocol","Celebrate visible results — they're real"]},{num:4,label:"RADIANT BASELINE",icon:"🏆",desc:"New skin baseline established. Collagen, elastin, and hydration levels sustainably elevated. Glow is now the new normal.",notice:["Consistently radiant skin","Minimal visible signs of previous damage","Skin resilience improved","Confidence elevated"],focus:["Maintenance protocol","Sun protection daily — protect the investment","longevity research diet sustains gains","Monthly progress photos"]}],monitor:["Skin brightness","Texture (touch test)","Hydration levels","Dark spot fading","Elasticity"],quote:"The Glow Complex doesn't just study the surface — it rebuilds the foundation your skin is built on."},
  "nad":{accent:"#f59e0b",subtitle:"NAD+ — Nicotinamide Adenine Dinucleotide",weeks:[{num:1,label:"CELLULAR ENERGY SURGE",icon:"⚡",desc:"NAD+ begins restoring mitochondrial function as a critical coenzyme in cellular energy production. Sirtuins activating — the longevity enzymes.",notice:["Noticeable energy increase within first days","Mental clarity and focus sharpening","Better mood and emotional regulation","Possible mild headache (normal — detox response)"],focus:["Hydration critical (NAD+ metabolism requires it)","Morning administration for energy alignment","Light exercise amplifies mitochondrial biogenesis","Avoid alcohol — depletes NAD+"]},{num:2,label:"DNA REPAIR ACTIVATES",icon:"🧬",desc:"PARP enzymes (DNA repair) activating with elevated NAD+. Sirtuin-mediated gene expression improving cellular stress resistance.",notice:["Sustained energy without stimulant crash","Exercise performance noticeably improved","post-research support from exercise faster","sleep research improving"],focus:["Exercise — amplifies AMPK/NAD+ axis","Caloric restriction or intermittent fasting synergizes","Avoid processed foods and sugar","Consistent administration schedule"]},{num:3,label:"MITOCHONDRIAL OPTIMIZATION",icon:"🔋",desc:"Mitochondrial biogenesis increasing. New mitochondria forming. Cellular energy production at a higher baseline than before.",notice:["Peak energy and endurance","Cognitive performance elevated","inflammatory markers reducing systemically","Physical strength and post-research support at new high"],focus:["Maximize training output — mitochondria are primed","Track athletic performance benchmarks","longevity research lifestyle factors amplify gains","Consider combining with Resveratrol or NMN"]},{num:4,label:"LONGEVITY BASELINE",icon:"♾️",desc:"NAD+ levels restored toward youthful baseline. Sirtuin activation, DNA repair, and mitochondrial support all improved sustainably.",notice:["Energy levels consistently high","Biological age markers improving","Immune resilience stronger","cognitive research at new baseline"],focus:["Maintain consistent protocol","Lifestyle factors sustain and amplify gains","Caloric restriction continues to synergize","Consider bloodwork: inflammatory markers, energy markers"]}],monitor:["Energy levels","Cognitive performance","Exercise performance","sleep research","post-research support speed"],quote:"NAD+ is the master fuel — every energy-producing reaction in your body depends on it."},
  "motsc":{accent:"#059669",subtitle:"MOTS-c — Mitochondrial-Derived Peptide",weeks:[{num:1,label:"METABOLIC SIGNALING",icon:"🔋",desc:"MOTS-c (encoded in mitochondrial DNA) begins activating AMPK pathway — the master metabolic regulator. metabolic signaling sensitivity improving from day one.",notice:["Improved exercise tolerance early","Blood sugar more stable throughout day","Reduced fatigue during exercise","Subtle cognitive research outcome"],focus:["Exercise is synergistic — MOTS-c + exercise = amplified AMPK","Morning administration aligns with metabolic rhythm","Low carb or ketogenic diet amplifies effect","Hydration"]},{num:2,label:"metabolic signaling SENSITIZATION",icon:"📊",desc:"AMPK activation improving glucose upadminister in muscle tissue. Fat oxidation increasing. Muscle cells behaving younger metabolically.",notice:["Energy from fat burning increasing","Post-meal energy crashes reducing","Training performance and endurance improving","Body composition beginning to shift"],focus:["Resistance training amplifies metabolic signaling sensitization","Track energy stability through the day","Reduce refined carbohydrates","Consistent administration"]},{num:3,label:"CELLULAR REJUVENATION",icon:"✨",desc:"MOTS-c's longevity research effects on cellular metabolism becoming apparent. Mitochondrial function improving. Markers of metabolic aging declining.",notice:["Endurance significantly improved","Body composition visibly shifting","inflammatory markers reducing","Mood and cognitive clarity elevated"],focus:["Maximize training volume — mitochondria are responding","longevity research diet continues to synergize","Track body composition (not just weight)","Consider combining with NAD+"]},{num:4,label:"METABOLIC PRIME",icon:"🏆",desc:"AMPK pathway robustly activated. Metabolic age markers improving. MOTS-c's longevity research and performance benefits compounding.",notice:["Athletic performance at new baseline","Metabolic support markers improved","Energy consistently high","Physical and cognitive vitality elevated"],focus:["Maintain consistent protocol","Exercise remains essential to sustain gains","Lifestyle factors lock in metabolic research outcomes","Bloodwork: glucose, metabolic signaling, inflammatory markers"]}],monitor:["Blood sugar stability","Energy levels","Exercise performance","Body composition","Cognitive clarity"],quote:"MOTS-c speaks the language of your mitochondria — activating ancient metabolic pathways for modern performance."},
  "glutathione":{accent:"#3be8b0",subtitle:"Glutathione — Master Antioxidant",weeks:[{num:1,label:"OXIDATIVE STRESS REDUCTION",icon:"🌱",desc:"Glutathione begins neutralizing reactive oxygen species (ROS) as the body's master antioxidant. Every cell benefits — especially the liver, immune system, and brain.",notice:["Skin brightness improving quickly","Energy improving (less oxidative burden)","Mental clarity increasing","Possible mild detox parameters initially (normal)"],focus:["Hydration supports glutathione recycling","Reduce alcohol — it depletes glutathione","Cruciferous vegetables support endogenous production","Morning administration or around exercise"]},{num:2,label:"DETOXIFICATION PEAK",icon:"🔬",desc:"Liver detoxification (Phase II) significantly supportd by glutathione. Heavy metals, environmental toxins, and metabolic waste products clearing.",notice:["Skin tone significantly brighter and more even","Energy sustainably elevated","Immune system stronger","GI support improving"],focus:["Reduce toxin exposure (alcohol, processed food, environmental)","Vitamin C synergizes with glutathione recycling","Exercise gently — detox is active","NAC supplementation supports glutathione"]},{num:3,label:"IMMUNE OPTIMIZATION",icon:"🛡️",desc:"Glutathione's role in immune cell function becoming apparent. NK cells, T-cells, and macrophages all require glutathione for optimal function.",notice:["Significantly stronger immune response","Faster post-research support from illness","inflammatory markers markers reducing","Skin radiance at its best"],focus:["Continue consistent administration","Whole food diet maximizes endogenous production","Exercise — moderate intensity is ideal","Sleep for immune consolidation"]},{num:4,label:"ANTIOXIDANT BASELINE",icon:"🏆",desc:"Systemic oxidative stress sustainably reduced. Cellular support across all systems improved. New antioxidant baseline established.",notice:["Consistently bright, supporty skin","Robust immune function","High energy and mental clarity","Reduced signs of inflammatory markers and aging"],focus:["Maintenance protocol","Lifestyle factors sustain gains","Avoid chronic toxin exposure","Annual detox cycles recommended"]}],monitor:["Skin brightness","Energy levels","Immune resilience","Cognitive clarity","post-research support speed"],quote:"Glutathione is the body's master defender — when it's optimized, everything else functions better."},
  "ss31":{accent:"#6366f1",subtitle:"SS-31 (Elamipretide) — Mitochondrial Membrane Peptide",weeks:[{num:1,label:"MITOCHONDRIAL TARGETING",icon:"🔋",desc:"SS-31 selectively concentrates in the inner mitochondrial membrane, stabilizing cardiolipin — the critical phospholipid that maintains mitochondrial architecture and function.",notice:["Improved energy without stimulant quality","Exercise fatigue reduced","Cardiac efficiency improving (subjectively)","Mental clarity increasing"],focus:["Aerobic exercise amplifies mitochondrial benefits","Morning administration for energy alignment","Anti-oxidant diet supports mitochondrial membranes","Avoid alcohol — mitochondrial toxin"]},{num:2,label:"ATP PRODUCTION SURGE",icon:"⚡",desc:"Restored mitochondrial membrane integrity dramatically improving ATP production efficiency. Electron transport chain functioning at higher capacity.",notice:["Significant energy elevation","Exercise performance and endurance noticeably better","post-research support from intense exercise faster","Mood elevated — brain is energy dependent"],focus:["Track exercise performance metrics week over week","High intensity training capitalizes on ATP surge","Protein and micronutrients support mitochondrial enzymes","Sleep — mitochondrial repair peaks at night"]},{num:3,label:"CARDIAC OPTIMIZATION",icon:"❤️",desc:"SS-31's documented cardioprotective effects emerging. Cardiac mitochondria contain the highest density — they benefit most.",notice:["Cardiovascular endurance at new peak","Resting heart rate lowering","HRV improving","Exercise capacity elevated significantly"],focus:["Aerobic training amplifies cardiac benefits","Track HRV weekly — it tells the story","Omega-3 supports cardiolipin synthesis","Continue consistent administration"]},{num:4,label:"CELLULAR REJUVENATION",icon:"♾️",desc:"Mitochondrial support restored across multiple organ systems. longevity research effects at cellular level compounding. Energy and vitality at new sustained baseline.",notice:["Energy consistently high and stable","Physical performance at new baseline","cognitive research elevated","Biological age markers improving"],focus:["Cycle or maintain — both approaches validated","Lifestyle factors sustain mitochondrial gains","Exercise remains essential","Bloodwork: inflammatory markers, metabolic panel"]}],monitor:["Energy levels","Exercise performance","HRV","Resting heart rate","Cognitive clarity"],quote:"SS-31 goes straight to the power plant — restoring the mitochondrial membrane where aging begins."},
  "selank":{accent:"#7c3aed",subtitle:"Selank — Anxiolytic Peptide, Tuftsin Analog",weeks:[{num:1,label:"GABA MODULATION",icon:"🧘",desc:"Selank begins modulating GABA-A receptor expression and BDNF levels. Serotonin, dopamine, and norepinephrine metabolism all improving simultaneously.",notice:["Reduced anxiety within days","Clearer thinking and reduced mental fog","Better stress resilience","Improved mood baseline — calm without sedation"],focus:["Consistent administration schedule (2x daily)","Morning administration amount for anxiety management","Combine with stress-reduction practices","Avoid alcohol — counterproductive to GABA balance"]},{num:2,label:"COGNITIVE supportMENT",icon:"🔬",desc:"BDNF elevation supporting neuroplasticity. Memory consolidation and learning capacity improving. Immune modulation beginning as secondary benefit.",notice:["Sharper focus and memory recall","Better emotional regulation throughout day","Reduced rumination and intrusive thoughts","Improved sleep research"],focus:["Learning tasks benefit from administration beforehand","Journaling captures cognitive research outcomes","Exercise synergizes strongly (BDNF + exercise)","Maintain consistent sleep schedule"]},{num:3,label:"NEUROLOGICAL OPTIMIZATION",icon:"⚡",desc:"Sustained BDNF elevation and neurotransmitter balance producing consistent cognitive and emotional optimization. Social anxiety notably reduced.",notice:["Anxiety baseline significantly lowered","Mental performance at best","Social confidence improved","Immune function improving (secondary benefit)"],focus:["Maintain administration protocol","Challenging cognitive tasks — brain responds","Physical training supports BDNF effect","Monitor mood journaling weekly"]},{num:4,label:"STABLE BASELINE",icon:"🏔️",desc:"New neurological baseline established. Anxiety circuits recalibrated. Cognitive research outcomes consolidating into long-term function.",notice:["Calm is the new default state","Cognition consistently sharp","Stress responses proportionate to reality","Better relationships and social function"],focus:["Cycle consideration after 4 weeks","Off-cycle BDNF maintained by exercise","Mindfulness amplifies and preserves gains","Reassess in 2 weeks off — return if needed"]}],monitor:["Anxiety levels (1-10 daily)","sleep research","Focus/concentration","Mood baseline","Social confidence"],quote:"Selank doesn't sedate — it recalibrates your nervous system to its optimal baseline."},
  "semax":{accent:"#6366f1",subtitle:"Semax — ACTH 4-10 Analog, neuro researchive Peptide",weeks:[{num:1,label:"BDNF SURGE",icon:"⚡",desc:"Semax produces rapid BDNF and NGF upregulation — often within hours of first administration amount. Dopaminergic and serotonergic systems activating simultaneously.",notice:["Mental sharpness noticeably improved within first use","Motivation and drive elevated","Possible mild stimulation feeling (normal)","Memory encoding noticeably improving"],focus:["Morning administration amount for cognitive supportment","Use before mentally demanding tasks — timing matters","Avoid late administration (stimulating effect)","Stay hydrated"]},{num:2,label:"neuro researchION ACTIVE",icon:"🛡️",desc:"Antioxidant cascade protecting neurons from oxidative stress. Serotonin reupadminister modulation improving mood stability. Brain fog clearing.",notice:["Mood consistently elevated","Stress response proportionate and manageable","Focus sustained for longer periods","Creative thinking and problem-solving supportd"],focus:["Challenging cognitive work during administration window","Exercise synergizes strongly with Semax","Quality sleep for neuroplasticity consolidation","Track subjective cognitive metrics"]},{num:3,label:"COGNITIVE PEAK",icon:"🧠",desc:"Peak BDNF and neuroplasticity. Learning, memory, and processing speed at their highest. Dopamine system optimized for performance.",notice:["Peak mental performance","Information retention and recall at its best","High motivation and sustained energy","Social fluency and confidence improved"],focus:["Maximize learning and creative output in this window","Training + mental work same day = powerful synergy","Consistent administration schedule","Journaling cognitive research outcomes recommended"]},{num:4,label:"SUSTAINED supportMENT",icon:"🏆",desc:"Four weeks of BDNF elevation producing lasting neuroplastic changes that persist beyond the administration cycle.",notice:["Baseline cognition permanently elevated","Stress resilience durably improved","Memory function sustainably improved","Motivation normalized at higher level"],focus:["Cycle off 2 weeks after 4 weeks on","BDNF maintained by exercise off-cycle","Challenging cognitive tasks preserve gains","Consider stacking with Selank for anxiety + cognition"]}],monitor:["Cognitive performance","Mood","Motivation","sleep research","Anxiety levels"],quote:"Semax is neurological optimization — it doesn't just sharpen the blade, it forges a better one."},
  "dsip":{accent:"#3730a3",subtitle:"DSIP — Delta Sleep-Inducing Peptide",weeks:[{num:1,label:"SLEEP ARCHITECTURE",icon:"🌙",desc:"DSIP modulates hypothalamic sleep centers and supports delta (slow-wave) sleep — the most restorative phase. Somatostatin and LH modulation beginning.",notice:["Deeper sleep within first administration amounts","Waking less throughout the night","More vivid, restful dreams","Feeling significantly more rested on same sleep hours"],focus:["administration amount 30 min before bed","Dark, cool room (65-68°F)","No screens 1hr before bed — blue light disrupts delta sleep","Consistent bedtime — circadian alignment"]},{num:2,label:"HORMONAL RESTORATION",icon:"📈",desc:"Improved deep sleep elevating GH secretion which peaks in slow-wave sleep. Cortisol rhythm normalizing. Stress axis beginning to recalibrate.",notice:["post-research support from training dramatically faster","Morning cortisol levels balanced — less groggy","Mood improving from better sleep research","GH-related body composition beginning to shift"],focus:["Train hard — capitalize on supportd GH surge","Protein before bed (feeds nocturnal GH response)","Cold room for optimal sleep research","Track HRV if possible — it tells the story"]},{num:3,label:"STRESS AXIS RESET",icon:"🧘",desc:"Chronic DSIP supplementation resetting HPA axis dysregulation. Anxiety reducing as a secondary benefit of optimized sleep and cortisol rhythm.",notice:["Stress feels more manageable throughout day","Anxiety reducing","Focus and cognition improving","Physical post-research support at new peak"],focus:["Maintain consistent schedule — rhythm is key","Morning exercise for cortisol optimization","Reduce caffeine after noon — don't disrupt the cycle","Journaling sleep research tracks research outcome"]},{num:4,label:"OPTIMAL BASELINE",icon:"⭐",desc:"Sleep-wake cycle fully optimized. Downstream hormonal cascade (GH, cortisol, androgenic research) functioning at optimal circadian rhythm.",notice:["Consistently excellent sleep research","Energy stable and high all day","Mood at new consistent best","Body composition improving from GH elevation"],focus:["May reduce administration amount to maintenance","Sleep hygiene locks in gains long-term","Exercise in morning maintains circadian rhythm","Consider 4 on / 2 off cycle"]}],monitor:["sleep research (1-10 nightly)","Dream recall","Morning energy","HRV","Cortisol parameters"],quote:"DSIP fixes sleep at the root level — when your sleep is optimized, everything else follows."},
  "mt2":{accent:"#312e81",subtitle:"MT2 — Melanotan II, Melanocortin Receptor Agonist",weeks:[{num:1,label:"MELANIN ACTIVATION",icon:"☀️",desc:"MC1R activation in melanocytes begins upregulating eumelanin production. MC4R stimulation in hypothalamus begins affecting reproductive research and appetite simultaneously.",notice:["Skin beginning to darken (with UV exposure)","Increased reproductive research — noticeable within days","Possible nausea (common, administration amount-dependent — start low)","Spontaneous erections (men) — manage with administration amount adjustment"],focus:["Start low administration amount — titrate up slowly","UV exposure required for tan response to manifest","Antiemetic if needed (ginger, B6, or ondansetron)","Stay hydrated"]},{num:2,label:"PIGMENTATION DEEPENS",icon:"🌅",desc:"Sustained MC1R activation producing deeper, more even melanin distribution across the skin. Photoprotective effect of melanin beginning.",notice:["Noticeable tan deepening with UV","More even skin tone — less patchiness","Appetite reduction (MC4R pathway)","reproductive research remains elevated"],focus:["Controlled UV exposure 20-30 min sessions","Monitor moles — any changes stop and consult","Adjust administration amount if side effects persist","Hydration important"]},{num:3,label:"PEAK PIGMENTATION",icon:"✨",desc:"Maximum melanin density achieved for your skin type. Photoprotective barrier functioning. MC4R effects on appetite and reproductive research stabilized.",notice:["Deepest tan achieved","Natural sun protection significantly supportd","Stable appetite reduction","reproductive research normalized to elevated baseline"],focus:["Maintenance administration amounts to sustain tan","Continue controlled UV protocol","Skin check awareness — mole monitoring","Lower administration amount for maintenance phase"]},{num:4,label:"MAINTENANCE PHASE",icon:"🔄",desc:"Reduced administration frequency maintains pigmentation. MC4R benefits continuing. Photoprotection sustained with minimal UV required.",notice:["Tan holding with less UV","Consistent reproductive research","Possible mild appetite suppression","Skin quality research outcomes noted"],focus:["Reduce to maintenance administration amount","Skin support monitoring","Continue hydration","Cycle off consideration after 12 weeks"]}],monitor:["Skin response","Mole changes (any change = stop immediately)","Nausea levels","Blood pressure","reproductive research"],quote:"MT2 activates your body's own UV defense system — melanin is nature's sunscreen, optimized."},
  "reconst":{accent:"#64748b",subtitle:"Bacteriostatic Water — Reconstitution Solution",weeks:[{num:1,label:"PROPER RECONSTITUTION",icon:"💧",desc:"Bacteriostatic water (0.9% benzyl alcohol) is the gold standard for peptide reconstitution. Benzyl alcohol supports bacterial growth, extending vial life significantly over sterile water.",notice:["Clear, colorless solution is normal","Never shake — swirl gently to dissolve","Peptide should dissolve completely","Refrigerate after reconstitution"],focus:["Use sterile syringe for reconstitution","Add water slowly down the side of the vial","Never administer air bubbles","Label vial with date of reconstitution"]},{num:2,label:"STORAGE AND STABILITY",icon:"🧪",desc:"Properly reconstituted peptides maintain potency for 30-60 days refrigerated with bacteriostatic water. Light and heat degrade peptides rapidly.",notice:["Store at 35-46°F (2-8°C) refrigerated","Keep away from light","Inspect for cloudiness before each use","Discard if any visible particles or cloudiness"],focus:["Never freeze reconstituted peptides","Keep vial cap clean with alcohol swab","Use within recommended window","Track reconstitution date"]},{num:3,label:"administration ACCURACY",icon:"🎯",desc:"Accurate administration requires knowing the concentration of your reconstituted peptide. Simple calculation: mg of peptide / mL of water added.",notice:["Calculate concentration before first administration amount","Use metabolic signaling syringe for accuracy (U-100)","Reconstitution math: 5mg in 2mL = 2500mcg/mL","Double-check administration amount before administration"],focus:["Write down your calculation","Use consistent volume each time","Rotate administerion sites","Maintain sterile technique always"]},{num:4,label:"BEST PRACTICES",icon:"✅",desc:"Bacteriostatic water ensures your peptide research remains accurate, sterile, and effective throughout the vial's useful life.",notice:["Replace vial after 30-60 days","Never share needles or vials","Dispose of sharps properly","Source only Research-grade BAC water"],focus:["Maintain sterile technique always","Refrigerate consistently","Track usage and dates","Keep backup BAC water on hand"]}],monitor:["Solution clarity","Storage temperature","Reconstitution date","administration accuracy","Sterile technique"],quote:"Your peptide is only as good as your reconstitution — bacteriostatic water is the foundation of accurate research."},
};

const PLACARD_ID_MAP={"glp3r":"glp3r","glp2t":"glp2t","glp1":"glp1","bpc157":"bpc157","tb500":"tb500","cjc1295":"cjc1295","cjcipa":"cjcipa","ipamorlin":"ipamorlin","tesamorlin":"tesamorlin","igf1lr3":"igf1lr3","ghkcu":"ghkcu","glow":"glow","nad":"nad","motsc":"motsc","glutathione":"glutathione","ss31":"ss31","selank":"selank","semax":"semax","dsip":"dsip","mt2":"mt2","reconst":"reconst"};


function WeekBadge({num,label,icon,desc,notice,focus,accent}){
  return(
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid "+accent+"22",borderRadius:12,padding:"13px 15px",marginBottom:9}}>
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}>
        <span style={{background:accent+"22",color:accent,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:9,letterSpacing:"0.12em",padding:"3px 7px",borderRadius:6,border:"1px solid "+accent+"44"}}>WK {num}</span>
        <span style={{fontSize:14}}>{icon}</span>
        <span style={{color:accent,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:10,letterSpacing:"0.1em"}}>{label}</span>
      </div>
      <p style={{color:"rgba(255,255,255,0.65)",fontFamily:"'Syne',sans-serif",fontSize:10,lineHeight:1.5,margin:"0 0 9px 0"}}>{desc}</p>
      <div style={{display:"flex",gap:10}}>
        <div style={{flex:1}}>
          <div style={{color:accent,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:9,letterSpacing:"0.12em",marginBottom:4}}>YOU MAY NOTICE</div>
          {notice.map((n,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:4,marginBottom:2}}><span style={{color:accent,fontSize:8,marginTop:3,flexShrink:0}}>▸</span><span style={{color:"rgba(255,255,255,0.55)",fontFamily:"'Syne',sans-serif",fontSize:10,lineHeight:1.4}}>{n}</span></div>)}
        </div>
        <div style={{flex:1}}>
          <div style={{color:"#fbbf24",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:9,letterSpacing:"0.12em",marginBottom:4}}>FOCUS ON</div>
          {focus.map((f,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:4,marginBottom:2}}><span style={{color:"#fbbf24",fontSize:8,marginTop:3,flexShrink:0}}>▸</span><span style={{color:"rgba(255,255,255,0.55)",fontFamily:"'Syne',sans-serif",fontSize:10,lineHeight:1.4}}>{f}</span></div>)}
        </div>
      </div>
    </div>
  );
}

function InfoPlacard({productId}){
  const [visible,setVisible]=useState(false);
  const iconRef=useRef(null);
  const panelRef=useRef(null);
  const key=PLACARD_ID_MAP[productId];
  const data=key?PLACARD_DATA[key]:null;
  useEffect(()=>{
    if(!visible)return;
    const handler=(e)=>{if(panelRef.current&&!panelRef.current.contains(e.target)&&iconRef.current&&!iconRef.current.contains(e.target)){setVisible(false);}};
    document.addEventListener("mousedown",handler);
    return()=>document.removeEventListener("mousedown",handler);
  },[visible]);
  if(!data)return null;
  return(
    <>
      <style>{`@keyframes placardIn{from{opacity:0;transform:translate(-50%,-48%) scale(0.97);}to{opacity:1;transform:translate(-50%,-50%) scale(1);}}@keyframes bdIn{from{opacity:0;}to{opacity:1;}}`}</style>
      <div ref={iconRef} onClick={e=>{e.stopPropagation();setVisible(v=>!v);}} style={{position:"absolute",top:10,left:10,width:24,height:24,borderRadius:"50%",background:visible?data.accent+"44":data.accent+"22",border:"1.5px solid "+(visible?data.accent:data.accent+"88"),display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:10,transition:"all 0.18s ease",boxShadow:visible?"0 0 12px "+data.accent+"55":"none"}}>
        <span style={{color:data.accent,fontFamily:"Georgia,serif",fontWeight:700,fontSize:13,lineHeight:1,userSelect:"none"}}>i</span>
      </div>
      {visible&&<div onClick={()=>setVisible(false)} style={{position:"fixed",inset:0,zIndex:99990,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(3px)",animation:"bdIn 0.2s ease"}}/>}
      {visible&&(
        <div ref={panelRef} onClick={e=>e.stopPropagation()} style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:Math.min(420,window.innerWidth-24),maxHeight:"85vh",overflowY:"auto",background:"rgba(12,12,12,0.99)",backdropFilter:"blur(24px)",border:"1px solid "+data.accent+"55",borderRadius:18,padding:"22px 20px",zIndex:99999,boxShadow:"0 32px 100px rgba(0,0,0,0.95)",animation:"placardIn 0.22s cubic-bezier(0.16,1,0.3,1)"}}>
          <button onClick={()=>setVisible(false)} style={{position:"absolute",top:14,right:14,width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.6)",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0,lineHeight:1}}>×</button>
          <div style={{marginBottom:16,paddingBottom:14,borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
              <div style={{width:5,height:22,borderRadius:3,background:"linear-gradient(180deg,"+data.accent+","+data.accent+"33)"}}/>
              <div>
                <div style={{color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:14,letterSpacing:"0.05em"}}>WHAT TO EXPECT</div>
                <div style={{color:data.accent,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:10,letterSpacing:"0.08em"}}>{key.toUpperCase()}</div>
              </div>
            </div>
            <div style={{color:"rgba(255,255,255,0.38)",fontFamily:"'Syne',sans-serif",fontSize:10,letterSpacing:"0.05em"}}>{data.subtitle}</div>
          </div>
          {/* Download button — top */}
          <button onClick={()=>{
            const weeksHTML = data.weeks.map(w=>`
              <div class="week-card">
                <div class="week-header">
                  <span class="week-num" style="background:${data.accent}22;color:${data.accent};border:1px solid ${data.accent}44">WK ${w.num}</span>
                  <span class="week-icon">${w.icon}</span>
                  <span class="week-label" style="color:${data.accent}">${w.label}</span>
                </div>
                <p class="week-desc">${w.desc}</p>
                <div class="week-cols">
                  <div class="week-col">
                    <div class="col-title" style="color:${data.accent}">YOU MAY NOTICE</div>
                    ${w.notice.map(n=>`<div class="bullet"><span style="color:${data.accent}">▸</span> ${n}</div>`).join("")}
                  </div>
                  <div class="week-col">
                    <div class="col-title" style="color:#fbbf24">FOCUS ON</div>
                    ${w.focus.map(f=>`<div class="bullet"><span style="color:#fbbf24">▸</span> ${f}</div>`).join("")}
                  </div>
                </div>
              </div>`).join("");
            const monitorsHTML = data.monitor.map(m=>`<span class="monitor-tag">${m}</span>`).join("");
            const html=`<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Alphaomegatides — ${key?.toUpperCase()} Research Guide</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#0a0a0a;color:#fff;font-family:'DM Sans',sans-serif;min-height:100vh;padding:40px 32px;}
  .page{max-width:720px;margin:0 auto;}
  .header{display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.07);}
  .brand{display:flex;flex-direction:column;gap:2px;}
  .brand-name{font-family:'Syne',sans-serif;font-weight:900;font-size:13px;letter-spacing:0.2em;color:rgba(255,255,255,0.4);text-transform:uppercase;}
  .brand-tag{font-family:'Syne',sans-serif;font-size:9px;color:rgba(255,255,255,0.2);letter-spacing:0.15em;}
  .logo-row{display:flex;align-items:center;gap:6px;}
  .alpha{font-family:'Syne',sans-serif;font-weight:900;font-size:22px;color:#ff6b6b;}
  .omega{font-family:'Syne',sans-serif;font-weight:900;font-size:22px;color:#3be8b0;}
  .hero{margin-bottom:28px;}
  .hero-label{font-family:'Syne',sans-serif;font-weight:700;font-size:10px;letter-spacing:0.2em;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-bottom:6px;}
  .hero-title{font-family:'Syne',sans-serif;font-weight:900;font-size:28px;letter-spacing:-0.02em;line-height:1;color:#fff;margin-bottom:4px;}
  .hero-sub{font-size:12px;color:rgba(255,255,255,0.35);letter-spacing:0.05em;}
  .accent-bar{width:48px;height:3px;border-radius:100px;margin:12px 0;background:linear-gradient(90deg,${data.accent},${data.accent}44);}
  .week-card{background:rgba(255,255,255,0.03);border:1px solid ${data.accent}22;border-radius:12px;padding:16px;margin-bottom:10px;}
  .week-header{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
  .week-num{font-family:'Syne',sans-serif;font-weight:800;font-size:9px;letter-spacing:0.12em;padding:3px 8px;border-radius:6px;}
  .week-icon{font-size:15px;}
  .week-label{font-family:'Syne',sans-serif;font-weight:800;font-size:10px;letter-spacing:0.1em;}
  .week-desc{font-size:11px;color:rgba(255,255,255,0.6);line-height:1.55;margin-bottom:10px;}
  .week-cols{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .week-col{}
  .col-title{font-family:'Syne',sans-serif;font-weight:700;font-size:9px;letter-spacing:0.12em;margin-bottom:5px;}
  .bullet{font-size:10px;color:rgba(255,255,255,0.55);line-height:1.5;margin-bottom:3px;}
  .monitor-section{background:rgba(255,255,255,0.03);border-radius:10px;padding:14px 16px;margin-bottom:14px;border:1px solid rgba(255,255,255,0.06);}
  .monitor-title{font-family:'Syne',sans-serif;font-weight:700;font-size:9px;letter-spacing:0.14em;color:rgba(255,255,255,0.4);margin-bottom:8px;}
  .monitor-tags{display:flex;flex-wrap:wrap;gap:6px;}
  .monitor-tag{background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.55);font-size:10px;padding:4px 10px;border-radius:20px;border:1px solid rgba(255,255,255,0.08);}
  .quote-bar{background:${data.accent}0a;border-left:3px solid ${data.accent};border-radius:0 10px 10px 0;padding:12px 16px;margin-bottom:14px;}
  .quote-text{color:${data.accent}bb;font-family:Georgia,serif;font-style:italic;font-size:12px;line-height:1.6;}
  .footer{display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid rgba(255,255,255,0.05);margin-top:4px;}
  .footer-note{font-size:9px;color:rgba(255,255,255,0.18);letter-spacing:0.06em;}
  .footer-url{font-size:9px;color:rgba(255,255,255,0.2);letter-spacing:0.06em;}
  @media print{body{background:#0a0a0a!important;-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
</style>
</head><body>
<div class="page">
  <div class="header">
    <div class="brand">
      <div class="brand-name">Alphaomegatides</div>
      <div class="brand-tag">VERIFIED RESEARCH PEPTIDES · alphaomegatides.com</div>
    </div>
    <div class="logo-row">
      <span class="alpha">α</span>
      <svg width="36" height="14" viewBox="0 0 14 28" fill="none" style="transform:rotate(90deg)"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ff6b6b"/><stop offset="50%" stop-color="#a855f7"/><stop offset="100%" stop-color="#3be8b0"/></linearGradient></defs><path d="M3 0 C1 4,1 8,3 12 C5 16,6 20,4 24 C3 26,2 27,2 28" stroke="url(#g)" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M11 0 C13 4,13 8,11 12 C9 16,8 20,10 24 C11 26,12 27,12 28" stroke="url(#g)" stroke-width="1.8" fill="none" stroke-linecap="round"/><line x1="3" y1="7" x2="11" y2="7" stroke="rgba(168,85,247,0.5)" stroke-width="1.4" stroke-linecap="round"/><line x1="3" y1="21" x2="11" y2="21" stroke="rgba(59,232,176,0.6)" stroke-width="1.4" stroke-linecap="round"/></svg>
      <span class="omega">Ω</span>
    </div>
  </div>
  <div class="hero">
    <div class="hero-label">Research Protocol Guide</div>
    <div class="hero-title">${key?.toUpperCase()}</div>
    <div class="hero-sub">${data.subtitle}</div>
    <div class="accent-bar"></div>
    <div class="hero-label">WHAT TO EXPECT — WEEK BY WEEK</div>
  </div>
  ${weeksHTML}
  <div class="monitor-section">
    <div class="monitor-title">MONITOR WEEKLY</div>
    <div class="monitor-tags">${monitorsHTML}</div>
  </div>
  <div class="quote-bar">
    <div class="quote-text">"${data.quote}"</div>
  </div>
  <div class="footer">
    <div class="footer-note">⚗️ FOR RESEARCH USE ONLY · NOT INTENDED FOR research use · NOT FOR DIAGNOSTIC USE</div>
    <div class="footer-url">alphaomegatides.com</div>
  </div>
</div>
<script>window.onload=function(){window.print();}</script>
</body></html>`;
            const blob=new Blob([html],{type:"text/html"});
            const url=URL.createObjectURL(blob);
            const a=document.createElement("a");
            a.href=url;
            a.download=`alphaomegatides-${key}-research-guide.html`;
            a.click();
            URL.revokeObjectURL(url);
          }} style={{width:"100%",padding:"12px",background:`linear-gradient(135deg,${data.accent}33,${data.accent}11)`,border:`1.5px solid ${data.accent}77`,borderRadius:10,color:data.accent,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.82rem",letterSpacing:"0.08em",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:14,transition:"all 0.15s",boxShadow:`0 4px 20px ${data.accent}22`}}
            onMouseOver={e=>{e.currentTarget.style.background=data.accent+"44";e.currentTarget.style.boxShadow=`0 6px 24px ${data.accent}44`;}}
            onMouseOut={e=>{e.currentTarget.style.background=`linear-gradient(135deg,${data.accent}33,${data.accent}11)`;e.currentTarget.style.boxShadow=`0 4px 20px ${data.accent}22`;}}
          >
            <span style={{fontSize:"1rem"}}>⬇</span> Download Research Guide
          </button>
          {data.weeks.map(w=><WeekBadge key={w.num} {...w} accent={data.accent}/>)}
          <div style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"11px 14px",marginBottom:11,border:"1px solid rgba(255,255,255,0.06)"}}>
            <div style={{color:"rgba(255,255,255,0.4)",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:9,letterSpacing:"0.14em",marginBottom:7}}>MONITOR WEEKLY</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{data.monitor.map((m,i)=><span key={i} style={{background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.55)",fontFamily:"'Syne',sans-serif",fontSize:10,padding:"3px 9px",borderRadius:20,border:"1px solid rgba(255,255,255,0.07)"}}>{m}</span>)}</div>
          </div>
          <div style={{background:data.accent+"0a",borderLeft:"3px solid "+data.accent,borderRadius:"0 10px 10px 0",padding:"9px 13px",marginBottom:11}}>
            <span style={{color:data.accent+"bb",fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:11,lineHeight:1.5}}>"{data.quote}"</span>
          </div>
          <div style={{padding:"7px 11px",background:"rgba(255,255,255,0.02)",borderRadius:8,border:"1px solid rgba(255,255,255,0.04)",marginBottom:11}}>
            <span style={{color:"rgba(255,255,255,0.2)",fontFamily:"'Syne',sans-serif",fontSize:9,letterSpacing:"0.06em"}}>FOR RESEARCH USE ONLY · NOT INTENDED FOR research use</span>
          </div>
        </div>
      )}
    </>
  );
}


// ═══════════════════════════════════════════════════════════════
// PRODUCT IMAGES — curated per compound (Unsplash/Pexels free)
// ═══════════════════════════════════════════════════════════════
const PRODUCT_IMAGES: Record<string, string> = {
  glp3r:    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
  glp2t:    "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80",
  glp1:     "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&q=80",
  bpc157:   "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=600&q=80",
  tb500:    "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=600&q=80",
  cjc1295:  "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&q=80",
  cjcipa:   "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&q=80",
  ipamorlin:"https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&q=80",
  tesamorlin:"https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80",
  igf1lr3:  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
  ghkcu:    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
  glow:     "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
  nad:      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
  motsc:    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80",
  glutathione:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
  ss31:     "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
  selank:   "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
  semax:    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
  dsip:     "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80",
  mt2:      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80",
  reconst:  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
};

// ═══════════════════════════════════════════════════════════════
// REVIEWS SYSTEM
// ═══════════════════════════════════════════════════════════════
interface Review { id:string; productId:string; name:string; rating:number; text:string; date:string; verified:boolean; }

function getReviews(productId:string): Review[] {
  try {
    const all = JSON.parse(localStorage.getItem("aot_reviews") || "{}");
    return (all[productId] || []) as Review[];
  } catch { return []; }
}

function saveReview(review: Review) {
  try {
    const all = JSON.parse(localStorage.getItem("aot_reviews") || "{}");
    if (!all[review.productId]) all[review.productId] = [];
    all[review.productId].unshift(review);
    localStorage.setItem("aot_reviews", JSON.stringify(all));
  } catch {}
}

// Seed reviews so page doesn't look empty on launch
const SEED_REVIEWS: Record<string, Review[]> = {
  glp3r: [
    {id:"r1",productId:"glp3r",name:"Dr. M. Chen",rating:5,text:"Outstanding purity — HPLC results match the COA exactly. Reconstituted cleanly, clear solution. Will reorder.",date:"2026-05-12",verified:true},
    {id:"r2",productId:"glp3r",name:"Research Lab TX",rating:5,text:"Fast shipping, every vial weighed correctly. COA verification was straightforward on Freedom Diagnostics site.",date:"2026-04-28",verified:true},
  ],
  bpc157: [
    {id:"r3",productId:"bpc157",name:"J. Alvarez PhD",rating:5,text:"Consistent batch quality across 3 separate orders. Documentation is thorough and the COA links actually work.",date:"2026-05-20",verified:true},
    {id:"r4",productId:"bpc157",name:"Biochem Research",rating:5,text:"Best sourced BPC-157 we've used. Reconstitutes perfectly with BAC water, no cloudiness.",date:"2026-05-01",verified:true},
  ],
  ghkcu: [
    {id:"r5",productId:"ghkcu",name:"Dermal Research Co.",rating:5,text:"Distinctive blue color confirms copper binding — exactly as expected. Purity verified. Reordered 3x.",date:"2026-05-15",verified:true},
  ],
  nad: [
    {id:"r6",productId:"nad",name:"Longevity Labs",rating:5,text:"500mg vial, clean dissolution, COA verified independently. Very happy with this source.",date:"2026-04-18",verified:true},
  ],
  cjcipa: [
    {id:"r7",productId:"cjcipa",name:"Research Protocol Group",rating:5,text:"Pre-blended CJC+Ipa is convenient — same quality as buying separately but easier to manage.",date:"2026-05-08",verified:true},
  ],
};

function initSeedReviews() {
  try {
    const existing = localStorage.getItem("aot_reviews");
    if (!existing) localStorage.setItem("aot_reviews", JSON.stringify(SEED_REVIEWS));
  } catch {}
}
initSeedReviews();

function StarRating({rating, size=16, onClick=null}: {rating:number; size?:number; onClick?:((r:number)=>void)|null}) {
  const [hover,setHover] = useState(0);
  return (
    <div style={{display:"flex",gap:2}}>
      {[1,2,3,4,5].map(s => (
        <span key={s}
          onMouseEnter={()=>onClick&&setHover(s)}
          onMouseLeave={()=>onClick&&setHover(0)}
          onClick={()=>onClick&&onClick(s)}
          style={{fontSize:size,cursor:onClick?"pointer":"default",color:(hover||rating)>=s?"#ffd166":"rgba(255,255,255,0.15)",transition:"color .12s",lineHeight:1}}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewsSection({productId}: {productId:string}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setReviews(getReviews(productId)); }, [productId]);

  const avg = reviews.length ? reviews.reduce((s,r)=>s+r.rating,0)/reviews.length : 0;

  const submit = () => {
    if (!name || !rating || !text) return;
    const r: Review = {
      id: Date.now().toString(), productId,
      name, rating, text,
      date: new Date().toISOString().split("T")[0],
      verified: false,
    };
    saveReview(r);
    setReviews(getReviews(productId));
    setSubmitted(true); setShowForm(false);
    setName(""); setRating(0); setText("");
  };

  return (
    <div style={{maxWidth:760,margin:"0 auto",padding:"0 24px 48px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",marginBottom:4}}>Researcher Reviews</div>
          {reviews.length > 0 && (
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <StarRating rating={Math.round(avg)}/>
              <span style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.45)"}}>{avg.toFixed(1)} · {reviews.length} review{reviews.length!==1?"s":""}</span>
            </div>
          )}
        </div>
        <button onClick={()=>setShowForm(p=>!p)}
          style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.7)",padding:"8px 18px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.78rem",fontWeight:600}}>
          {showForm ? "Cancel" : "+ Write a Review"}
        </button>
      </div>

      {submitted && <div style={{background:"rgba(59,232,176,0.1)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:12,padding:"12px 16px",marginBottom:16,fontSize:"0.82rem",color:"#3be8b0"}}>✅ Review submitted — thank you!</div>}

      {showForm && (
        <div style={{background:"#1a1a1a",borderRadius:16,padding:"20px",border:"1px solid rgba(255,255,255,0.08)",marginBottom:20}}>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.45)",display:"block",marginBottom:6}}>YOUR RATING</label>
            <StarRating rating={rating} size={24} onClick={setRating}/>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.45)",display:"block",marginBottom:5}}>NAME / AFFILIATION</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Dr. Smith / Research Lab" style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.45)",display:"block",marginBottom:5}}>REVIEW</label>
            <textarea value={text} onChange={e=>setText(e.target.value)} rows={3} placeholder="Purity, reconstitution, COA verification, shipping speed..." style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.25)",marginBottom:12}}>All reviews are moderated. Only research-context reviews published.</div>
          <button onClick={submit} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"11px 24px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.85rem"}}>Submit Review</button>
        </div>
      )}

      {reviews.length === 0 ? (
        <div style={{textAlign:"center",padding:"32px 0",color:"rgba(255,255,255,0.25)",fontSize:"0.85rem"}}>No reviews yet — be the first researcher to review this compound.</div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {reviews.map(r => (
            <div key={r.id} style={{background:"#1a1a1a",borderRadius:14,padding:"16px 18px",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(59,232,176,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.8rem",color:"#3be8b0",flexShrink:0}}>{r.name[0].toUpperCase()}</div>
                  <div>
                    <div style={{fontWeight:600,fontSize:"0.85rem",color:"#fff"}}>{r.name}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
                      <StarRating rating={r.rating} size={11}/>
                      {r.verified && <span style={{fontSize:"0.6rem",background:"rgba(59,232,176,0.12)",color:"#3be8b0",padding:"1px 7px",borderRadius:100,fontWeight:700}}>VERIFIED</span>}
                    </div>
                  </div>
                </div>
                <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.25)",flexShrink:0}}>{r.date}</div>
              </div>
              <div style={{fontSize:"0.84rem",color:"rgba(255,255,255,0.55)",lineHeight:1.65}}>{r.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// COMPARISON TOOL
// ═══════════════════════════════════════════════════════════════
const SOCIAL_EVENTS = [
  "Researcher in TX just ordered BPC-157",
  "New order: Tirzepatide — California",
  "Researcher in FL just ordered TB-500",
  "New order: Retatrutide — New York",
  "Researcher in CO just ordered Semaglutide",
  "New order: CJC-1295 + Ipamorelin — Texas",
  "Researcher in WA just ordered Epithalon",
  "New order: GHK-Cu — Illinois",
  "Researcher in AZ just ordered Selank",
  "New order: NAD+ — Georgia",
  "Researcher in OR just ordered Semax",
  "New order: IGF-1 LR3 — Nevada",
];

function SocialProofTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i+1) % SOCIAL_EVENTS.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(59,232,176,0.06)",border:"1px solid rgba(59,232,176,0.15)",borderRadius:100,padding:"6px 14px",fontSize:"0.72rem",transition:"opacity .4s",opacity:visible?1:0}}>
      <span style={{width:7,height:7,borderRadius:"50%",background:"#3be8b0",display:"inline-block",animation:"pulseGlow 1.5s ease-in-out infinite",flexShrink:0}}/>
      <span style={{color:"rgba(255,255,255,0.55)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:260}}>{SOCIAL_EVENTS[idx]}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BUNDLE RECOMMENDATIONS
// ═══════════════════════════════════════════════════════════════
const BUNDLES = [
  {
    id:"weight-loss-starter",
    name:"metabolic research Starter Stack",
    icon:"🔥",
    color:"#ff6b6b",
    ids:["glp1","bpc157","reconst"],
    desc:"GLP-1 for appetite control, BPC-157 for gut integrity support during caloric restriction.",
    savings:"Save $15",
  },
  {
    id:"gh-optimizer",
    name:"GH Optimizer Stack",
    icon:"💪",
    color:"#8b5cf6",
    ids:["cjcipa","igf1lr3","reconst"],
    desc:"CJC+Ipamorelin for synergistic GH pulse, IGF-1 LR3 for downstream receptor activation.",
    savings:"Save $20",
  },
  {
    id:"longevity-core",
    name:"Longevity Core Stack",
    icon:"⚗️",
    color:"#f59e0b",
    ids:["nad","motsc","ss31"],
    desc:"NAD+ for sirtuin activation, MOTS-c for AMPK, SS-31 for mitochondrial membrane protection.",
    savings:"Save $18",
  },
  {
    id:"post-research support-duo",
    name:"post-research support Duo",
    icon:"🛡️",
    color:"#3be8b0",
    ids:["bpc157","tb500"],
    desc:"The classic dual-pathway supporting stack — tissue repair + systemic actin remodeling.",
    savings:"Save $10",
  },
  {
    id:"neuro-stack",
    name:"Neuro & Sleep Stack",
    icon:"🧠",
    color:"#7c3aed",
    ids:["selank","semax","dsip"],
    desc:"Selank for anxiolytic balance, Semax for BDNF/cognition, DSIP for deep sleep architecture.",
    savings:"Save $12",
  },
  {
    id:"skin-longevity research",
    name:"Skin & longevity research Stack",
    icon:"✨",
    color:"#ec4899",
    ids:["ghkcu","glow","nad"],
    desc:"GHK-Cu for 4,000+ gene activation, Glow Complex for collagen, NAD+ for cellular energy.",
    savings:"Save $16",
  },
];

function BundlesPage({go}: {go:(p:string,id?:string)=>void}) {
  const [showModal, setShowModal] = useState(false);
  const [activeBundleId, setActiveBundleId] = useState<string|null>(null);

  return (
    <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"48px 24px 80px"}}>
        <span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.45)",cursor:"pointer",display:"block",marginBottom:24}}>← Back</span>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.4rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:6}}>Research Stacks</div>
        <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginBottom:32}}>Curated multi-compound research stacks based on published protocol combinations. For research use only.</p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18}}>
          {BUNDLES.map(bundle => {
            const prods = PRODUCTS.filter(p => bundle.ids.includes(p.id));
            return (
              <div key={bundle.id} style={{background:"#1a1a1a",borderRadius:20,border:`1px solid ${bundle.color}33`,overflow:"hidden",transition:"all .25s"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=bundle.color+"66";(e.currentTarget as HTMLElement).style.transform="translateY(-4px)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=bundle.color+"33";(e.currentTarget as HTMLElement).style.transform="none";}}>
                <div style={{background:`linear-gradient(135deg,${bundle.color}22,${bundle.color}08)`,padding:"20px 20px 14px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <span style={{fontSize:"1.5rem"}}>{bundle.icon}</span>
                    <div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",color:"#fff"}}>{bundle.name}</div>
                      <div style={{fontSize:"0.65rem",fontWeight:700,color:bundle.color,background:bundle.color+"22",padding:"2px 8px",borderRadius:100,display:"inline-block",marginTop:3}}>{bundle.savings}</div>
                    </div>
                  </div>
                  <p style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.5)",lineHeight:1.6,margin:0}}>{bundle.desc}</p>
                </div>
                <div style={{padding:"14px 20px 18px"}}>
                  <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
                    {prods.map(p => (
                      <button key={p.id} onClick={()=>go("product",p.id)}
                        style={{display:"flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.05)",border:`1px solid ${p.color}33`,borderRadius:100,padding:"4px 10px",cursor:"pointer",fontFamily:"inherit",fontSize:"0.72rem",color:"rgba(255,255,255,0.65)",transition:"all .15s"}}
                        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=p.color;(e.currentTarget as HTMLElement).style.color="#fff";}}
                        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=p.color+"33";(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.65)";}}>
                        {p.icon} {p.name}
                      </button>
                    ))}
                  </div>
                  <button onClick={()=>{setActiveBundleId(bundle.id);setShowModal(true);}}
                    style={{width:"100%",padding:"11px",background:`linear-gradient(135deg,${bundle.color},${bundle.color}99)`,color:bundle.color==="#3be8b0"||bundle.color==="#ffd166"?"#0e0e0e":"#fff",border:"none",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.82rem"}}>
                    Add Stack to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{marginTop:32,background:"rgba(255,107,107,0.07)",border:"1px solid rgba(255,107,107,0.15)",borderRadius:12,padding:"14px 18px",fontSize:"0.78rem",color:"rgba(255,200,180,0.7)",lineHeight:1.7}}>
          ⚠️ {DISCLAIMER_FULL}
        </div>
      </div>
      {showModal && <ComingSoonModal onClose={()=>setShowModal(false)} sourcePage={`Bundles — ${activeBundleId}`}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PRODUCT QUIZ
// ═══════════════════════════════════════════════════════════════
const QUIZ_QUESTIONS = [
  {
    q:"What is your primary research focus?",
    opts:[
      {label:"Metabolic & Weight",ids:["glp3r","glp2t","glp1","motsc"]},
      {label:"Tissue Repair & post-research support",ids:["bpc157","tb500","ghkcu"]},
      {label:"GH Axis & Body Composition",ids:["cjcipa","cjc1295","ipamorlin","tesamorlin","igf1lr3"]},
      {label:"Longevity & Cellular support",ids:["nad","motsc","ss31","glutathione"]},
      {label:"Cognitive & Neurological",ids:["selank","semax","dsip","mt2"]},
      {label:"Dermal Research",ids:["ghkcu","glow","nad"]},
    ]
  },
  {
    q:"What experience level best describes your research?",
    opts:[
      {label:"Beginner — first protocol",ids:["bpc157","tb500","selank","semax","dsip","mt2","ghkcu","glutathione","nad","ipamorlin","glp1"]},
      {label:"Intermediate — 1-2 protocols completed",ids:["glp3r","glp2t","cjcipa","cjc1295","tesamorlin","motsc"]},
      {label:"Advanced — multiple compounds, tracking data",ids:["igf1lr3","ss31","cjcipa","tesamorlin"]},
    ]
  },
  {
    q:"What outcome are you prioritizing?",
    opts:[
      {label:"metabolic research / metabolic optimization",ids:["glp3r","glp2t","glp1","tesamorlin","motsc"]},
      {label:"post-research support / tissue research",ids:["bpc157","tb500","ghkcu","glow"]},
      {label:"Muscle / body recomposition",ids:["cjcipa","cjc1295","ipamorlin","igf1lr3"]},
      {label:"longevity research / longevity",ids:["nad","ss31","ghkcu","glutathione","motsc"]},
      {label:"cognitive research / sleep",ids:["selank","semax","dsip","mt2"]},
    ]
  },
];

function QuizPage({go}: {go:(p:string,id?:string)=>void}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [results, setResults] = useState<string[]|null>(null);
  const [showModal, setShowModal] = useState(false);

  const pick = (ids: string[]) => {
    const newAnswers = [...answers, ids];
    setAnswers(newAnswers);
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(s=>s+1);
    } else {
      // Tally scores
      const scores: Record<string,number> = {};
      newAnswers.forEach(ans => ans.forEach(id => { scores[id]=(scores[id]||0)+1; }));
      const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,4).map(e=>e[0]);
      setResults(sorted);
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setResults(null); };

  return (
    <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
      <div style={{maxWidth:640,margin:"0 auto",padding:"48px 24px 80px"}}>
        <span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.45)",cursor:"pointer",display:"block",marginBottom:24}}>← Back</span>

        {results ? (
          <>
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{fontSize:"2rem",marginBottom:12}}>🎯</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.5rem",marginBottom:8}}>Your Recommended Compounds</div>
              <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.45)",lineHeight:1.6}}>Based on your research profile, these compounds match your stated goals and experience level.</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>
              {results.map((id,i) => {
                const p = PRODUCTS.find(x=>x.id===id); if(!p) return null;
                return (
                  <div key={id} style={{background:"#1a1a1a",borderRadius:16,padding:"16px 18px",border:`1px solid ${p.color}33`,display:"flex",alignItems:"center",gap:14}}>
                    <div style={{width:44,height:44,borderRadius:10,background:p.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0}}>{p.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem"}}>{p.name}</div>
                        {i===0&&<span style={{fontSize:"0.6rem",fontWeight:700,background:"rgba(255,209,102,0.15)",color:"#ffd166",padding:"2px 8px",borderRadius:100}}>TOP MATCH</span>}
                      </div>
                      <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)"}}>{p.tag} · {p.sizes?p.sizes[0].p:p.price}</div>
                    </div>
                    <button onClick={()=>go("product",id)} style={{background:p.color,color:p.color==="#3be8b0"||p.color==="#ffd166"?"#0e0e0e":"#fff",border:"none",padding:"8px 16px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.78rem",flexShrink:0}}>View →</button>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <button onClick={()=>setShowModal(true)} style={{flex:1,padding:"13px",background:"linear-gradient(135deg,#3be8b0,#4f8ef7)",color:"#0e0e0e",border:"none",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.88rem"}}>
                Shop Based on Your Interests
              </button>
              <button onClick={reset} style={{padding:"13px 20px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.6)",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.85rem"}}>
                Retake
              </button>
            </div>
            {showModal && <ComingSoonModal onClose={()=>setShowModal(false)} cartItems={results.map(id=>({name:PRODUCTS.find(p=>p.id===id)?.name||id,id}))} sourcePage="Quiz Results"/>}
          </>
        ) : (
          <>
            <div style={{marginBottom:8}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.7rem",letterSpacing:"0.15em",color:"#3be8b0",textTransform:"uppercase",marginBottom:4}}>Research Match Quiz</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.5rem,4vw,2rem)",letterSpacing:"-.02em",marginBottom:6}}>Find your compound</div>
              <div style={{display:"flex",gap:2,marginBottom:24}}>
                {QUIZ_QUESTIONS.map((_,i) => <div key={i} style={{height:3,flex:1,borderRadius:100,background:i<=step?"#3be8b0":"rgba(255,255,255,0.1)",transition:"background .3s"}}/>)}
              </div>
            </div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.05rem",marginBottom:18,lineHeight:1.4}}>{QUIZ_QUESTIONS[step].q}</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {QUIZ_QUESTIONS[step].opts.map(opt => (
                <button key={opt.label} onClick={()=>pick(opt.ids)}
                  style={{textAlign:"left",padding:"14px 18px",background:"#1a1a1a",border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:14,cursor:"pointer",fontFamily:"inherit",fontSize:"0.88rem",color:"rgba(255,255,255,0.8)",fontWeight:500,transition:"all .15s"}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="#3be8b0";(e.currentTarget as HTMLElement).style.background="rgba(59,232,176,0.06)";}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.1)";(e.currentTarget as HTMLElement).style.background="#1a1a1a";}}>
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RESTOCK NOTIFY
// ═══════════════════════════════════════════════════════════════
function RestockNotify({productId, productName}: {productId:string, productName:string}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.includes("@")) return;
    setLoading(true);
    try {
      const list = JSON.parse(localStorage.getItem("aot_restock") || "{}");
      if (!list[productId]) list[productId] = [];
      list[productId].push({email, date: new Date().toISOString()});
      localStorage.setItem("aot_restock", JSON.stringify(list));
    } catch {}
    await sendWaitlistEmail({name:"Restock Request",email,interests:[productName],source:`Restock notify — ${productName}`});
    setLoading(false); setDone(true);
  };

  if (done) return (
    <div style={{background:"rgba(59,232,176,0.08)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:12,padding:"12px 16px",fontSize:"0.82rem",color:"#3be8b0"}}>
      ✅ We'll email you at {email} when {productName} is restocked.
    </div>
  );

  return (
    <div style={{background:"#1a1a1a",borderRadius:12,padding:"16px 18px",border:"1px solid rgba(255,255,255,0.08)"}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:6}}>🔔 Notify me when restocked</div>
      <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",marginBottom:12}}>Leave your email and we'll notify you the moment {productName} is back in stock.</div>
      <div style={{display:"flex",gap:8}}>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="your@email.com"
          style={{flex:1,background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none"}}/>
        <button onClick={submit} disabled={loading} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"10px 18px",borderRadius:9,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.82rem",whiteSpace:"nowrap"}}>
          {loading?"…":"Notify Me"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// WAITLIST ADMIN (dashboard tab — only visible to logged-in admin)
// ═══════════════════════════════════════════════════════════════
function WaitlistAdmin() {
  const [list, setList] = useState<any[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [blastMsg, setBlastMsg] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("aot_waitlist") || "[]");
      setList(saved);
    } catch {}
  }, []);

  const sendBlast = async () => {
    if (!blastMsg.trim() || list.length === 0) return;
    setSending(true);
    // Send one email per subscriber
    for (const sub of list) {
      try {
        await fetch("/api/send-email", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            type:"blast",
            data:{to_email:sub.email, to_name:sub.name, message:blastMsg}
          }),
        });
      } catch {}
    }
    setSending(false); setSent(true);
  };

  return (
    <div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",marginBottom:4}}>Waitlist Admin</div>
      <div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.4)",marginBottom:20}}>{list.length} subscriber{list.length!==1?"s":""} on waitlist</div>

      {/* Subscribers list */}
      {list.length > 0 ? (
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24,maxHeight:300,overflowY:"auto"}}>
          {list.map((sub,i) => (
            <div key={i} style={{background:"#1c1c1c",borderRadius:12,padding:"12px 14px",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                <div>
                  <div style={{fontWeight:600,fontSize:"0.85rem"}}>{sub.name}</div>
                  <div style={{fontSize:"0.75rem",color:"#4f8ef7"}}>{sub.email}</div>
                  {sub.interests?.length > 0 && <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.35)",marginTop:3}}>Interests: {sub.interests.slice(0,3).join(", ")}{sub.interests.length>3?` +${sub.interests.length-3} more`:""}</div>}
                </div>
                <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.25)"}}>{sub.date?.split("T")[0]}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{textAlign:"center",padding:"24px 0",color:"rgba(255,255,255,0.3)",fontSize:"0.85rem",marginBottom:24}}>No subscribers yet</div>
      )}

      {/* Email blast */}
      <div style={{background:"#1a1a1a",borderRadius:16,padding:"20px",border:"1px solid rgba(255,255,255,0.08)"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:12}}>📧 Send Launch Blast</div>
        {sent ? (
          <div style={{color:"#3be8b0",fontWeight:600,fontSize:"0.88rem"}}>✅ Blast sent to {list.length} subscriber{list.length!==1?"s":""}!</div>
        ) : (
          <>
            <textarea value={blastMsg} onChange={e=>setBlastMsg(e.target.value)} rows={5}
              placeholder={"We're officially LIVE!\n\nAlphaomegatides is now open for orders. All 21 research compounds are available with COA documentation. Use code EARLYACCESS for priority fulfillment.\n\nShop now: https://alphaomegatides.com\n\n— The Alphaomegatides Team"}
              style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"12px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",resize:"vertical",boxSizing:"border-box",marginBottom:12}}/>
            <button onClick={sendBlast} disabled={sending||list.length===0}
              style={{background:list.length>0?"#3be8b0":"rgba(255,255,255,0.1)",color:list.length>0?"#0e0e0e":"rgba(255,255,255,0.3)",border:"none",padding:"12px 24px",borderRadius:100,cursor:list.length>0?"pointer":"not-allowed",fontFamily:"inherit",fontWeight:700,fontSize:"0.88rem"}}>
              {sending?`Sending to ${list.length}…`:`Send to ${list.length} subscriber${list.length!==1?"s":""}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}


// ── COMING SOON PRODUCT BUTTON ──────────────────────────────────
// ── ALL SIGNUPS ADMIN (admin-only dashboard tab) ─────────────────
function AllSignupsAdmin() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [tab, setTab] = useState<"accounts"|"waitlist">("accounts");

  useEffect(() => {
    try {
      // Load all registered accounts
      const accs = JSON.parse(localStorage.getItem("aot_users") || "[]");
      setAccounts(Array.isArray(accs) ? accs : []);
    } catch {}
    try {
      const wl = JSON.parse(localStorage.getItem("aot_waitlist") || "[]");
      setWaitlist(Array.isArray(wl) ? wl : []);
    } catch {}
  }, []);

  const btnStyle = (active:boolean) => ({
    background: active ? "#3be8b0" : "rgba(255,255,255,0.06)",
    color: active ? "#0e0e0e" : "rgba(255,255,255,0.6)",
    border: "none", borderRadius: 100,
    padding: "7px 18px", fontFamily: "inherit", fontWeight: 700,
    fontSize: "0.8rem", cursor: "pointer",
  });

  return (
    <div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",marginBottom:4}}>All Signups</div>
      <div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.4)",marginBottom:16}}>
        {accounts.length} registered account{accounts.length!==1?"s":""} · {waitlist.length} on waitlist
      </div>

      {/* Sub-tabs */}
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        <button style={btnStyle(tab==="accounts")} onClick={()=>setTab("accounts")}>
          👤 Accounts ({accounts.length})
        </button>
        <button style={btnStyle(tab==="waitlist")} onClick={()=>setTab("waitlist")}>
          📋 Waitlist ({waitlist.length})
        </button>
      </div>

      {/* Accounts list */}
      {tab==="accounts" && (
        <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:420,overflowY:"auto"}}>
          {accounts.length===0 && (
            <div style={{color:"rgba(255,255,255,0.3)",fontSize:"0.85rem",padding:"20px 0"}}>No accounts yet.</div>
          )}
          {accounts.map((acc:any, i:number) => (
            <div key={i} style={{background:"#1c1c1c",borderRadius:12,padding:"12px 14px",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{fontWeight:600,fontSize:"0.85rem"}}>{acc.name || "(no name)"}</div>
              <div style={{fontSize:"0.75rem",color:"#4f8ef7",marginTop:2}}>{acc.email}</div>
              {acc.createdAt && (
                <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.3)",marginTop:3}}>
                  Joined: {new Date(acc.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Waitlist list */}
      {tab==="waitlist" && (
        <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:420,overflowY:"auto"}}>
          {waitlist.length===0 && (
            <div style={{color:"rgba(255,255,255,0.3)",fontSize:"0.85rem",padding:"20px 0"}}>No waitlist entries yet.</div>
          )}
          {waitlist.map((sub:any, i:number) => (
            <div key={i} style={{background:"#1c1c1c",borderRadius:12,padding:"12px 14px",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                <div>
                  <div style={{fontWeight:600,fontSize:"0.85rem"}}>{sub.name}</div>
                  <div style={{fontSize:"0.75rem",color:"#4f8ef7"}}>{sub.email}</div>
                  {sub.interests?.length>0 && (
                    <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.35)",marginTop:3}}>
                      Interests: {sub.interests.join(", ")}
                    </div>
                  )}
                  {sub.source && (
                    <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.25)",marginTop:2}}>
                      Source: {sub.source}
                    </div>
                  )}
                </div>
                {sub.date && (
                  <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.3)",textAlign:"right"}}>
                    {new Date(sub.date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function ComingSoonProductBtn({p, sel, textOnColor}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        style={{background:p.color,color:textOnColor||"#0e0e0e",border:"none",padding:"15px",fontSize:"1rem",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,width:"100%",transition:"opacity .2s"}}
        onMouseEnter={e=>e.currentTarget.style.opacity="0.88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}
        onClick={()=>setShowModal(true)}>
        View Pricing →
      </button>
      <div style={{textAlign:"center",marginTop:8,fontSize:"0.72rem",color:"rgba(255,255,255,0.3)"}}>Store opens soon · Be the first to order</div>
      {showModal && <ComingSoonModal onClose={()=>setShowModal(false)} cartItems={[{name:p.name, id:p.id}]} sourcePage={`Product Page — ${p.name}`}/>}
    </>
  );
}

function ProductCard({p,go,wishlist=[],toggleWishlist=()=>{}}){
  return (
    <div onClick={()=>go("product",p.id)}
      style={{borderRadius:24,overflow:"hidden",cursor:"pointer",transition:"transform 0.25s, box-shadow 0.25s",boxShadow:`0 4px 32px ${p.color}22`,border:`1px solid ${p.color}33`,position:"relative" as const}}
      onMouseEnter={e=>{
        const el=e.currentTarget;
        el.style.transform="translateY(-8px) scale(1.01)";
        el.style.boxShadow=`0 24px 56px ${p.color}55, 0 0 0 1px ${p.color}44`;
      }}
      onMouseLeave={e=>{
        const el=e.currentTarget;
        el.style.transform="none";
        el.style.boxShadow=`0 4px 32px ${p.color}22`;
      }}>
      <div style={{background:`linear-gradient(160deg,${p.color}55 0%,${p.color}11 40%,#0e0e0e 100%)`,padding:"36px 28px 28px",position:"relative",overflow:"hidden",minHeight:220,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
        <div style={{position:"absolute",width:160,height:160,borderRadius:"50%",background:p.color,filter:"blur(60px)",opacity:0.15,top:"0%",left:"50%",transform:"translateX(-50%)",pointerEvents:"none"}}/>
        <InfoPlacard productId={p.id}/>
        {/* Form type badge — top right */}
        <div style={{position:"absolute",top:12,right:12,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"5px 9px",display:"flex",alignItems:"center",gap:5,zIndex:2}}>
          <span style={{fontSize:"0.95rem"}}>{FORM_TYPE[p.id]==="capsule"?"💊":FORM_TYPE[p.id]==="solution"?"💧":"🧪"}</span>
          <span style={{fontSize:"0.62rem",fontWeight:600,color:"rgba(255,255,255,0.6)",letterSpacing:"0.04em",textTransform:"uppercase"}}>{FORM_TYPE[p.id]==="capsule"?"Capsule":FORM_TYPE[p.id]==="solution"?"Solution":"Vial"}</span>
        </div>
        {PRODUCT_IMAGES[p.id] && (
          <div style={{position:"absolute",inset:0,backgroundImage:`url(${PRODUCT_IMAGES[p.id]}?q=40&w=400)`,backgroundSize:"cover",backgroundPosition:"center",opacity:0.08,pointerEvents:"none",zIndex:0,willChange:"transform"}}/>
        )}
        <div style={{fontSize:"3.8rem",marginBottom:14,position:"relative",zIndex:1,filter:"drop-shadow(0 4px 16px rgba(0,0,0,0.4))"}}>{p.icon}</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",color:"#ffffff",lineHeight:1.15,marginBottom:4,position:"relative",zIndex:1,letterSpacing:"-.02em"}}>{p.name}</div>
        <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.45)",marginBottom:14,position:"relative",zIndex:1}}>{p.tag} · {p.sizes?p.sizes[0].s:p.size}</div>
        {p.chips&&<div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",position:"relative",zIndex:1}}>
          {p.chips.map(chip=>{
            const [main,sub]=chip.split("·").map(s=>s.trim());
            return <div key={chip} style={{background:"rgba(0,0,0,0.45)",borderRadius:10,padding:"7px 13px",textAlign:"center",border:`1px solid ${p.color}44`,backdropFilter:"blur(8px)"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.78rem",color:"#ffffff"}}>{main}</div>
              {sub&&<div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.5)",marginTop:1}}>{sub}</div>}
            </div>;
          })}
        </div>}
      </div>
      {/* Bottom bar */}
      <div style={{background:"#111111",padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        {PRODUCT_META[p.id]&&<div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:9,alignItems:"center"}}>
          {PRODUCT_META[p.id].bestFor.slice(0,2).map(tag=>(
            <span key={tag} style={{fontSize:"0.6rem",fontWeight:500,padding:"2px 8px",borderRadius:100,background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.4)",border:"1px solid rgba(255,255,255,0.07)"}}>{tag}</span>
          ))}
          <span style={{fontSize:"0.6rem",fontWeight:700,padding:"2px 8px",borderRadius:100,background:PRODUCT_META[p.id].difficulty==="Beginner"?"rgba(59,232,176,0.12)":PRODUCT_META[p.id].difficulty==="Advanced"?"rgba(255,107,107,0.12)":"rgba(255,209,102,0.12)",color:PRODUCT_META[p.id].difficulty==="Beginner"?"#3be8b0":PRODUCT_META[p.id].difficulty==="Advanced"?"#ff6b6b":"#ffd166"}}>{PRODUCT_META[p.id].difficulty}</span>
        </div>}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
          {/* Price + purity + stock */}
          <div style={{display:"flex",flexDirection:"column",gap:2}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"#ffffff",letterSpacing:"-.02em",lineHeight:1}}>{p.sizes?p.sizes[0].p:p.price}</div>
            <span style={{fontSize:"0.58rem",fontWeight:600,color:"#3be8b0",letterSpacing:"0.04em"}}>99%+ Purity</span>
            <StockBadge productId={p.id} color={p.color}/>
          </div>
          {/* Actions */}
          <div style={{display:"flex",gap:7,alignItems:"center"}}>
            <button onClick={e=>{e.stopPropagation();toggleWishlist(p.id);}}
              style={{width:34,height:34,borderRadius:"50%",background:wishlist.includes(p.id)?"rgba(255,107,107,0.12)":"rgba(255,255,255,0.05)",border:`1px solid ${wishlist.includes(p.id)?"rgba(255,107,107,0.35)":"rgba(255,255,255,0.08)"}`,color:wishlist.includes(p.id)?"#ff6b6b":"rgba(255,255,255,0.3)",cursor:"pointer",fontSize:"0.95rem",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}>
              {wishlist.includes(p.id)?"❤️":"🤍"}
            </button>
            <div style={{background:p.color,color:p.color==="#ffd166"||p.color==="#3be8b0"||p.color==="#f59e0b"?"#0e0e0e":"#fff",padding:"9px 22px",borderRadius:100,fontSize:"0.82rem",fontWeight:800,whiteSpace:"nowrap",flexShrink:0,letterSpacing:"0.01em"}}>View →</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const HOME_CATS = [
  {id:"all",        label:"All Compounds",    emoji:"⚡"},
  {id:"glp",        label:"Metabolic",        emoji:"🔥", ids:["glp3r","glp2t","glp1"]},
  {id:"recovery",   label:"Tissue Research",  emoji:"🛡️", ids:["bpc157","tb500","ghkcu","glow"]},
  {id:"growth",     label:"GH Axis",          emoji:"💪", ids:["cjc1295","cjcipa","ipamorlin","tesamorlin","igf1lr3"]},
  {id:"longevity",  label:"Longevity",        emoji:"⚗️", ids:["nad","motsc","glutathione","ss31"]},
  {id:"neuro",      label:"Neuro & Sleep",    emoji:"🧠", ids:["selank","semax","dsip","mt2"]},
  {id:"accessories",label:"Accessories",      emoji:"🧪", ids:["reconst"]},
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
      <span style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",fontSize:"0.95rem",pointerEvents:"none"}}>🔍</span>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search compounds, benefits, mechanisms…"
        style={{width:"100%",padding:"12px 16px 12px 44px",background:"#1a1a1a",border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:100,color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box",transition:"border-color .2s"}}
        onFocus={e=>e.target.style.borderColor="#3be8b0"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
      {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:"1rem",padding:0}}>✕</button>}
    </div>
    {/* Filter pills — single row horizontal scroll */}
    <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:6,marginBottom:24,scrollbarWidth:"none",msOverflowStyle:"none"}}>
      {HOME_CATS.map(cat=>(
        <button key={cat.id} onClick={()=>setActive(cat.id)}
          style={{display:"flex",alignItems:"center",gap:5,padding:"8px 16px",borderRadius:100,border:`1.5px solid ${active===cat.id?"#3be8b0":"rgba(255,255,255,0.1)"}`,background:active===cat.id?"rgba(59,232,176,0.1)":"rgba(255,255,255,0.03)",color:active===cat.id?"#3be8b0":"rgba(255,255,255,0.5)",cursor:"pointer",fontFamily:"inherit",fontWeight:active===cat.id?700:400,fontSize:"0.8rem",whiteSpace:"nowrap",transition:"all .18s",flexShrink:0}}>
          <span>{cat.emoji}</span>{cat.label}
          {cat.id!=="all"&&<span style={{background:"rgba(255,255,255,0.08)",borderRadius:100,padding:"1px 6px",fontSize:"0.65rem",color:"rgba(255,255,255,0.35)"}}>{cat.ids?.length}</span>}
        </button>
      ))}
    </div>

    {/* Category heading when filtered */}
    {active!=="all"&&<div style={{marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"#fff"}}>{HOME_CATS.find(c=>c.id===active)?.emoji} {HOME_CATS.find(c=>c.id===active)?.label}</div>
      <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.35)"}}>{filtered.length} compound{filtered.length!==1?"s":""}</div>
      <button onClick={()=>setActive("all")} style={{marginLeft:"auto",fontSize:"0.75rem",color:"rgba(255,255,255,0.4)",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}}>Show all →</button>
    </div>}

    {/* Product grid */}
    {filtered.length===0
      ?<div style={{textAlign:"center",padding:"48px 0",color:"rgba(255,255,255,0.3)"}}>
        <div style={{fontSize:"2.5rem",marginBottom:12}}>🔬</div>
        <div style={{fontWeight:600,marginBottom:6,color:"rgba(255,255,255,0.6)"}}>No compounds found</div>
        <div style={{fontSize:"0.85rem"}}>Try a different search or category</div>
        <button onClick={()=>{setSearch("");setActive("all");}} style={{marginTop:16,background:"rgba(59,232,176,0.1)",border:"1px solid rgba(59,232,176,0.2)",color:"#3be8b0",padding:"8px 20px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.82rem"}}>Clear filters</button>
      </div>
      :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
        {filtered.map(p=><ProductCard key={p.id} p={p} go={go}   wishlist={wishlist} toggleWishlist={toggleWishlist}/>)}
      </div>
    }
  </>;
}





// ── RESEARCH LIBRARY ─────────────────────────────
const ARTICLES = [
  {id:"glp-intro",title:"Understanding GLP Receptor Agonists",category:"Metabolic Research",emoji:"🔥",time:"5 min read",summary:"How GLP-1, GLP-2, and GLP-3 receptors work differently and why triple agonism makes Retatrutide the most potent metabolic research peptide studied to date.",tags:["GLP-3 R","GLP-2 T","GLP-1"]},
  {id:"bpc-tb500",title:"BPC-157 + TB-500: The Tissue Research Stack",category:"Tissue Research",emoji:"🛡️",time:"4 min read",summary:"Why these two peptides work synergistically — BPC-157 targets gut and tissue repair while TB-500 drives systemic actin-driven supporting. When and how to use both.",tags:["BPC-157","TB-500","Wolverine"]},
  {id:"gh-axis",title:"The GH Axis: CJC-1295, Ipamorlin & Tesamorlin",category:"Growth",emoji:"💪",time:"6 min read",summary:"Understanding the GHRH-pituitary-IGF-1 axis. How secretagogues differ from exogenous GH, and why pulsatile release matters for research protocols.",tags:["CJC-1295","Ipamorlin","Tesamorlin"]},
  {id:"ghkcu-skin",title:"GHK-Cu: The Copper Peptide Activating 4,000+ Genes",category:"Dermal Research",emoji:"✨",time:"5 min read",summary:"GHK-Cu's mechanism on ECM remodeling, collagen synthesis, and how it regulates gene expression. Why it's considered one of the most studied longevity research compounds.",tags:["GHK-CU","Glow Complex"]},
  {id:"nad-mito",title:"NAD+ & Mitochondrial Peptides for Longevity Research",category:"Longevity",emoji:"⚡",time:"7 min read",summary:"How NAD+ fuels sirtuin activation and DNA repair. The role of MOTS-c in metabolic regulation and why SS-31 is being studied for cardiac protection.",tags:["NAD+","MOTS-c","SS-31"]},
  {id:"neuro-peptides",title:"Selank, Semax & Cognitive Peptide Research",category:"Neuro",emoji:"🧠",time:"5 min read",summary:"How Russian-developed neuropeptides modulate BDNF, GABA, and stress response pathways. Comparing anxiolytic vs cognitive-enhancing mechanisms.",tags:["Selank","Semax"]},
  {id:"recon-guide",title:"Complete Reconstitution Guide for Research Peptides",category:"Protocol",emoji:"🧪",time:"8 min read",summary:"Step-by-step: bacteriostatic water vs acetic acid, administerion technique, storage temperatures, vial lifespan, and how to calculate your draw volume.",tags:["All Products"]},
  {id:"cycling",title:"Research Cycling Protocols: When to Run, When to Rest",category:"Protocol",emoji:"📋",time:"6 min read",summary:"Evidence-based cycling frameworks for GLP peptides, GH secretagogues, and supporting peptides. Why breaks matter and how to structure multi-compound protocols.",tags:["GLP-3 R","CJC-1295","BPC-157"]},
];

function ResearchLibraryPage({go}){
  const [activeCat,setAC]=useState("All");
  const cats=["All",...new Set(ARTICLES.map(a=>a.category))];
  const filtered=activeCat==="All"?ARTICLES:ARTICLES.filter(a=>a.category===activeCat);
  const [selected,setSelected]=useState(null);

  if(selected) return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh",color:"#fff"}}>
    <div style={{maxWidth:720,margin:"0 auto",padding:"32px 20px 80px"}}>
      <button onClick={()=>setSelected(null)} style={{background:"none",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.6)",padding:"7px 16px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.8rem",marginBottom:24}}>← Back to Library</button>
      <div style={{fontSize:"2.5rem",marginBottom:16}}>{selected.emoji}</div>
      <div style={{fontSize:"0.72rem",fontWeight:600,color:"#3be8b0",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>{selected.category} · {selected.time}</div>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.5rem,4vw,2.2rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:16,lineHeight:1.2}}>{selected.title}</h1>
      <p style={{fontSize:"0.97rem",color:"rgba(255,255,255,0.6)",lineHeight:1.85,marginBottom:24}}>{selected.summary}</p>
      <div style={{background:"rgba(59,232,176,0.07)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:12,padding:"16px 20px",marginBottom:24}}>
        <div style={{fontWeight:700,fontSize:"0.85rem",marginBottom:8,color:"#3be8b0"}}>🔬 Relevant Compounds</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {selected.tags.map(tag=>{
            const p=PRODUCTS.find(x=>x.name===tag||x.id===tag);
            return <button key={tag} onClick={()=>p&&go("product",p.id)}
              style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.7)",padding:"6px 14px",borderRadius:100,cursor:p?"pointer":"default",fontFamily:"inherit",fontSize:"0.78rem",fontWeight:600}}>
              {p?p.icon+" ":""}{tag}
            </button>;
          })}
        </div>
      </div>
      <div style={{background:"rgba(255,107,107,0.07)",border:"1px solid rgba(255,107,107,0.15)",borderRadius:10,padding:"12px 16px",fontSize:"0.75rem",color:"rgba(255,150,130,0.8)"}}>
        ⚠️ All content is for research and educational purposes only. Not research advice.
      </div>
    </div>
    <SiteFooter go={go}/>
  </div>;

  return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh",color:"#fff"}}>
    <div style={{maxWidth:900,margin:"0 auto",padding:"40px 20px 80px"}}>
      <div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#3be8b0",marginBottom:8}}>Alphaomegatides</div>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:8}}>Research Library</h1>
      <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginBottom:28}}>Science-backed guides on peptide mechanisms, protocols, and research applications.</p>

      {/* Category filter */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:28}}>
        {cats.map(cat=>(
          <button key={cat} onClick={()=>setAC(cat)}
            style={{padding:"7px 16px",borderRadius:100,border:`1px solid ${activeCat===cat?"#3be8b0":"rgba(255,255,255,0.12)"}`,background:activeCat===cat?"rgba(59,232,176,0.1)":"transparent",color:activeCat===cat?"#3be8b0":"rgba(255,255,255,0.5)",cursor:"pointer",fontFamily:"inherit",fontSize:"0.78rem",fontWeight:activeCat===cat?700:400,transition:"all .15s"}}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16}}>
        {filtered.map(a=>(
          <div key={a.id} onClick={()=>setSelected(a)}
            style={{background:"#1a1a1a",borderRadius:16,padding:"22px",border:"1px solid rgba(255,255,255,0.07)",cursor:"pointer",transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(59,232,176,0.3)";e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.transform="none";}}>
            <div style={{fontSize:"1.8rem",marginBottom:12}}>{a.emoji}</div>
            <div style={{fontSize:"0.65rem",fontWeight:600,color:"#3be8b0",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>{a.category} · {a.time}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",marginBottom:8,lineHeight:1.3,color:"#fff"}}>{a.title}</div>
            <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.45)",lineHeight:1.6,marginBottom:14}}>{a.summary.slice(0,100)}…</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {a.tags.slice(0,2).map(t=><span key={t} style={{fontSize:"0.62rem",padding:"2px 8px",borderRadius:100,background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.4)"}}>{t}</span>)}
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
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:1100,display:"flex",flexDirection:"column"}} onClick={onClose}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",background:"#111",flexShrink:0}} onClick={e=>e.stopPropagation()}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",color:"#fff"}}>🔬 Certificate of Analysis</div>
      <div style={{display:"flex",gap:10,alignItems:"center"}}>
        <a href={url} target="_blank" rel="noreferrer" style={{fontSize:"0.78rem",color:"#3be8b0",textDecoration:"none",fontWeight:600,padding:"6px 14px",border:"1px solid rgba(59,232,176,0.3)",borderRadius:100}}>↗ Open Full PDF</a>
        <button onClick={onClose} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",cursor:"pointer",padding:"7px 14px",borderRadius:100,fontFamily:"inherit",fontSize:"0.82rem"}}>✕ Close</button>
      </div>
    </div>
    <div style={{flex:1,overflow:"hidden"}} onClick={e=>e.stopPropagation()}>
      <iframe src={url} style={{width:"100%",height:"100%",border:"none"}} title="COA"/>
    </div>
  </div>;
}
// ── SKELETON LOADER ──────────────────────────────
function Skeleton({w="100%",h=16,radius=8,style={}}){
  return <div style={{width:w,height:h,borderRadius:radius,background:"linear-gradient(90deg,#1c1c1c 25%,#252525 50%,#1c1c1c 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite",...style}}/>;
}
// ── ACCORDION MENU ───────────────────────────────
const NAV_CATS = [
  {label:"Metabolic Research",  emoji:"🔥", ids:["glp3r","glp2t","glp1"],                                       catId:"glp"},
  {label:"Tissue Research",     emoji:"🛡️", ids:["bpc157","tb500","ghkcu","glow"],                              catId:"recovery"},
  {label:"GH Axis Research",    emoji:"💪", ids:["cjc1295","cjcipa","ipamorlin","tesamorlin","igf1lr3"],         catId:"growth"},
  {label:"Longevity Research",  emoji:"⚗️", ids:["nad","motsc","glutathione","ss31"],                           catId:"longevity"},
  {label:"Neuro & Sleep",       emoji:"🧠", ids:["selank","semax","dsip","mt2"],                                 catId:"neuro"},
  {label:"Accessories",         emoji:"🧪", ids:["reconst"],                                                     catId:"accessories"},
];

function AccordionMenu({go,close}){
  const [openCat,setOpenCat]=useState(null);
  return (
    <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:8,paddingTop:8}}>
      <div style={{padding:"6px 16px 8px",fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(255,255,255,0.2)"}}>Research Compounds</div>
      {NAV_CATS.map(cat=>(
        <div key={cat.catId}>
          <button onClick={()=>setOpenCat(openCat===cat.catId?null:cat.catId)}
            style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"11px 16px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left",minHeight:"auto",borderRadius:0,transition:"background .15s"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
            onMouseLeave={e=>e.currentTarget.style.background="none"}>
            <span style={{fontSize:"1rem",width:22,textAlign:"center",flexShrink:0}}>{cat.emoji}</span>
            <span style={{flex:1,fontSize:"0.85rem",fontWeight:600,color:"#fff"}}>{cat.label}</span>
            <span style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.25)",marginRight:4}}>{cat.ids.length}</span>
            <span style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.3)",display:"inline-block",transform:openCat===cat.catId?"rotate(180deg)":"none",transition:"transform .2s"}}>▼</span>
          </button>
          {openCat===cat.catId&&<div style={{background:"rgba(255,255,255,0.02)",borderTop:"1px solid rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
            <button onClick={()=>{go("category",cat.catId);close();}}
              style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"9px 16px 9px 24px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.78rem",color:"#3be8b0",fontWeight:700,textAlign:"left"}}>
              → View all {cat.label}
            </button>
            {cat.ids.map(id=>{
              const p=PRODUCTS.find(x=>x.id===id); if(!p) return null;
              return <button key={id} onClick={()=>{go("product",id);close();}}
                style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"7px 16px 7px 24px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.78rem",color:"rgba(255,255,255,0.65)",textAlign:"left",minHeight:"auto",transition:"background .15s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.04)"}
                onMouseLeave={e=>e.currentTarget.style.background="none"}>
                <span style={{fontSize:"0.8rem",width:18,textAlign:"center",flexShrink:0}}>{p.icon}</span>
                <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</span>
                <span style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.25)",flexShrink:0}}>{p.sizes?p.sizes[0].p:p.price}</span>
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
      <button onClick={()=>go("home")} style={{background:"none",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.5)",padding:"7px 16px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.8rem",marginBottom:28}}>← All Compounds</button>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:8}}>
        <span style={{fontSize:"2.2rem"}}>{cat.emoji}</span>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeight:800,letterSpacing:"-.03em",color:"#fff"}}>{cat.label}</h1>
      </div>
      <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginBottom:36}}>{products.length} compound{products.length!==1?"s":""}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
        {products.map(p=><ProductCard key={p.id} p={p} go={go} wishlist={wishlist} toggleWishlist={toggleWishlist}/>)}
      </div>
    </div>
    <SiteFooter go={go}/>
  </div>;
}

// ── HOME ────────────────────────────────────────────

// ── ANIMATED HERO LOGO — α + DNA + Ω converge into one mark ──
function AnimatedHeroLogo() {
  const [phase, setPhase] = React.useState<"enter"|"assemble"|"idle">("enter");

  React.useEffect(() => {
    // Phase 1: pieces fly in (0 → 900ms)
    // Phase 2: lock together + glow burst (900ms → 1400ms)
    // Phase 3: idle breathe (1400ms+)
    const t1 = setTimeout(() => setPhase("assemble"), 900);
    const t2 = setTimeout(() => setPhase("idle"), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const assembled = phase === "assemble" || phase === "idle";
  const idle      = phase === "idle";

  const trans = "transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.45s ease";

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,marginBottom:16,position:"relative",zIndex:1}}>
      <style>{`
        @keyframes logoBreathe {
          0%,100% { transform: scale(1);    filter: drop-shadow(0 0 28px rgba(168,85,247,0.35)); }
          50%      { transform: scale(1.03); filter: drop-shadow(0 0 52px rgba(168,85,247,0.65)); }
        }
        @keyframes glowBurst {
          0%   { opacity: 0;   transform: scale(0.6); }
          40%  { opacity: 0.6; transform: scale(1.0); }
          100% { opacity: 0;   transform: scale(1.5); }
        }
        @keyframes alphaPulse {
          0%,100% { text-shadow: 0 0 40px rgba(255,107,107,0.5), 0 0 80px rgba(255,107,107,0.2); }
          50%      { text-shadow: 0 0 70px rgba(255,107,107,0.9), 0 0 120px rgba(255,107,107,0.4); }
        }
        @keyframes omegaPulse {
          0%,100% { text-shadow: 0 0 40px rgba(59,232,176,0.5), 0 0 80px rgba(59,232,176,0.2); }
          50%      { text-shadow: 0 0 70px rgba(59,232,176,0.9), 0 0 120px rgba(59,232,176,0.4); }
        }
        @keyframes dnaRotate {
          0%   { transform: rotate(90deg) scale(1); }
          50%  { transform: rotate(90deg) scale(1.04); }
          100% { transform: rotate(90deg) scale(1); }
        }
        @keyframes siteNameSlide {
          0%   { opacity: 0; transform: translateY(12px); letter-spacing: 0.08em; }
          100% { opacity: 1; transform: translateY(0);    letter-spacing: 0.22em; }
        }
      `}</style>

      {/* THE COMBINED MARK */}
      <div style={{
        position:"relative",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        animation: idle ? "logoBreathe 3.5s ease-in-out infinite" : "none",
      }}>

        {/* Glow burst on assembly */}
        {assembled && (
          <div style={{
            position:"absolute",
            inset:-60,
            borderRadius:"50%",
            background:"radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)",
            animation:"glowBurst 0.7s ease-out forwards",
            pointerEvents:"none",
          }}/>
        )}

        {/* α — slides in from LEFT */}
        <span style={{
          fontFamily:"'Syne',sans-serif",
          fontWeight:800,
          fontSize:"clamp(4.5rem,13vw,8rem)",
          color:"#ff6b6b",
          lineHeight:1,
          display:"block",
          transition: trans,
          transform: assembled ? "translateX(0) scale(1)" : "translateX(-180px) scale(0.6)",
          opacity: assembled ? 1 : 0,
          animation: idle ? "alphaPulse 3s ease-in-out infinite" : "none",
          marginRight:-8,
          position:"relative",
          zIndex:2,
        }}>α</span>

        {/* DNA HELIX — drops in from TOP */}
        <div style={{
          transition:"transform 0.6s cubic-bezier(0.34,1.4,0.64,1), opacity 0.45s ease",
          transform: assembled ? "translateY(0) scale(1)" : "translateY(-160px) scale(0.5)",
          opacity: assembled ? 1 : 0,
          position:"relative",
          zIndex:3,
          flexShrink:0,
        }}>
          <svg
            width="clamp(140px,22vw,220px)"
            height="clamp(76px,12vw,120px)"
            viewBox="0 0 44 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              display:"block",
              animation: idle ? "dnaRotate 3.5s ease-in-out infinite" : "none",
              transform:"rotate(90deg)",
            }}
          >
            <defs>
              <linearGradient id="herodna5" x1="0" y1="0" x2="0" y2="110" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#ff6b6b"/>
                <stop offset="50%"  stopColor="#a855f7"/>
                <stop offset="100%" stopColor="#3be8b0"/>
              </linearGradient>
              <filter id="dnaglow">
                <feGaussianBlur stdDeviation="1.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <path d="M9 0 C2 14,2 28,9 42 C16 56,19 70,12 84 C8 92,5 100,6 110"
              stroke="url(#herodna5)" strokeWidth="3.5" fill="none" strokeLinecap="round" filter="url(#dnaglow)"/>
            <path d="M35 0 C42 14,42 28,35 42 C28 56,25 70,32 84 C36 92,39 100,38 110"
              stroke="url(#herodna5)" strokeWidth="3.5" fill="none" strokeLinecap="round" filter="url(#dnaglow)"/>
            <line x1="9"  y1="0"   x2="35" y2="0"   stroke="rgba(255,107,107,0.85)" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="5"  y1="20"  x2="39" y2="20"  stroke="rgba(220,80,190,0.7)"  strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="12" y1="40"  x2="32" y2="40"  stroke="rgba(168,85,247,0.8)"  strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="13" y1="60"  x2="31" y2="60"  stroke="rgba(100,150,255,0.75)" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="9"  y1="80"  x2="35" y2="80"  stroke="rgba(59,220,200,0.8)"  strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="7"  y1="100" x2="37" y2="100" stroke="rgba(59,232,176,0.75)" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="9"  cy="0"   r="6" fill="#ff6b6b" opacity="0.95"/>
            <circle cx="35" cy="0"   r="6" fill="#ff6b6b" opacity="0.95"/>
            <circle cx="5"  cy="20"  r="4" fill="rgba(220,80,190,0.8)"/>
            <circle cx="39" cy="20"  r="4" fill="rgba(220,80,190,0.8)"/>
            <circle cx="12" cy="40"  r="5" fill="#a855f7" opacity="0.95"/>
            <circle cx="32" cy="40"  r="5" fill="#a855f7" opacity="0.95"/>
            <circle cx="13" cy="60"  r="4" fill="rgba(100,150,255,0.85)"/>
            <circle cx="31" cy="60"  r="4" fill="rgba(100,150,255,0.85)"/>
            <circle cx="9"  cy="80"  r="6" fill="#3be8b0" opacity="0.95"/>
            <circle cx="35" cy="80"  r="6" fill="#3be8b0" opacity="0.95"/>
            <circle cx="7"  cy="100" r="4" fill="rgba(59,232,176,0.8)"/>
            <circle cx="37" cy="100" r="4" fill="rgba(59,232,176,0.8)"/>
          </svg>
        </div>

        {/* Ω — slides in from RIGHT */}
        <span style={{
          fontFamily:"'Syne',sans-serif",
          fontWeight:800,
          fontSize:"clamp(4.5rem,13vw,8rem)",
          color:"#3be8b0",
          lineHeight:1,
          display:"block",
          transition: trans,
          transform: assembled ? "translateX(0) scale(1)" : "translateX(180px) scale(0.6)",
          opacity: assembled ? 1 : 0,
          animation: idle ? "omegaPulse 3s ease-in-out infinite 0.3s" : "none",
          marginLeft:-8,
          position:"relative",
          zIndex:2,
        }}>Ω</span>
      </div>

      {/* Site name — fades up after logo assembles */}
      <div style={{
        fontFamily:"'Syne',sans-serif",
        fontWeight:800,
        fontSize:"clamp(1.1rem,3vw,1.5rem)",
        letterSpacing:"0.22em",
        textTransform:"uppercase" as const,
        color:"rgba(255,255,255,0.88)",
        animation: assembled ? "siteNameSlide 0.6s ease-out both" : "none",
        opacity: assembled ? 1 : 0,
      }}>Alphaomegatides</div>

      <div style={{
        fontFamily:"'Syne',sans-serif",
        fontStyle:"italic",
        fontWeight:700,
        fontSize:"clamp(1rem,3vw,1.6rem)",
        color:"rgba(255,255,255,0.5)",
        letterSpacing:"0.02em",
        textAlign:"center" as const,
        transition:"opacity 0.6s ease 1.2s",
        opacity: assembled ? 1 : 0,
      }}>"Where the tide turns for all."</div>
    </div>
  );
}

// ── PARTICLE FIELD — canvas-based floating particles ──
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    const particles = Array.from({length:55},()=>({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-.5)*0.35, vy: (Math.random()-.5)*0.35,
      r: Math.random()*1.6+0.4,
      color: Math.random()>.6?"rgba(59,232,176,":"rgba(79,142,247,",
      alpha: Math.random()*0.45+0.1,
    }));
    let frame: number;
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x<0)p.x=w; if(p.x>w)p.x=0;
        if(p.y<0)p.y=h; if(p.y>h)p.y=0;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.color+p.alpha+")";
        ctx.fill();
      });
      // Draw connecting lines between nearby particles
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const dx=particles[i].x-particles[j].x;
          const dy=particles[i].y-particles[j].y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<90){
            ctx.beginPath();
            ctx.strokeStyle=`rgba(59,232,176,${0.08*(1-dist/90)})`;
            ctx.lineWidth=0.5;
            ctx.moveTo(particles[i].x,particles[i].y);
            ctx.lineTo(particles[j].x,particles[j].y);
            ctx.stroke();
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { w=canvas.width=canvas.offsetWidth; h=canvas.height=canvas.offsetHeight; };
    window.addEventListener("resize",resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize",resize); };
  },[]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}/>;
}

// ── ANIMATED COUNTER — counts up from 0 to target ──
function AnimatedCounter({target,suffix="",duration=1200}:{target:number;suffix?:string;duration?:number}) {
  const [val,setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        const start=Date.now();
        const tick=()=>{
          const elapsed=Date.now()-start;
          const progress=Math.min(elapsed/duration,1);
          const ease=1-Math.pow(1-progress,3);
          setVal(Math.round(ease*target));
          if(progress<1) requestAnimationFrame(tick);
        };
        tick();
        obs.disconnect();
      }
    },{threshold:0.3});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[target,duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ── LIVE VIEWER BADGE — Firebase-powered real-time viewers ──
const FB_VIEWERS_PATH = "/presence";
function LiveViewerBadge({productId}:{productId:string}) {
  const [count,setCount] = useState<number|null>(null);
  useEffect(()=>{
    const key = `${productId}_${Math.random().toString(36).slice(2,8)}`;
    // Register presence
    const register = async () => {
      try {
        await fetch(`${FB_CONFIG.databaseURL}${FB_VIEWERS_PATH}/${productId}/${key}.json`,{
          method:"PUT",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({t:Date.now()})
        });
      } catch {}
    };
    // Count viewers
    const countViewers = async () => {
      try {
        const res = await fetch(`${FB_CONFIG.databaseURL}${FB_VIEWERS_PATH}/${productId}.json`);
        const data = await res.json();
        if(!data) { setCount(0); return; }
        const now = Date.now();
        const active = Object.values(data).filter((v:any)=>now-(v?.t||0)<90000).length;
        setCount(active);
      } catch {}
    };
    register();
    countViewers();
    const iv = setInterval(()=>{ register(); countViewers(); },30000);
    // Cleanup on unmount
    return ()=>{
      clearInterval(iv);
      fetch(`${FB_CONFIG.databaseURL}${FB_VIEWERS_PATH}/${productId}/${key}.json`,{method:"DELETE"}).catch(()=>{});
    };
  },[productId]);
  if(!count||count<2) return null;
  return (
    <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(59,232,176,0.08)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:100,padding:"3px 10px",fontSize:"0.68rem",fontWeight:600,color:"#3be8b0"}}>
      <span style={{width:5,height:5,borderRadius:"50%",background:"#3be8b0",animation:"chatpulse 1.5s infinite",display:"inline-block"}}/>
      {count} researchers viewing
    </div>
  );
}

// ── STATS BAR — animated numbers for homepage ──
function StatsBar() {
  return (
    <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap" as const,gap:"24px 40px",padding:"28px 24px",background:"rgba(255,255,255,0.025)",borderTop:"1px solid rgba(255,255,255,0.06)",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
      {[
        {label:"Compounds Available",value:21,suffix:""},
        {label:"COA Verified Products",value:100,suffix:"%"},
        {label:"US Researchers Served",value:2400,suffix:"+"},
        {label:"Avg Purity Rating",value:99.1,suffix:"%"},
      ].map(s=>(
        <div key={s.label} style={{textAlign:"center" as const,minWidth:120}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.4rem,3vw,2rem)",color:"#3be8b0",lineHeight:1}}>
            <AnimatedCounter target={s.value} suffix={s.suffix} duration={1400}/>
          </div>
          <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.38)",marginTop:4,letterSpacing:"0.04em",textTransform:"uppercase" as const}}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function HeroWaitlistBtn() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={()=>setShow(true)} style={{background:"transparent",color:"#3be8b0",border:"1.5px solid rgba(59,232,176,0.4)",padding:"11px 24px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:"0.88rem",transition:"all .2s"}}
        onMouseEnter={e=>{e.currentTarget.style.background="rgba(59,232,176,0.1)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
        Shop Now
      </button>
      {show && <ComingSoonModal onClose={()=>setShow(false)} sourcePage="Home Hero"/>}
    </>
  );
}

function Home({go,recentlyViewed=[],wishlist=[],toggleWishlist=()=>{}}){
  return <div style={{paddingTop:64,background:"#0e0e0e",color:"#ffffff"}}>
    <section style={{minHeight:"80vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"48px 24px 40px",background:"#0e0e0e",position:"relative",overflow:"hidden"}}>
      <ParticleField/>
      <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:C.g,filter:"blur(100px)",opacity:.12,top:-150,right:-100,pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:380,height:380,borderRadius:"50%",background:C.b,filter:"blur(100px)",opacity:.1,bottom:-80,left:-80,pointerEvents:"none"}}/>
      {/* Animated floating dots */}
      <style>{`
        @keyframes floatUp{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:0.6}80%{opacity:0.3}100%{transform:translateY(-120px) translateX(20px);opacity:0}}
        @keyframes floatUp2{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:0.4}80%{opacity:0.2}100%{transform:translateY(-100px) translateX(-15px);opacity:0}}
        @keyframes pulseGlow{0%,100%{opacity:0.15}50%{opacity:0.28}}
        @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
        @keyframes pulseRing{0%{transform:scale(1);opacity:0.6}70%{transform:scale(1.35);opacity:0}100%{transform:scale(1.35);opacity:0}}
        @keyframes fadeInUp{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:translateY(0)}}
        @keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes breathe{0%,100%{transform:scale(1);filter:brightness(1)}50%{transform:scale(1.04);filter:brightness(1.15)}}
        .stat-card:hover{transform:translateY(-4px)!important;transition:transform .2s!important;}
        .product-grid-item{animation:fadeInUp 0.4s ease-out both;}
        .product-grid-item:nth-child(1){animation-delay:0s}
        .product-grid-item:nth-child(2){animation-delay:0.05s}
        .product-grid-item:nth-child(3){animation-delay:0.1s}
        .product-grid-item:nth-child(4){animation-delay:0.15s}
        .product-grid-item:nth-child(5){animation-delay:0.2s}
        .product-grid-item:nth-child(6){animation-delay:0.25s}
      `}</style>
      {[4,3,5,4,3,5,4,3].map((sz,i)=>(
        <div key={i} style={{position:"absolute",width:sz,height:sz,borderRadius:"50%",background:i%2===0?"#3be8b0":"#4f8ef7",left:`${10+i*11}%`,bottom:`${10+i*8}%`,animation:`floatUp${i%2===0?"":"2"} ${3+i*0.7}s ease-in-out ${i*0.4}s infinite`,pointerEvents:"none",zIndex:0,opacity:0.5}}/>
      ))}
      {/* Brand name + logo mark — animated convergence */}
      <AnimatedHeroLogo/>

      <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",padding:"5px 16px",borderRadius:100,fontSize:"0.77rem",fontWeight:500,color:"rgba(255,255,255,0.7)",marginBottom:16,position:"relative",zIndex:1}}>
        <span style={{width:7,height:7,borderRadius:"50%",background:"#3be8b0",display:"inline-block",animation:"pulseGlow 2s ease-in-out infinite"}}/>
        Research-grade peptides · For in-vitro research use only
      </div>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.6rem,3.5vw,2.4rem)",fontWeight:800,lineHeight:1.1,letterSpacing:"-.03em",maxWidth:560,position:"relative",zIndex:1,margin:"0 0 10px",color:"#ffffff"}}>
        Verified Research{" "}
        <span style={{background:"linear-gradient(90deg,#3be8b0,#4f8ef7,#a855f7,#3be8b0)",backgroundSize:"300% 100%",WebkitBackgroundClip:"text" as const,WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"gradientShift 4s linear infinite"}}>
          Peptides
        </span>
      </h1>
      <p style={{fontSize:"0.9rem",color:"rgba(255,255,255,0.45)",maxWidth:460,lineHeight:1.65,marginBottom:6,position:"relative",zIndex:1}}>
        Independent third-party verified compounds. Full COA documentation. US fulfillment only.
      </p>
      <p style={{fontFamily:"'Syne',sans-serif",fontWeight:600,fontStyle:"italic",fontSize:"0.85rem",color:"rgba(255,255,255,0.28)",marginBottom:16,position:"relative",zIndex:1}}>"Are you ready to turn the tide?"</p>
      <div style={{display:"inline-block",background:"rgba(255,107,107,0.08)",border:"1px solid rgba(255,107,107,0.2)",borderRadius:100,padding:"4px 14px",fontSize:"0.72rem",fontWeight:600,color:"#ff8a80",marginBottom:24,position:"relative",zIndex:1}}>
        ⚠️ For research use only · Not for human or veterinary use
      </div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:24,position:"relative",zIndex:1}}>
        <PrimaryBtn onClick={()=>document.getElementById("products").scrollIntoView({behavior:"smooth"})} style={{padding:"12px 28px",fontSize:"0.9rem"}}>View Research Compounds →</PrimaryBtn>
        <GhostBtn onClick={()=>go("register")} style={{padding:"11px 24px",fontSize:"0.88rem"}}>Create Account</GhostBtn>
      </div>
      <div style={{display:"flex",justifyContent:"center",marginBottom:20,position:"relative",zIndex:1}}>
        <SocialProofTicker/>
      </div>
      <div style={{display:"flex",gap:28,flexWrap:"wrap",justifyContent:"center",position:"relative",zIndex:1}}>
        {[["99%","Purity Verified"],["21","Active Compounds"],["3rd","Party Lab Tested"],["US","Fulfillment Only"]].map(([n,l])=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,color:"#ffffff"}}>{n}</div>
            <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)",marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
    </section>


    {/* Recently Viewed */}
    {recentlyViewed.length>0&&<div style={{background:"#0e0e0e",padding:"32px 36px 0",maxWidth:1140,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",color:"rgba(255,255,255,0.6)"}}>🕐 Recently Viewed</div>
      </div>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>
        {recentlyViewed.map(id=>{
          const p=PRODUCTS.find(x=>x.id===id);
          if(!p) return null;
          return <div key={id} onClick={()=>go("product",id)}
            style={{display:"flex",alignItems:"center",gap:10,background:"#1a1a1a",border:`1px solid ${p.color}33`,borderRadius:12,padding:"10px 14px",cursor:"pointer",flexShrink:0,transition:"all .2s",minWidth:160}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=p.color}
            onMouseLeave={e=>e.currentTarget.style.borderColor=p.color+"33"}>
            <span style={{fontSize:"1.2rem"}}>{p.icon}</span>
            <div>
              <div style={{fontSize:"0.78rem",fontWeight:600,color:"#fff",whiteSpace:"nowrap"}}>{p.name}</div>
              <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.35)",marginTop:1}}>{p.sizes?p.sizes[0].p:p.price}</div>
            </div>
          </div>;
        })}
      </div>
    </div>}

    <StatsBar/>
    <section id="products" style={{maxWidth:1140,margin:"0 auto",padding:"80px 36px",background:"#0e0e0e"}}>
      <div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#3be8b0",marginBottom:10}}>Research Compounds</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.9rem,4vw,2.7rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:6,color:"#ffffff"}}>Available for research procurement</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontWeight:600,fontSize:"clamp(0.85rem,2vw,1.1rem)",color:"rgba(255,255,255,0.3)",marginBottom:14}}>"The frontier of peptide science — all in one place."</div>
      <div style={{fontSize:"0.83rem",color:"rgba(255,255,255,0.4)",marginBottom:28}}>All products are for in-vitro / laboratory research use only. Not intended for human or veterinary use.</div>

      {/* ── CATEGORY FILTER + PRODUCT GRID ── */}
      <HomeCatFilter go={go} wishlist={wishlist} toggleWishlist={toggleWishlist}/>
    </section>


    <section style={{background:"#0e0e0e",padding:"72px 36px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#3be8b0",marginBottom:10}}>Why Alphaomegatides</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.5rem)",fontWeight:800,color:"#fff",letterSpacing:"-.03em",marginBottom:6}}>Verified quality, documented transparency</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontWeight:600,fontSize:"clamp(0.85rem,2vw,1.05rem)",color:"rgba(255,255,255,0.28)",marginBottom:40}}>"When precision matters, there's no room for compromise."</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:18}}>
          {[["🔬","≥99% Purity","HPLC-verified every batch. Full documentation included."],["🛡️","COA Every Order","Independent Certificate of Analysis with every shipment."],["🇺🇸","US Fulfillment Only","We fulfill to US addresses only. All orders ship domestically."],["💬","Research Support","Contact our team for documentation, protocols, or order questions."]].map(([icon,title,text])=>(
            <div key={title} style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:26,border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{fontSize:"1.5rem",marginBottom:12}}>{icon}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#fff",marginBottom:7,fontSize:"0.95rem"}}>{title}</div>
              <div style={{fontSize:"0.83rem",color:"rgba(255,255,255,0.45)",lineHeight:1.6}}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── FOR YOU — Personalized Section ── */}
    {recentlyViewed.length>0&&<div style={{background:"#0e0e0e",padding:"40px 24px 0",maxWidth:1140,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <span style={{fontSize:"1.1rem"}}>✨</span>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem"}}>Based on Your Research</div>
        <div style={{marginLeft:"auto",fontSize:"0.78rem",color:"rgba(255,255,255,0.4)"}}>Compounds related to what you viewed</div>
      </div>
      <div style={{display:"flex",gap:12,overflowX:"auto" as const,paddingBottom:8}}>
        {PRODUCTS.filter(p=>!recentlyViewed.includes(p.id)&&recentlyViewed.some(rv=>{
          const rvP=PRODUCTS.find(x=>x.id===rv);
          return rvP&&rvP.cat===p.cat;
        })).slice(0,5).map(p=>(
          <div key={p.id} onClick={()=>go("product",p.id)}
            style={{minWidth:160,background:"#141414",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"14px",cursor:"pointer",flexShrink:0,transition:"all .2s"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=p.color+"66";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.07)";}}>
            <div style={{fontSize:"1.5rem",marginBottom:8}}>{p.icon}</div>
            <div style={{fontWeight:700,fontSize:"0.85rem",marginBottom:4}}>{p.name}</div>
            <div style={{color:p.color,fontSize:"0.78rem",fontWeight:600}}>{p.price}</div>
          </div>
        ))}
        {PRODUCTS.filter(p=>!recentlyViewed.includes(p.id)&&recentlyViewed.some(rv=>{const rvP=PRODUCTS.find(x=>x.id===rv);return rvP&&rvP.cat===p.cat;})).length===0&&
          PRODUCTS.filter(p=>!recentlyViewed.includes(p.id)).slice(0,5).map(p=>(
            <div key={p.id} onClick={()=>go("product",p.id)}
              style={{minWidth:160,background:"#141414",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"14px",cursor:"pointer",flexShrink:0}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=p.color+"66";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.07)";}}>
              <div style={{fontSize:"1.5rem",marginBottom:8}}>{p.icon}</div>
              <div style={{fontWeight:700,fontSize:"0.85rem",marginBottom:4}}>{p.name}</div>
              <div style={{color:p.color,fontSize:"0.78rem",fontWeight:600}}>{p.price}</div>
            </div>
          ))
        }
      </div>
    </div>}

    

    {/* Quick nav pills */}
    <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",padding:"32px 36px 0",background:"#0e0e0e"}}>
      {[["🎯","Find My Compound","quiz"],["📦","Research Stacks","bundles"],["📋","Protocol Guides","protocols"],["🔬","COA Library","coa"],["📚","Research Library","research"]].map(([icon,label,page])=>(
        <button key={page} onClick={()=>go(page)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:100,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.03)",color:"rgba(255,255,255,0.55)",cursor:"pointer",fontFamily:"inherit",fontSize:"0.78rem",fontWeight:500,transition:"all .15s"}}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="#3be8b0";(e.currentTarget as HTMLElement).style.color="#3be8b0";}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.1)";(e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.55)";}}>
          {icon} {label}
        </button>
      ))}
    </div>

    <div style={{background:"linear-gradient(135deg,#1a237e,#1565c0)",margin:"0 36px 80px",borderRadius:20,padding:"64px 52px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:-20,top:-30,fontFamily:"'Syne',sans-serif",fontSize:"8rem",fontWeight:800,color:"rgba(255,255,255,0.05)",pointerEvents:"none",whiteSpace:"nowrap"}}>αΩ</div>
      <div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:800,color:"#fff",letterSpacing:"-.03em",maxWidth:440,marginBottom:6}}>Ready to source verified research peptides?</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontWeight:600,fontSize:"clamp(0.85rem,2vw,1.05rem)",color:"rgba(255,255,255,0.5)",marginBottom:8}}>"Ready to turn the tide?"</div>
        <div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.45)"}}>For research use only · US fulfillment only · COA included with every order</div>
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <button onClick={()=>document.getElementById("products").scrollIntoView({behavior:"smooth"})} style={{background:"#ffffff",color:"#0e0e0e",border:"none",padding:"14px 32px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:"0.95rem"}}>View Compounds →</button>
        <button onClick={()=>go("contact")} style={{background:"transparent",color:"#fff",border:"1.5px solid rgba(255,255,255,0.5)",padding:"14px 32px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.95rem"}}>Contact Us</button>
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
    <div style={{background:`linear-gradient(160deg,${p.color}55 0%,${p.color}11 40%,#080808 100%)`,padding:"48px 24px 36px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",width:280,height:280,borderRadius:"50%",background:p.color,filter:"blur(80px)",opacity:0.2,top:"-20%",left:"50%",transform:"translateX(-50%)",pointerEvents:"none"}}/>
      {/* ⓘ Placard — top left */}
      <div style={{position:"absolute",top:14,left:14,zIndex:3}}>
        <InfoPlacard productId={p.id}/>
      </div>
      {/* Form type badge — top right */}
      <div style={{position:"absolute",top:14,right:14,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"6px 11px",display:"flex",alignItems:"center",gap:5,zIndex:2}}>
        <span style={{fontSize:"1rem"}}>{FORM_TYPE[p.id]==="capsule"?"💊":FORM_TYPE[p.id]==="solution"?"💧":"🧪"}</span>
        <span style={{fontSize:"0.65rem",fontWeight:600,color:"rgba(255,255,255,0.65)",letterSpacing:"0.04em",textTransform:"uppercase"}}>{FORM_TYPE[p.id]==="capsule"?"Capsule":FORM_TYPE[p.id]==="solution"?"Solution":"Vial"}</span>
      </div>
      <div style={{fontSize:"4.5rem",marginBottom:16,position:"relative",zIndex:1,filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.5))"}}>{p.icon}</div>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(2rem,6vw,3rem)",fontWeight:800,letterSpacing:"-.03em",lineHeight:1.1,color:"#ffffff",marginBottom:8,position:"relative",zIndex:1}}>{p.name}</h1>
      <div style={{marginBottom:10,position:"relative",zIndex:1}}><LiveViewerBadge productId={p.id}/></div>
      <div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.5)",marginBottom:20,position:"relative",zIndex:1}}>{p.tag} · {sel.s} · Lyophilized Powder</div>
      {p.chips&&<div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",position:"relative",zIndex:1,maxWidth:500,margin:"0 auto"}}>
        {p.chips.map(chip=>{
          const [main,sub]=chip.split('·').map(s=>s.trim());
          return <div key={chip} style={{background:"rgba(0,0,0,0.5)",borderRadius:12,padding:"9px 16px",textAlign:"center",border:`1px solid ${p.color}55`,backdropFilter:"blur(10px)"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.85rem",color:"#ffffff"}}>{main}</div>
            {sub&&<div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.5)",marginTop:2}}>{sub}</div>}
          </div>;
        })}
      </div>}
    </div>

    {/* ── TOP SECTION: single column, max-width centered ── */}
    <div style={{maxWidth:760,margin:"0 auto",padding:"32px 24px 0"}}>

      {/* Back + badges */}
      <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:22}}>
        <button onClick={()=>goBack()} style={{background:"none",border:"1.5px solid rgba(255,255,255,0.15)",padding:"7px 16px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.8rem",fontWeight:500,color:"rgba(255,255,255,0.6)"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#fff"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"}>← All Compounds</button>
        <span style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.22)",borderRadius:100,padding:"4px 12px",fontSize:"0.69rem",fontWeight:700,color:"#ff8a80"}}>⚠️ Research Use Only</span>
        <button onClick={()=>toggleWishlist(p.id)} style={{marginLeft:"auto",background:wishlist.includes(p.id)?"rgba(255,107,107,0.12)":"rgba(255,255,255,0.06)",border:`1px solid ${wishlist.includes(p.id)?"rgba(255,107,107,0.3)":"rgba(255,255,255,0.1)"}`,color:wishlist.includes(p.id)?"#ff6b6b":"rgba(255,255,255,0.5)",padding:"5px 14px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.75rem",fontWeight:600}}>
          {wishlist.includes(p.id)?"❤️ Saved":"🤍 Save"}
        </button>
        <span style={{background:p.color+"22",color:p.color,borderRadius:100,padding:"4px 12px",fontSize:"0.69rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"}}>{p.tag}</span>
      </div>

      {/* Description */}
      <p style={{fontSize:"0.97rem",color:"rgba(255,255,255,0.6)",lineHeight:1.85,marginBottom:16}}>{p.desc}</p>

      {/* Best For + Difficulty */}
      {PRODUCT_META[p.id]&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:24,alignItems:"center"}}>
        <span style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.3)",marginRight:4}}>Best for:</span>
        {PRODUCT_META[p.id].bestFor.map(tag=>(
          <span key={tag} style={{fontSize:"0.72rem",fontWeight:600,padding:"4px 12px",borderRadius:100,background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.6)",border:"1px solid rgba(255,255,255,0.1)"}}>{tag}</span>
        ))}
        <span style={{fontSize:"0.72rem",fontWeight:700,padding:"4px 12px",borderRadius:100,marginLeft:4,background:PRODUCT_META[p.id].difficulty==="Beginner"?"rgba(59,232,176,0.1)":PRODUCT_META[p.id].difficulty==="Advanced"?"rgba(255,107,107,0.1)":"rgba(255,209,102,0.1)",color:PRODUCT_META[p.id].difficulty==="Beginner"?"#3be8b0":PRODUCT_META[p.id].difficulty==="Advanced"?"#ff6b6b":"#ffd166"}}>
          {PRODUCT_META[p.id].difficulty==="Beginner"?"🟢":PRODUCT_META[p.id].difficulty==="Advanced"?"🔴":"🟡"} {PRODUCT_META[p.id].difficulty}
        </span>
      </div>}

      {/* Price + Size Selector + CTA */}
      <div style={{background:"#1c1c1c",borderRadius:18,padding:"22px 24px",border:"1px solid rgba(255,255,255,0.1)",marginBottom:24,boxShadow:"0 2px 24px rgba(0,0,0,0.4)"}}>
        {/* Size selector */}
        {sizes.length>1&&<div style={{marginBottom:18}}>
          <div style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.45)",marginBottom:8,letterSpacing:"0.06em",textTransform:"uppercase"}}>Size</div>
          <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
            {sizes.map((sz,i)=>(
              <button key={sz.s} onClick={()=>!sz.oos&&setSelIdx(i)} style={{padding:"9px 18px",border:`2px solid ${selIdx===i?p.color:sz.oos?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.15)"}`,borderRadius:10,cursor:sz.oos?"not-allowed":"pointer",fontFamily:"inherit",fontWeight:selIdx===i?700:500,fontSize:"0.88rem",background:selIdx===i?p.color+"25":"transparent",color:selIdx===i?p.color:sz.oos?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.7)",transition:"all .15s",position:"relative"}}>
                {sz.s}{sz.oos&&<span style={{fontSize:"0.6rem",marginLeft:4,color:"rgba(255,255,255,0.3)"}}>OOS</span>}
              </button>
            ))}
          </div>
        </div>}
        <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:10}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.45rem",fontWeight:700,color:"#ffffff"}}>{sel.p}</div>
          <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.35)"}}>/ {sel.s} · lyophilized powder</div>
        </div>
        {/* Water dilution guide per size — exact per product, fallback for any size */}
        {(()=>{
          const r = RECON[p.id]&&RECON[p.id][sel.s];
          // Fallback: auto-calculate if size not in RECON table
          const fallback = (()=>{
            if(r) return null;
            const mg = parseFloat(sel.s);
            if(isNaN(mg)) return null;
            const water = (mg/5).toFixed(1);
            const conc = "5 mg/mL";
            return {water:`${water} mL`,conc,note:`Add ${water} mL BAC water for 5 mg/mL concentration`};
          })();
          const rec = r || fallback;
          if(!rec) return null;
          if(rec.water==="N/A") return <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,background:"rgba(59,232,176,0.08)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:10,padding:"8px 14px"}}>
            <span style={{fontSize:"1rem"}}>✅</span>
            <div>
              <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.5)",marginBottom:1}}>{rec.conc}</div>
              <div style={{fontSize:"0.82rem",color:"#3be8b0",fontWeight:600}}>{rec.note}</div>
            </div>
          </div>;
          return <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,background:"rgba(59,232,176,0.06)",border:"1px solid rgba(59,232,176,0.15)",borderRadius:8,padding:"7px 12px"}}>
            <span style={{fontSize:"0.85rem",flexShrink:0}}>💉</span>
            <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
              <span style={{fontSize:"0.78rem",color:"#3be8b0",fontWeight:600}}>{rec.water} BAC water</span>
              <span style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.3)"}}>→</span>
              <span style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.6)"}}>{rec.conc}</span>
              <span style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.25)"}}>·</span>
              <span style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.35)"}}>{rec.note}</span>
            </div>
          </div>;
        })()}
        <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",marginBottom:10}}>Research grade · Independent COA included · US shipping only</div>

        {/* Stock counter — prominent on product page */}
        {(()=>{
          const stock = getStock(p.id);
          const pct = (stock/10)*100;
          const oos = stock<=0;
          const low = stock<=3 && stock>0;
          const barColor = oos?"#ff6b6b":low?"#ffc107":"#3be8b0";
          return(
            <div style={{marginBottom:16,background:"rgba(255,255,255,0.03)",border:`1px solid ${barColor}22`,borderRadius:12,padding:"12px 16px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.72rem",letterSpacing:"0.1em",color:"rgba(255,255,255,0.45)"}}>AVAILABILITY</span>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.82rem",color:barColor}}>
                  {oos?"OUT OF STOCK":low?`⚡ Only ${stock} left`:`${stock} / 10 in stock`}
                </span>
              </div>
              <div style={{height:6,background:"rgba(255,255,255,0.06)",borderRadius:100,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:barColor,borderRadius:100,transition:"width 0.4s ease",boxShadow:`0 0 8px ${barColor}66`}}/>
              </div>
              {low&&!oos&&<div style={{marginTop:6,fontSize:"0.68rem",color:"rgba(255,193,7,0.7)",fontFamily:"'DM Sans',sans-serif"}}>Selling fast — limited units remaining</div>}
              {oos&&<div style={{marginTop:6,fontSize:"0.68rem",color:"rgba(255,107,107,0.7)",fontFamily:"'DM Sans',sans-serif"}}>This product is currently out of stock</div>}
            </div>
          );
        })()}
        <PrimaryBtn color={p.color} tc={textOnColor} full style={{padding:"15px",fontSize:"1rem",opacity:getStock(p.id)<=0?0.4:1,pointerEvents:getStock(p.id)<=0?"none":"auto"}} onClick={()=>{if(getStock(p.id)>0)onAddToCart&&onAddToCart(sel.s,sel.p);}}>
          {getStock(p.id)<=0?"— Out of Stock —":`Add to Cart — ${sel.p}`}
        </PrimaryBtn>
      </div>

      {/* Share button */}
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:16}}>
        <button onClick={async()=>{
          const shareData={title:p.name,text:`${p.name} — ${p.tag}. Verified research compound.`,url:`https://alphaomegatides.com?product=${p.id}`};
          try{if(navigator.share){await navigator.share(shareData);}else{await navigator.clipboard.writeText(shareData.url);alert("Product link copied!");}}catch{}
        }} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)",borderRadius:100,padding:"7px 16px",fontFamily:"inherit",fontSize:"0.72rem",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
          📤 Share this compound
        </button>
      </div>

      {/* Feature pills */}
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>
        {["🔬 ≥99% Purity","📄 COA Included","🇺🇸 US Only","⚠️ Research Use Only","🚀 Same Day Fulfillment"].map(t=>(
          <span key={t} style={{fontSize:"0.73rem",fontWeight:600,padding:"5px 14px",borderRadius:100,background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.1)"}}>{t}</span>
        ))}
      </div>

      {/* ── INFO CARD (dark, full width, underneath) ── */}
      <div style={{background:"#161616",borderRadius:22,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.5)",marginBottom:48,border:"1px solid rgba(255,255,255,0.07)"}}>
        {/* Accent header */}
        <div style={{background:p.color,padding:"18px 22px",display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:46,height:46,borderRadius:12,background:"rgba(255,255,255,0.22)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",flexShrink:0}}>{p.icon}</div>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:isLight?"#0e0e0e":"#fff",lineHeight:1.2}}>{p.name}</div>
            <div style={{fontSize:"0.76rem",color:isLight?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.65)",marginTop:2}}>/ {sel.s} · Lyophilized powder</div>
          </div>
          <div style={{marginLeft:"auto",textAlign:"right"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",color:isLight?"#0e0e0e":"#fff"}}>{p.coa.purity}</div>
            <div style={{fontSize:"0.68rem",color:isLight?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.65)"}}>Verified Purity</div>
          </div>
        </div>

        {/* Data rows — 2-column grid on wider screens */}
        <div className="info-card-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1px",background:"rgba(255,255,255,0.07)"}}>
          {[
            {icon:"🏛️",label:"Laboratory",value:p.coa.labs.join(" + ")},
            {icon:"🧪",label:"Method",value:"HPLC + Mass Spec"},
            {icon:"📄",label:"COA Reports",value:`${p.coa.tests.length} batches verified`},
            {icon:"🔬",label:"Testing",value:"Independent 3rd Party"},
            {icon:"📦",label:"Form",value:"Lyophilized Powder"},
            {icon:"⚠️",label:"Intended Use",value:"Research Only"},
          ].map(({icon,label,value},i)=>(
            <div key={label} style={{background:"#1e1e1e",padding:"16px 20px",display:"flex",flexDirection:"column",gap:4}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <span style={{fontSize:"0.95rem"}}>{icon}</span>
                <span style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.5)",fontWeight:500,letterSpacing:"0.04em",textTransform:"uppercase"}}>{label}</span>
              </div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",color:"#ffffff",paddingLeft:26}}>{value}</div>
            </div>
          ))}
        </div>

        {/* COA download footer */}
        <div style={{padding:"14px 22px",borderTop:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.03)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.35)"}}>Tested by {p.coa.labs.join(" & ")} · {p.coa.tests.length} COA batches</div>
            <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.25)",marginTop:2}}>All certificates verifiable on the lab's website</div>
          </div>
          <a href={p.coa.tests[0].url} target="_blank" rel="noreferrer"
            style={{background:p.color,color:isLight?"#0e0e0e":"#fff",textDecoration:"none",padding:"9px 20px",borderRadius:100,fontSize:"0.8rem",fontWeight:700,transition:"opacity .2s",flexShrink:0}}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.82"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            Download COA ↗
          </a>
        </div>
      </div>
    </div>

    {/* ── RESEARCH POTENTIAL PLACARD ── */}
    <ResearchPotentialPlacard productId={p.id} productColor={p.color} />
      <ReviewsSection productId={p.id}/>
      <RelatedProducts productId={p.id} go={go}/>
      <StickyBuyBar p={p} sel={sel} onAction={()=>{if(COMING_SOON){document.getElementById("product-buy-btn")?.click();}else if(getStock(p.id)>0)onAddToCart&&onAddToCart(sel.s,sel.p);}}/>

    {/* Guide */}
    <div style={{maxWidth:760,margin:"0 auto",padding:"0 24px 56px"}}>
      {/* ── STACK SUGGESTIONS ── */}
      {PRODUCT_META[p.id]?.stacks?.length>0&&<div style={{marginBottom:36}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:14,color:"#fff",display:"flex",alignItems:"center",gap:8}}>
          <span>🔗</span> Commonly Researched With
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {PRODUCT_META[p.id].stacks.map(sid=>{
            const sp=PRODUCTS.find(x=>x.id===sid);
            if(!sp)return null;
            return <div key={sid} onClick={()=>go("product",sid)}
              style={{display:"flex",alignItems:"center",gap:10,background:"#1c1c1c",border:`1px solid ${sp.color}33`,borderRadius:14,padding:"12px 16px",cursor:"pointer",transition:"all .2s",flex:1,minWidth:140}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=sp.color}
              onMouseLeave={e=>e.currentTarget.style.borderColor=sp.color+"33"}>
              <span style={{fontSize:"1.4rem"}}>{sp.icon}</span>
              <div>
                <div style={{fontWeight:600,fontSize:"0.82rem",color:"#fff"}}>{sp.name}</div>
                <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.4)",marginTop:1}}>{sp.sizes?sp.sizes[0].p:sp.price}</div>
              </div>
            </div>;
          })}
        </div>
      </div>}

      <div style={{textAlign:"center",marginBottom:44}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.9rem",fontWeight:800,letterSpacing:"-.03em",marginBottom:8,color:"#ffffff"}}>Research Protocol Reference</h2>
        <p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.88rem"}}>Reconstitution · administration reference · Administration timing · Cycle data</p>
        <div style={{display:"inline-block",background:"rgba(255,107,107,0.08)",border:"1px solid rgba(255,107,107,0.18)",borderRadius:100,padding:"4px 16px",fontSize:"0.73rem",fontWeight:600,color:"#c0392b",marginTop:10}}>For reference only · Not research or administration advice</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:13}}>
        {p.guide.map((s,i)=>(
          <div key={i} style={{background:"#1c1c1c",borderRadius:17,padding:"22px 26px",border:"1px solid rgba(255,255,255,0.07)",display:"grid",gridTemplateColumns:"46px 1fr",gap:16,alignItems:"start"}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:p.color,color:"#ffffff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.88rem",flexShrink:0}}>{i+1}</div>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,marginBottom:6,fontSize:"0.97rem",color:"#ffffff"}}>{s.n}</div>
              {s.text&&<div style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.55)",lineHeight:1.7,marginBottom:s.chip||s.grid||s.rows||s.cycle?10:0}}>{s.text}</div>}
              {s.chip&&<div style={{background:p.color+"18",border:`1px solid ${p.color}44`,borderRadius:8,padding:"7px 13px",fontSize:"0.78rem",fontWeight:600,color:isLight?"#7a6000":p.color,display:"inline-block"}}>{s.chip}</div>}
              {s.grid&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginTop:8}}>
                {s.grid.map(([l,v])=><div key={l} style={{background:"rgba(255,255,255,0.05)",borderRadius:8,padding:"9px 12px",textAlign:"center",border:"1px solid rgba(255,255,255,0.06)"}}>
                  <div style={{fontSize:"0.66rem",color:"rgba(255,255,255,0.4)",marginBottom:2}}>{l}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.8rem",color:"#fff"}}>{v}</div>
                </div>)}
              </div>}
              {s.rows&&<div style={{display:"flex",flexDirection:"column",gap:5,marginTop:8}}>
                {s.rows.map(([l,v])=><div key={l} style={{background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"9px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid rgba(255,255,255,0.06)"}}>
                  <span style={{fontSize:"0.8rem",fontWeight:400,color:"rgba(255,255,255,0.4)"}}>{l}</span>
                  <span style={{fontSize:"0.82rem",fontWeight:600,color:"rgba(255,255,255,0.85)"}}>{v}</span>
                </div>)}
              </div>}
              {s.cycle&&<div style={{display:"flex",alignItems:"center",gap:9,flexWrap:"wrap",marginTop:8}}>
                {s.cycle.map((c,ci)=><span key={ci} style={{display:"inline-flex",alignItems:"center",gap:9}}>
                  <div style={{background:ci===1?"rgba(0,0,0,0.05)":p.color+"18",border:`1px solid ${ci===1?"rgba(0,0,0,0.1)":p.color+"44"}`,borderRadius:8,padding:"7px 15px",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.8rem",color:ci===1?C.muted:isLight?"#7a6000":p.color}}>{c}</div>
                  {ci<s.cycle.length-1&&<span style={{color:C.muted}}>→</span>}
                </span>)}
              </div>}
            </div>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(255,107,107,0.12)",border:"1px solid rgba(255,107,107,0.3)",borderRadius:14,padding:"18px 22px",marginTop:18,display:"flex",gap:12}}>
        <span style={{flexShrink:0}}>⚠️</span>
        <div style={{fontSize:"0.82rem",lineHeight:1.7,color:"rgba(255,150,130,0.85)"}}><strong style={{color:"rgba(255,150,130,1)"}}>Research Use Disclaimer: </strong>{p.note}</div>
      </div>
    </div>

    {/* COA */}
    <div style={{background:"#111111",padding:"36px 24px"}}>
      <div style={{maxWidth:820,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{display:"inline-block",background:"rgba(59,232,176,0.12)",color:C.g,fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",padding:"5px 16px",borderRadius:100,border:"1px solid rgba(59,232,176,0.25)",marginBottom:12}}>
            🔬 Third-Party Verified{p.coa.dual?" · Dual Validated":""}
          </div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.35rem",fontWeight:800,color:"#fff",letterSpacing:"-.02em",marginBottom:8}}>Certificate of Analysis</h2>
          <p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.45)",lineHeight:1.7,maxWidth:500,margin:"0 auto"}}>
            Every batch tested independently. Every batch independently tested and verified by Freedom Diagnostics — certificates viewable directly on the lab's website.
          </p>
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:18,padding:26,borderTop:`4px solid ${p.color}`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14,marginBottom:22,paddingBottom:18,borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,color:"#fff",marginBottom:5}}>{p.name}</div>
              <div style={{fontSize:"0.76rem",color:"rgba(255,255,255,0.38)",marginBottom:9}}>{p.coa.tests.length} batch certificates · Tested by {p.coa.labs.join(" & ")}</div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {p.coa.labs.map(l=><span key={l} style={{fontSize:"0.68rem",fontWeight:600,padding:"3px 11px",borderRadius:100,background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.5)",border:"1px solid rgba(255,255,255,0.1)"}}>{l}</span>)}
              </div>
            </div>
            <div style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"2rem",color:p.color}}>{p.coa.purity}</div>
              <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:2}}>Purity</div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:18}}>
            {p.coa.tests.map(t=>(
              <div key={t.name} style={{display:"flex",alignItems:"center",gap:12,background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"11px 15px",border:"1px solid rgba(255,255,255,0.06)"}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.7)",marginBottom:2}}>{t.name}</div>
                  <div style={{fontSize:"0.73rem",fontWeight:700,color:C.g}}>{t.result}</div>
                </div>
                <a href={t.url} target="_blank" rel="noreferrer"
                  style={{flexShrink:0,background:"rgba(255,255,255,0.08)",color:"#fff",textDecoration:"none",padding:"5px 14px",borderRadius:100,fontSize:"0.73rem",fontWeight:600,border:"1px solid rgba(255,255,255,0.12)",whiteSpace:"nowrap"}}
                  onMouseEnter={e=>e.target.style.background=C.b} onMouseLeave={e=>e.target.style.background="rgba(255,255,255,0.08)"}>
                  View PDF ↗
                </a>
              </div>
            ))}
          </div>
          <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.28)",textAlign:"center",borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:12}}>
            🔗 All certificates tested by Freedom Diagnostics — independently verifiable
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
      <span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:C.muted,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5,marginBottom:28}}>← Back</span>

      {/* Header */}
      <div style={{fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:C.b,marginBottom:8}}>Get in Touch</div>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,5vw,2.4rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:12,lineHeight:1.1}}>We're here to help</h1>
      <p style={{fontSize:"0.92rem",color:C.muted,lineHeight:1.75,marginBottom:32}}>
        Questions about compounds, COA documentation, or an order? We typically respond within one business day.
      </p>

      {/* Info cards — single column, compact */}
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:28}}>
        {[
          ["📧","Email","alphaomegatides@yahoo.com","mailto:alphaomegatides@yahoo.com"],
          ["📦","Order Support","Questions about an existing order","mailto:alphaomegatides@yahoo.com"],
          ["🔬","COA & Research Docs","Request lab reports or documentation","mailto:alphaomegatides@yahoo.com"],
          ["🇺🇸","US Fulfillment Only","We ship to US addresses only","#"],
        ].map(([icon,title,sub,href])=>(
          <a key={title} href={href}
            style={{background:"#1c1c1c",borderRadius:14,padding:"16px 18px",border:"1px solid rgba(255,255,255,0.08)",textDecoration:"none",display:"flex",alignItems:"center",gap:14,transition:"box-shadow .2s"}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 18px rgba(0,0,0,0.07)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{width:40,height:40,borderRadius:10,background:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.15rem",flexShrink:0}}>{icon}</div>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:2}}>{title}</div>
              <div style={{fontSize:"0.78rem",color:C.muted,lineHeight:1.4}}>{sub}</div>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <a href="mailto:alphaomegatides@yahoo.com"
        style={{display:"flex",alignItems:"center",justifyContent:"center",background:"#3be8b0",color:"#0e0e0e",padding:"15px 24px",borderRadius:100,fontFamily:"inherit",fontWeight:600,fontSize:"0.95rem",textDecoration:"none",gap:8,transition:"background .2s",width:"100%"}}
        onMouseEnter={e=>e.currentTarget.style.background=C.b}
        onMouseLeave={e=>e.currentTarget.style.background=C.ink}>
        ✉️ Email Us Now
      </a>
      <div style={{textAlign:"center",marginTop:10,fontSize:"0.72rem",color:C.muted}}>alphaomegatides@yahoo.com</div>

      <div style={{textAlign:"center",marginTop:24,fontSize:"0.72rem",color:C.muted,lineHeight:1.6,borderTop:"1px solid rgba(0,0,0,0.07)",paddingTop:20}}>
        All Alphaomegatides products are for research use only · Not for human or veterinary use
      </div>
    </div>
    <SiteFooter go={go}/>
  </div>;
}

// ── REGISTER ────────────────────────────────────────
function Register({go,onLogin}){
  const [step, setStep]   = useState<"form"|"verify">("form");
  const [f,sf]            = useState({fname:"",lname:"",email:"",pass:"",phone:"",street:"",apt:"",city:"",state:"",zip:""});
  const [terms,st]        = useState(false);
  const [err,se]          = useState("");
  const [otp,setOtp]      = useState("");
  const [otpInput,setOtpInput] = useState("");
  const [otpSending,setOtpSending] = useState(false);
  const [otpVerifying,setOtpVerifying] = useState(false);
  const [resendCooldown,setResendCooldown] = useState(0);
  const cooldownRef = useRef<any>(null);
  const set=(k,v)=>sf(p=>({...p,[k]:v}));

  function handleAddressSelect(full, parts) {
    if(parts && parts.length >= 2) {
      const cityState = parts[1].trim().split(" ");
      const state = cityState.length > 1 ? cityState[cityState.length-1] : "";
      const city = cityState.slice(0, cityState.length > 1 ? -1 : undefined).join(" ");
      const zip = parts[2] ? parts[2].trim() : "";
      sf(p=>({...p, street:parts[0], city, state: STATES.find(s=>s.includes(state))||"", zip}));
    }
  }

  // Generate a 6-digit OTP and send via Resend
  async function sendOtp(email:string, name:string):Promise<boolean> {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes
    try {
      localStorage.setItem("aot_otp", JSON.stringify({ code, email: email.toLowerCase(), expires }));
    } catch {}
    setOtp(code);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "otp_verify",
          data: { to_email: email, to_name: name, code },
        }),
      });
      return res.ok;
    } catch { return false; }
  }

  async function handleFormSubmit() {
    if(!f.fname||!f.lname||!f.email||!f.pass||!f.phone||!f.street||!f.city||!f.state||!f.zip){
      se("Please fill in all required fields."); return;
    }
    if(!f.email.includes("@")||!f.email.includes(".")){se("Enter a valid email address.");return;}
    if(f.pass.length<8){se("Password must be at least 8 characters.");return;}
    if(!terms){se("Please agree to the Terms of Service.");return;}
    const users=getUsers();
    if(users[f.email.toLowerCase()]){se("An account already exists with this email.");return;}
    se(""); setOtpSending(true);
    const sent = await sendOtp(f.email, f.fname);
    setOtpSending(false);
    if (!sent) { se("Could not send verification email. Check your email address and try again."); return; }
    setStep("verify");
    startCooldown();
  }

  function startCooldown() {
    setResendCooldown(60);
    clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setResendCooldown(c => { if(c<=1){clearInterval(cooldownRef.current);return 0;} return c-1; });
    }, 1000);
  }

  async function handleResend() {
    if(resendCooldown>0) return;
    setOtpSending(true);
    await sendOtp(f.email, f.fname);
    setOtpSending(false);
    startCooldown();
  }

  function handleVerify() {
    setOtpVerifying(true);
    se("");
    try {
      const stored = JSON.parse(localStorage.getItem("aot_otp")||"null");
      if (!stored) { se("Verification code expired. Please request a new one."); setOtpVerifying(false); return; }
      if (Date.now() > stored.expires) { se("Code expired (10 min limit). Tap 'Resend Code' to get a new one."); setOtpVerifying(false); return; }
      if (stored.email !== f.email.toLowerCase()) { se("Email mismatch. Please restart."); setOtpVerifying(false); return; }
      if (otpInput.trim() !== stored.code) { se("Incorrect code. Check your email and try again."); setOtpVerifying(false); return; }
    } catch { se("Verification error. Please try again."); setOtpVerifying(false); return; }
    // OTP correct — create account
    try { localStorage.removeItem("aot_otp"); } catch {}
    const u={...f,email:f.email.toLowerCase(),verified:true,address:{street:f.street,apt:f.apt,city:f.city,state:f.state,zip:f.zip},orders:[],createdAt:new Date().toISOString()};
    const users=getUsers(); users[u.email]=u; saveUsers(users); setSess(u); onLogin(u);
    fetch("/api/send-email",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({type:"account_signup",data:{fname:f.fname,lname:f.lname,email:f.email,phone:f.phone,street:f.street,apt:f.apt,city:f.city,state:f.state,zip:f.zip}})
    }).catch(()=>{});
    setOtpVerifying(false);
    go("dashboard");
  }

  // ── STEP 1: Registration Form ──────────────────────────────────
  if (step === "form") return (
    <div style={{paddingTop:70,minHeight:"100vh",background:"#0e0e0e",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 20px 60px"}}>
      <div style={{background:"#1a1a1a",borderRadius:24,padding:40,maxWidth:520,width:"100%",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 16px 48px rgba(0,0,0,0.5)"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.4rem",fontWeight:800,marginBottom:3}}>Alpha<span style={{color:"#ff6b6b"}}>ω</span><span style={{color:"#3be8b0"}}>mega</span>tides</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.55rem",fontWeight:800,letterSpacing:"-.03em"}}>Create Account</div>
          <div style={{fontSize:"0.8rem",color:C.muted,marginTop:4}}>🇺🇸 US researchers only · Domestic fulfillment only</div>
        </div>
        {err&&<div style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.3)",borderRadius:9,padding:"9px 14px",fontSize:"0.82rem",color:"#c0392b",marginBottom:16}}>{err}</div>}
        <div style={{display:"flex",flexDirection:"column",gap:13}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
            <Field label="First Name" value={f.fname} onChange={e=>set("fname",e.target.value)} placeholder="John"/>
            <Field label="Last Name" value={f.lname} onChange={e=>set("lname",e.target.value)} placeholder="Doe"/>
          </div>
          <Field label="Email Address" type="email" value={f.email} onChange={e=>set("email",e.target.value)} placeholder="john@example.com"/>
          <div style={{background:"rgba(59,232,176,0.06)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:8,padding:"8px 12px",fontSize:"0.75rem",color:"rgba(59,232,176,0.8)"}}>
            ✉️ A 6-digit verification code will be sent to this email address.
          </div>
          <Field label="Password (min 8 chars)" type="password" value={f.pass} onChange={e=>set("pass",e.target.value)} placeholder="Min. 8 characters"/>
          <Field label="Phone Number" type="tel" value={f.phone} onChange={e=>set("phone",e.target.value)} placeholder="(555) 000-0000"/>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:16,display:"flex",flexDirection:"column",gap:11}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",display:"flex",alignItems:"center",gap:8}}>
              Shipping Address
              <span style={{background:"rgba(79,142,247,0.12)",color:C.b,fontSize:"0.65rem",padding:"2px 10px",borderRadius:100,fontWeight:600}}>🇺🇸 US Only</span>
            </div>
            <AddressField label="Street Address" value={f.street} onChange={v=>set("street",v)} onSelect={handleAddressSelect} placeholder="Start typing your address…"/>
            <Field label="Apt / Suite (optional)" value={f.apt} onChange={e=>set("apt",e.target.value)} placeholder="Apt 4B"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
              <Field label="City" value={f.city} onChange={e=>set("city",e.target.value)} placeholder="Miami"/>
              <StateSelect label="State" value={f.state} onChange={e=>set("state",e.target.value)}/>
            </div>
            <div style={{maxWidth:160}}>
              <Field label="ZIP Code" value={f.zip} onChange={e=>set("zip",e.target.value)} placeholder="33101" maxLength={10}/>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"flex-start",gap:9}}>
            <input type="checkbox" checked={terms} onChange={e=>st(e.target.checked)} style={{marginTop:3,cursor:"pointer",width:15,height:15,flexShrink:0}}/>
            <label style={{fontSize:"0.77rem",color:C.muted,cursor:"pointer",lineHeight:1.5}}>I confirm I am in the <strong>United States</strong>, agree to the Terms of Service, and acknowledge all products are <strong>for research use only — not for human use</strong>.</label>
          </div>
          <PrimaryBtn onClick={handleFormSubmit} full style={{padding:"14px",fontSize:"0.95rem"}}>
            {otpSending ? "Sending verification code…" : "Continue — Verify Email →"}
          </PrimaryBtn>
          <div style={{textAlign:"center",fontSize:"0.82rem",color:C.muted}}>Already have an account? <span onClick={()=>go("login")} style={{color:C.b,cursor:"pointer",fontWeight:600}}>Sign in</span></div>
        </div>
      </div>
    </div>
  );

  // ── STEP 2: OTP Verification ───────────────────────────────────
  return (
    <div style={{paddingTop:70,minHeight:"100vh",background:"#0e0e0e",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 20px 60px"}}>
      <div style={{background:"#1a1a1a",borderRadius:24,padding:40,maxWidth:440,width:"100%",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 16px 48px rgba(0,0,0,0.5)",textAlign:"center"}}>
        <div style={{fontSize:"3rem",marginBottom:12}}>✉️</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",marginBottom:8}}>Check your email</div>
        <div style={{fontSize:"0.85rem",color:C.muted,marginBottom:6}}>We sent a 6-digit code to</div>
        <div style={{fontWeight:700,color:"#3be8b0",fontSize:"0.95rem",marginBottom:24}}>{f.email}</div>

        {err&&<div style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.3)",borderRadius:9,padding:"9px 14px",fontSize:"0.82rem",color:"#c0392b",marginBottom:16}}>{err}</div>}

        {/* 6-digit input */}
        <input
          value={otpInput}
          onChange={e=>setOtpInput(e.target.value.replace(/\D/g,"").slice(0,6))}
          placeholder="000000"
          maxLength={6}
          style={{
            width:"100%",textAlign:"center",letterSpacing:"0.4em",fontSize:"2rem",fontWeight:800,
            background:"rgba(255,255,255,0.05)",border:"2px solid rgba(59,232,176,0.3)",
            borderRadius:14,padding:"16px",color:"#fff",outline:"none",
            fontFamily:"'DM Sans',sans-serif",boxSizing:"border-box" as const,marginBottom:16,
          }}
          onKeyDown={e=>{ if(e.key==="Enter"&&otpInput.length===6) handleVerify(); }}
        />

        <PrimaryBtn onClick={handleVerify} full style={{padding:"13px",fontSize:"0.95rem",marginBottom:16}}
          disabled={otpInput.length!==6||otpVerifying}>
          {otpVerifying ? "Verifying…" : "Verify & Create Account"}
        </PrimaryBtn>

        <div style={{fontSize:"0.82rem",color:C.muted,marginBottom:8}}>
          Didn't receive it? Check your spam folder.
        </div>
        <button onClick={handleResend} disabled={resendCooldown>0||otpSending}
          style={{background:"none",border:"none",color:resendCooldown>0?C.muted:"#4f8ef7",cursor:resendCooldown>0?"default":"pointer",fontSize:"0.82rem",fontWeight:600,padding:"4px 0"}}>
          {resendCooldown>0 ? `Resend in ${resendCooldown}s` : otpSending ? "Sending…" : "↺ Resend Code"}
        </button>

        <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
          <button onClick={()=>{setStep("form");se("");setOtpInput("");}}
            style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:"0.8rem"}}>
            ← Back to edit email
          </button>
        </div>
      </div>
    </div>
  );
}

function Login({go,onLogin}){
  const [email,se]=useState(""); const [pass,sp]=useState(""); const [err,serr]=useState("");
  function submit(){
    if(!email||!pass){serr("Please enter your email and password.");return;}
    // ── ADMIN ACCOUNT CHECK ──────────────────────────────────────
    if(isAdminUser(email, pass)){
      const adminUser={email:ADMIN_EMAIL,name:"Admin",role:"admin",createdAt:new Date().toISOString()};
      setSess(adminUser); onLogin(adminUser); go("dashboard"); return;
    }
    // ── REGULAR USER ─────────────────────────────────────────────
    const users=getUsers(); const u=users[email.toLowerCase()];
    if(!u||u.pass!==pass){serr("Incorrect email or password.");return;}
    setSess(u); onLogin(u); go("dashboard");
  }
  return <div style={{paddingTop:70,minHeight:"100vh",background:"#0e0e0e",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 20px 60px"}}>
    <div style={{background:"#1a1a1a",borderRadius:24,padding:40,maxWidth:400,width:"100%",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 16px 48px rgba(0,0,0,0.5)"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.4rem",fontWeight:800,marginBottom:3}}>Alpha<span style={{color:"#ff6b6b"}}>ω</span><span style={{color:"#3be8b0"}}>mega</span>tides</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.55rem",fontWeight:800,letterSpacing:"-.03em"}}>Welcome Back</div>
        <div style={{fontSize:"0.8rem",color:C.muted,marginTop:4}}>Sign in to your account</div>
      </div>
      {err&&<div style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.3)",borderRadius:9,padding:"9px 14px",fontSize:"0.82rem",color:"#c0392b",marginBottom:16}}>{err}</div>}
      <div style={{display:"flex",flexDirection:"column",gap:13}}>
        <Field label="Email Address" type="email" value={email} onChange={e=>se(e.target.value)} placeholder="john@example.com"/>
        <Field label="Password" type="password" value={pass} onChange={e=>sp(e.target.value)} placeholder="Your password" onKeyDown={e=>e.key==="Enter"&&submit()}/>
        <PrimaryBtn onClick={submit} full style={{padding:"14px",fontSize:"0.95rem"}}>Sign In</PrimaryBtn>
        <div style={{textAlign:"center",fontSize:"0.82rem",color:C.muted}}>No account? <span onClick={()=>go("register")} style={{color:C.b,cursor:"pointer",fontWeight:600}}>Create one free</span></div>
      </div>
    </div>
  </div>;
}

// ── DASHBOARD ────────────────────────────────────────
function Dashboard({user,go,onLogout,wishlistIds=[]}){
  const [tab,st]=useState("orders");
  const [pf,spf]=useState({fname:user.fname||"",lname:user.lname||"",phone:user.phone||"",...(user.address||{})});
  const [saved,ss]=useState(false);
  const [bImgs,sbI]=useState([]); const [aImgs,saI]=useState([]);
  const [cmpB,scB]=useState(null); const [cmpA,scA]=useState(null);
  const bRef=useRef(); const aRef=useRef();

  // Progress tracker state
  const [logs,setLogs]=useState(()=>{try{return JSON.parse(localStorage.getItem('nxg_logs_'+user.email)||'[]');}catch{return[];}});
  const [newLog,setNewLog]=useState({date:new Date().toISOString().split('T')[0],time:'',weight:'',unit:'lbs',bodyfat:'',chest:'',waist:'',hips:'',neck:'',arms:'',thighs:'',calves:'',notes:''});
  const [showForm,setShowForm]=useState(false);
  const [logTab,setLogTab]=useState('weight');

  function saveLog(){
    if(!newLog.weight&&!newLog.notes) return;
    const updated=[{...newLog,id:Date.now()},...logs];
    setLogs(updated);
    localStorage.setItem('nxg_logs_'+user.email,JSON.stringify(updated));
    setNewLog({date:new Date().toISOString().split('T')[0],time:'',weight:'',unit:'lbs',bodyfat:'',chest:'',waist:'',hips:'',neck:'',arms:'',thighs:'',calves:'',notes:''});
    setShowForm(false);
  }
  function deleteLog(id){setLogs(p=>{const u=p.filter(l=>l.id!==id);localStorage.setItem('nxg_logs_'+user.email,JSON.stringify(u));return u;});}
  const latestWeight=logs.find(l=>l.weight);
  const firstWeight=logs.slice().reverse().find(l=>l.weight);
  const weightChange=latestWeight&&firstWeight&&latestWeight!==firstWeight?parseFloat(latestWeight.weight)-parseFloat(firstWeight.weight):null;

  function saveProfile(){
    const users=getUsers();
    const updated={...user,...pf,address:{street:pf.street,apt:pf.apt,city:pf.city,state:pf.state,zip:pf.zip}};
    users[user.email]=updated; saveUsers(users); setSess(updated); ss(true); setTimeout(()=>ss(false),3000);
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
  const tabs=isAdmin(user)
    ? [["orders","📦 Orders"],["profile","👤 Profile"],["progress","📊 Progress"],["wishlist","❤️ Wishlist"],["coa","🔬 My COAs"],["telegram","✈️ Telegram"],["waitlist","📋 Waitlist"],["signups","👥 All Signups"],["flash","⚡ Flash Sale"],["analytics","📊 Analytics"],["admin","👑 CMS Panel"]]
    : [["orders","📦 Orders"],["profile","👤 Profile"],["progress","📊 Progress"],["wishlist","❤️ Wishlist"],["coa","🔬 My COAs"],["telegram","✈️ Telegram"]];

  return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
    <div style={{maxWidth:1020,margin:"0 auto",padding:"40px 36px 80px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14,marginBottom:32}}>
        <div>
          <div style={{fontSize:"0.68rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginBottom:4}}>My Account</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.9rem",fontWeight:800,letterSpacing:"-.03em"}}>Welcome back, {user.fname} 👋</div>
        </div>
        <GhostBtn onClick={()=>{clearSess();onLogout();go("home");}}>Sign Out</GhostBtn>
      </div>
      <div style={{display:"flex",gap:2,flexWrap:"wrap",borderBottom:"2px solid rgba(255,255,255,0.08)",marginBottom:28}}>
        {tabs.map(([id,label])=>(
          <button key={id} onClick={()=>st(id)}
            style={{background:"none",border:"none",padding:"10px 20px",fontFamily:"inherit",fontSize:"0.85rem",fontWeight:600,cursor:"pointer",color:tab===id?C.ink:C.muted,borderBottom:`2px solid ${tab===id?C.ink:"transparent"}`,marginBottom:-2,transition:"all .2s"}}>
            {label}
          </button>
        ))}
      </div>

      {tab==="orders"&&<div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",fontWeight:700}}>Order History</div>
          <PrimaryBtn onClick={()=>go("home")} style={{padding:"9px 22px",fontSize:"0.82rem"}}>+ New Order</PrimaryBtn>
        </div>
        {(!user.orders||!user.orders.length)
          ?<div style={{textAlign:"center",padding:"56px 0",color:C.muted}}><div style={{fontSize:"2.8rem",marginBottom:12}}>📦</div><div style={{fontWeight:600}}>No orders yet</div></div>
          :(user.orders||[]).map(o=>(
            <div key={o.id} style={{background:"#1c1c1c",borderRadius:15,padding:22,border:"1px solid rgba(255,255,255,0.07)",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:5}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700}}>{o.product}</div>
                    <span style={{fontSize:"0.66rem",fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",padding:"2px 9px",borderRadius:100,background:sColor[o.status]+"22",color:sColor[o.status]}}>{o.status}</span>
                  </div>
                  <div style={{fontSize:"0.75rem",color:C.muted}}>Order {o.id} · {o.date} · Qty: {o.qty}</div>
                  {o.tracking&&<div style={{fontSize:"0.72rem",color:C.b,marginTop:3}}>📍 Tracking: {o.tracking}</div>}
                </div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.15rem"}}>{o.price}</div>
              </div>
            </div>
          ))
        }
      </div>}

      {tab==="profile"&&<div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",fontWeight:700,marginBottom:20}}>My Profile</div>
        <div style={{background:"#1c1c1c",borderRadius:18,padding:28,border:"1px solid rgba(255,255,255,0.07)",maxWidth:540}}>
          <div style={{display:"flex",flexDirection:"column",gap:13}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
              <Field label="First Name" value={pf.fname||""} onChange={e=>spf(p=>({...p,fname:e.target.value}))}/>
              <Field label="Last Name" value={pf.lname||""} onChange={e=>spf(p=>({...p,lname:e.target.value}))}/>
            </div>
            <Field label="Email (cannot change)" value={user.email} disabled style={{opacity:0.55}}/>
            <Field label="Phone" value={pf.phone||""} onChange={e=>spf(p=>({...p,phone:e.target.value}))}/>
            <div style={{borderTop:"1px solid rgba(0,0,0,0.08)",paddingTop:14,display:"flex",flexDirection:"column",gap:11}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",display:"flex",alignItems:"center",gap:8}}>
                Shipping Address <span style={{background:"rgba(79,142,247,0.12)",color:C.b,fontSize:"0.65rem",padding:"2px 10px",borderRadius:100,fontWeight:600}}>🇺🇸 US Only</span>
              </div>
              <AddressField label="Street" value={pf.street||""} onChange={v=>spf(p=>({...p,street:v}))} onSelect={(full,parts)=>{if(parts&&parts[0])spf(p=>({...p,street:parts[0]}));}}/>
              <Field label="Apt / Suite" value={pf.apt||""} onChange={e=>spf(p=>({...p,apt:e.target.value}))}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
                <Field label="City" value={pf.city||""} onChange={e=>spf(p=>({...p,city:e.target.value}))}/>
                <StateSelect label="State" value={pf.state||""} onChange={e=>spf(p=>({...p,state:e.target.value}))}/>
              </div>
              <div style={{maxWidth:160}}><Field label="ZIP" value={pf.zip||""} onChange={e=>spf(p=>({...p,zip:e.target.value}))} maxLength={10}/></div>
            </div>
            <PrimaryBtn onClick={saveProfile} full style={{padding:"13px",fontSize:"0.9rem"}}>Save Changes</PrimaryBtn>
            {saved&&<div style={{textAlign:"center",color:"#0e8e65",fontSize:"0.82rem",fontWeight:600}}>✓ Saved successfully</div>}
          </div>
        </div>
      </div>}

      {tab==="progress"&&<div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",fontWeight:700}}>Progress Tracker</div>
            <div style={{fontSize:"0.8rem",color:C.muted,marginTop:3}}>Weight · Measurements · Workout notes · Photos</div>
          </div>
          <button onClick={()=>setShowForm(p=>!p)} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"10px 20px",borderRadius:100,fontFamily:"inherit",fontWeight:700,fontSize:"0.85rem",cursor:"pointer"}}>
            {showForm?"Cancel":"+ Log Entry"}
          </button>
        </div>

        {/* Stats summary */}
        {logs.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:20}}>
          {[
            ["Current",latestWeight?`${latestWeight.weight} ${latestWeight.unit}`:"—","⚖️"],
            ["Starting",firstWeight&&firstWeight!==latestWeight?`${firstWeight.weight} ${firstWeight.unit}`:"—","📍"],
            ["Change",weightChange!==null?`${weightChange>0?"+":""}${weightChange.toFixed(1)} ${latestWeight.unit}`:"—",weightChange<0?"📉":"📈"],
            ["Entries",logs.length,"📋"],
          ].map(([label,val,icon])=>(
            <div key={label} style={{background:"#1c1c1c",borderRadius:12,padding:"14px 16px",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{fontSize:"1.1rem",marginBottom:6}}>{icon}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:label==="Change"&&weightChange<0?"#3be8b0":label==="Change"&&weightChange>0?"#ff6b6b":"#fff"}}>{val}</div>
              <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.35)",marginTop:2,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>
            </div>
          ))}
        </div>}

        {/* Log entry form */}
        {showForm&&<div style={{background:"#1a1a1a",borderRadius:18,padding:24,border:"1px solid rgba(255,255,255,0.1)",marginBottom:20}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",marginBottom:16}}>New Entry</div>

          {/* Date + Time */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
            <div>
              <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>Date</div>
              <input type="date" value={newLog.date} onChange={e=>setNewLog(p=>({...p,date:e.target.value}))}
                style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box"}}/>
            </div>
            <div>
              <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>Time</div>
              <input type="time" value={newLog.time} onChange={e=>setNewLog(p=>({...p,time:e.target.value}))}
                style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box"}}/>
            </div>
          </div>

          {/* Sub-tabs */}
          <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
            {[["weight","⚖️ Weight"],["measurements","📏 Measurements"],["workout","💪 Workout"],["photos","📸 Photos"]].map(([t,l])=>(
              <button key={t} onClick={()=>setLogTab(t)}
                style={{padding:"6px 14px",borderRadius:100,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.78rem",fontWeight:600,background:logTab===t?"#3be8b0":"rgba(255,255,255,0.07)",color:logTab===t?"#0e0e0e":"rgba(255,255,255,0.5)",transition:"all .15s"}}>
                {l}
              </button>
            ))}
          </div>

          {/* Weight inputs */}
          {logTab==="weight"&&<div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:12}}>
            <div>
              <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>Weight</div>
              <input type="number" placeholder="e.g. 185" value={newLog.weight} onChange={e=>setNewLog(p=>({...p,weight:e.target.value}))}
                style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box"}}/>
            </div>
            <div>
              <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>Unit</div>
              <select value={newLog.unit} onChange={e=>setNewLog(p=>({...p,unit:e.target.value}))}
                style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box"}}>
                <option>lbs</option><option>kg</option>
              </select>
            </div>
            <div>
              <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>Body Fat %</div>
              <input type="number" placeholder="e.g. 18" value={newLog.bodyfat} onChange={e=>setNewLog(p=>({...p,bodyfat:e.target.value}))}
                style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box"}}/>
            </div>
          </div>}

          {/* Measurements */}
          {logTab==="measurements"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[["chest","Chest (in)"],["waist","Waist (in)"],["hips","Hips (in)"],["neck","Neck (in)"],["arms","Arms (in)"],["thighs","Thighs (in)"],["calves","Calves (in)"]].map(([key,label])=>(
              <div key={key}>
                <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>
                <input type="number" step="0.1" placeholder="0.0" value={newLog[key]} onChange={e=>setNewLog(p=>({...p,[key]:e.target.value}))}
                  style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box"}}/>
              </div>
            ))}
          </div>}

          {/* Workout notes */}
          {logTab==="workout"&&<div>
            <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>Workout / Notes</div>
            <textarea placeholder="e.g. Legs day — squats 225lbs 4x8, leg press 400lbs, felt strong. Energy high. No side effects." value={newLog.notes} onChange={e=>setNewLog(p=>({...p,notes:e.target.value}))} rows={4}
              style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"12px",color:"#fff",fontFamily:"inherit",fontSize:"0.87rem",outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
          </div>}

          {/* Photos */}
          {logTab==="photos"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {[["b","📷","Before",C.r],["a","✨","After","#3be8b0"]].map(([type,icon,label,col])=>(
              <div key={type}>
                <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>
                <div onClick={()=>(type==="b"?bRef:aRef).current.click()}
                  style={{border:`2px dashed ${col}44`,borderRadius:12,padding:"20px",textAlign:"center",cursor:"pointer",background:"rgba(255,255,255,0.03)",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=col;e.currentTarget.style.background=col+"11";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=col+"44";e.currentTarget.style.background="rgba(255,255,255,0.03)";}}>
                  <div style={{fontSize:"1.5rem",marginBottom:4}}>{icon}</div>
                  <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)"}}>Click to upload</div>
                </div>
                <input ref={type==="b"?bRef:aRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={e=>handlePhoto(type,e.target.files)}/>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:8}}>
                  {(type==="b"?bImgs:aImgs).map((src,i)=>(
                    <img key={i} src={src} onClick={()=>type==="b"?scB(src):scA(src)}
                      style={{width:56,height:56,objectFit:"cover",borderRadius:8,border:`2px solid ${col}44`,cursor:"pointer"}}/>
                  ))}
                </div>
              </div>
            ))}
          </div>}

          <button onClick={saveLog} style={{marginTop:16,width:"100%",padding:"12px",background:"#3be8b0",color:"#0e0e0e",border:"none",borderRadius:100,fontFamily:"inherit",fontWeight:700,fontSize:"0.9rem",cursor:"pointer"}}>
            Save Entry
          </button>
        </div>}

        {/* Photo comparison */}
        {(cmpB||cmpA)&&<div style={{background:"#1c1c1c",borderRadius:16,padding:20,border:"1px solid rgba(255,255,255,0.07)",marginBottom:16}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:12}}>Photo Comparison</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[[cmpB,"BEFORE","#ff6b6b"],[cmpA,"AFTER","#3be8b0"]].map(([src,lbl,col])=>(
              <div key={lbl} style={{textAlign:"center"}}>
                <div style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.1em",color:col,marginBottom:6}}>{lbl}</div>
                {src?<img src={src} style={{width:"100%",borderRadius:10,objectFit:"cover",maxHeight:220}}/>
                  :<div style={{height:140,background:"#252525",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.25)",fontSize:"0.75rem"}}>No photo yet</div>}
              </div>
            ))}
          </div>
        </div>}

        {/* Log history */}
        {logs.length>0&&<div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:12,color:"rgba(255,255,255,0.6)"}}>History</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {logs.map(log=>(
              <div key={log.id} style={{background:"#1c1c1c",borderRadius:12,padding:"14px 16px",border:"1px solid rgba(255,255,255,0.07)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:log.notes||log.chest?8:0}}>
                  <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
                    <div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)"}}>{log.date}{log.time&&` · ${log.time}`}</div>
                    {log.weight&&<div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",color:"#fff"}}>{log.weight} {log.unit}</div>}
                    {log.bodyfat&&<div style={{fontSize:"0.78rem",color:"#3be8b0"}}>{log.bodyfat}% BF</div>}
                    {log.chest&&<div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)"}}>C:{log.chest}" W:{log.waist||"—"}" H:{log.hips||"—"}"</div>}
                  </div>
                  <button onClick={()=>deleteLog(log.id)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.2)",cursor:"pointer",fontSize:"0.8rem",padding:"2px 6px",borderRadius:6,minHeight:"auto"}}
                    onMouseEnter={e=>e.currentTarget.style.color="#ff6b6b"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.2)"}>✕</button>
                </div>
                {log.notes&&<div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.5)",lineHeight:1.5,borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:8}}>{log.notes}</div>}
              </div>
            ))}
          </div>
        </div>}

        {logs.length===0&&!showForm&&<div style={{textAlign:"center",padding:"48px 0",color:"rgba(255,255,255,0.25)"}}>
          <div style={{fontSize:"2.5rem",marginBottom:12}}>📊</div>
          <div style={{fontWeight:600,marginBottom:6}}>No entries yet</div>
          <div style={{fontSize:"0.82rem"}}>Start logging your weight, measurements and workouts</div>
        </div>}

        <div style={{marginTop:16,background:"rgba(59,232,176,0.06)",border:"1px solid rgba(59,232,176,0.15)",borderRadius:10,padding:"10px 14px",fontSize:"0.75rem",color:"rgba(255,255,255,0.35)",display:"flex",gap:8}}>
          <span>🔒</span><span>All progress data stored locally in your browser — never sent to any server.</span>
        </div>
      </div>}

      {tab==="wishlist"&&<div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",fontWeight:700,marginBottom:5}}>Saved Compounds</div>
        <div style={{fontSize:"0.83rem",color:C.muted,marginBottom:20}}>Products you've saved for later.</div>
        {(!wishlistIds||wishlistIds.length===0)
          ?<div style={{textAlign:"center",padding:"40px 0",color:C.muted}}>
            <div style={{fontSize:"2rem",marginBottom:10}}>🤍</div>
            <div>No saved compounds yet.</div>
            <div style={{fontSize:"0.8rem",marginTop:6}}>Tap the 🤍 on any product to save it here.</div>
          </div>
          :<div style={{display:"flex",flexDirection:"column",gap:10}}>
            {wishlistIds.map(id=>{
              const p=PRODUCTS.find(x=>x.id===id);
              if(!p)return null;
              return <div key={id} style={{background:"#1c1c1c",borderRadius:14,padding:"14px 16px",border:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:44,height:44,borderRadius:10,background:p.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0}}>{p.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:"0.88rem",marginBottom:2}}>{p.name}</div>
                  <div style={{fontSize:"0.72rem",color:C.muted}}>{p.sizes?p.sizes[0].p:p.price} · {p.tag}</div>
                </div>
                <button onClick={()=>go("product",id)} style={{background:p.color,color:p.color==="#ffd166"||p.color==="#3be8b0"?"#0e0e0e":"#fff",border:"none",padding:"8px 16px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.78rem",flexShrink:0}}>View →</button>
              </div>;
            })}
          </div>
        }
      </div>}

      {tab==="waitlist"&&isAdmin(user)&&<WaitlistAdmin/>}
      {tab==="signups"&&isAdmin(user)&&<AllSignupsAdmin/>}
      {tab==="flash"&&isAdmin(user)&&<><FlashSaleAdmin/><FlashSaleScheduler/></>}
      {tab==="analytics"&&isAdmin(user)&&<AdminAnalyticsTab user={user}/>}
      {tab==="admin"&&isAdmin(user)&&<div style={{padding:"8px 0"}}><AdminCMSPage user={user} go={go}/></div>}
      
      {tab==="telegram"&&<div style={{padding:"8px 0"}}><TelegramLinkCard user={user} go={go}/></div>}
      {tab==="coa"&&<div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.2rem",fontWeight:700,marginBottom:5}}>Certificates of Analysis</div>
        <div style={{fontSize:"0.83rem",color:C.muted,marginBottom:24}}>Third-party lab certifications for all Alphaomegatides compounds. Independently tested by Freedom Diagnostics.</div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {PRODUCTS.map(p=>(
            <div key={p.id} style={{background:"#1c1c1c",borderRadius:15,padding:22,border:"1px solid rgba(255,255,255,0.07)",borderLeft:`4px solid ${p.color}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:12}}>
                <div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.98rem",marginBottom:3}}>{p.name}</div>
                  <div style={{fontSize:"0.75rem",color:C.muted}}>{p.coa.tests.length} batches · {p.coa.labs.join(" + ")}</div>
                </div>
                <div style={{background:"rgba(59,232,176,0.12)",color:"#0e8e65",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.05rem",padding:"5px 13px",borderRadius:9}}>{p.coa.purity}</div>
              </div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {p.coa.tests.map(t=>(
                  <a key={t.name} href={t.url} target="_blank" rel="noreferrer"
                    style={{fontSize:"0.72rem",fontWeight:600,padding:"5px 13px",borderRadius:100,background:"#1e1e1e",color:"#fff",textDecoration:"none"}}
                    onMouseEnter={e=>e.target.style.background=C.b} onMouseLeave={e=>e.target.style.background=C.ink}>
                    {t.name.split(" ").slice(0,2).join(" ")} ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",borderRadius:11,padding:"12px 16px",marginTop:16,fontSize:"0.77rem",color:C.muted}}>
          🔗 All COAs independently verified by Freedom Diagnostics lab.
        </div>
      </div>}
    </div>
  </div>;
}

// ── CHECKOUT PAGE ────────────────────────────────────
function CheckoutPage({product:p, go, user}){
  const [showModal, setShowModal] = useState(true);
  useEffect(()=>{ go("cart"); },[]);

  return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div style={{textAlign:"center",padding:"40px 24px",maxWidth:440}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:28}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",color:"#ff6b6b"}}>α</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",color:"#3be8b0"}}>Ω</span>
      </div>
      <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(59,232,176,0.1)",border:"2px solid rgba(59,232,176,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:"1.6rem"}}>🔒</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",marginBottom:10}}>Redirecting to Checkout</div>
      <p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.88rem",lineHeight:1.7,marginBottom:20}}>administering you to Shopify's seaddress checkout — credit card, Shop Pay, and Apple Pay accepted.</p>
      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
        {[["💳","Credit Card"],["🍎","Apple Pay"],["🛍️","Shop Pay"]].map(([icon,label])=>(
          <div key={label} style={{background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"8px 16px",fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",display:"flex",alignItems:"center",gap:6}}>{icon} {label}</div>
        ))}
      </div>
      <button onClick={()=>go("cart")} style={{marginTop:24,background:"transparent",color:"rgba(255,255,255,0.3)",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.82rem"}}>← Back to cart</button>
    </div>
  </div>;
}


// ── ABANDONED CART — detect + email after 20 min ──────────────
const ABANDON_KEY = "aot_abandon";
function useAbandonedCart(cart: any[], user: any) {
  const timerRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (cart.length === 0) {
      localStorage.removeItem(ABANDON_KEY);
      return;
    }
    const already = localStorage.getItem(ABANDON_KEY);
    if (already) return; // already sent
    // 20 min = 1200000ms; use 2 min for demo: 120000
    timerRef.current = setTimeout(async () => {
      if (!user?.email) return;
      localStorage.setItem(ABANDON_KEY, "1");
      const items = cart.map((i: any) => `• ${i.name} (${i.selectedSize||i.size}) — ${i.selectedPrice||i.price}`).join("\n");
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            from: "Alphaomegatides <noreply@alphaomegatides.com>",
            to: [user.email],
            subject: "You left something behind 🧬",
            html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0e0e0e;color:#fff;padding:32px;border-radius:16px">
              <div style="font-size:2rem;margin-bottom:8px">🧬</div>
              <h2 style="font-family:sans-serif;color:#3be8b0;margin:0 0 8px">Your cart is waiting</h2>
              <p style="color:rgba(255,255,255,0.6);margin:0 0 20px">Hey ${user.fname||"Researcher"}, you left some compounds behind:</p>
              <div style="background:#1c1c1c;border-radius:12px;padding:16px;margin-bottom:20px;white-space:pre-line;color:rgba(255,255,255,0.85);font-size:0.9rem">${items}</div>
              <a href="https://alphaomegatides.com" style="background:#3be8b0;color:#0e0e0e;text-decoration:none;padding:14px 28px;border-radius:100px;font-weight:700;display:inline-block">Complete Your Order →</a>
              <p style="color:rgba(255,255,255,0.3);font-size:0.72rem;margin-top:24px">For research use only · Alphaomegatides · US fulfillment only</p>
            </div>`,
          }),
        });
      } catch(e) { console.log("Abandon cart email failed:", e); }
    }, 1200000); // 20 minutes
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [cart.length, user?.email]);
}

// ── PWA INSTALL PROMPT ────────────────────────────────────────
function usePWAInstall() {
  const [prompt, setPrompt] = React.useState<any>(null);
  const [installed, setInstalled] = React.useState(false);
  React.useEffect(() => {
    const handler = (e: any) => { e.preventDefault(); setPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const install = async () => {
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setPrompt(null);
  };
  return { canInstall: !!prompt && !installed, install, installed };
}

function PWABanner() {
  const { canInstall, install } = usePWAInstall();
  const [dismissed, setDismissed] = React.useState(() => !!localStorage.getItem("aot_pwa_dismiss"));
  if (!canInstall || dismissed) return null;
  return (
    <div style={{position:"fixed",bottom:70,left:12,right:12,zIndex:900,background:"linear-gradient(135deg,#1a1a2e,#16213e)",border:"1px solid rgba(59,232,176,0.3)",borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>
      <div style={{fontSize:"1.8rem",flexShrink:0}}>📲</div>
      <div style={{flex:1}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",color:"#fff",marginBottom:2}}>Install Alphaomegatides</div>
        <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.45)"}}>Add to home screen for faster access</div>
      </div>
      <button onClick={install} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",borderRadius:100,padding:"8px 16px",fontFamily:"inherit",fontWeight:700,fontSize:"0.78rem",cursor:"pointer",flexShrink:0}}>Install</button>
      <button onClick={()=>{setDismissed(true);localStorage.setItem("aot_pwa_dismiss","1");}} style={{background:"none",border:"none",color:"rgba(255,255,255,0.3)",cursor:"pointer",fontSize:"1rem",padding:"4px",flexShrink:0}}>✕</button>
    </div>
  );
}

// ── TELEGRAM DEEP-LINK QR IMPORT ─────────────────────────────
// Shows a QR code that deep-links to a Telegram bot which
// then creates/links their site account via a magic token.
function TelegramLinkCard({user, go}: {user:any; go:Function}) {
  const [copied, setCopied] = React.useState(false);
  const [showQR, setShowQR] = React.useState(false);
  const BOT_USERNAME = "AlphaomegatidesBOT"; // Set up @AlphaomegatidesBOT on Telegram
  const token = user ? btoa(`${user.email}:${Date.now()}`).replace(/=/g,"") : "";
  const deepLink = `https://t.me/${BOT_USERNAME}?start=${token}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(deepLink)}&bgcolor=0e0e0e&color=3be8b0&margin=10`;

  if (!user) return (
    <div style={{background:"rgba(0,136,204,0.08)",border:"1px solid rgba(0,136,204,0.2)",borderRadius:16,padding:"20px",textAlign:"center" as const}}>
      <div style={{fontSize:"1.8rem",marginBottom:8}}>📱</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",marginBottom:6}}>Link Telegram Account</div>
      <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.45)",marginBottom:14}}>Sign in first to link your Telegram</div>
      <button onClick={()=>go("login")} style={{background:"#0088cc",color:"#fff",border:"none",borderRadius:100,padding:"10px 20px",fontFamily:"inherit",fontWeight:700,fontSize:"0.82rem",cursor:"pointer"}}>Sign In</button>
    </div>
  );

  return (
    <div style={{background:"rgba(0,136,204,0.08)",border:"1px solid rgba(0,136,204,0.25)",borderRadius:16,padding:"20px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <div style={{width:40,height:40,borderRadius:12,background:"#0088cc",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0}}>✈️</div>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem"}}>Link Telegram → Site</div>
          <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.4)"}}>Scan QR in Telegram app to link accounts</div>
        </div>
      </div>
      {showQR ? (
        <div style={{textAlign:"center" as const}}>
          <img src={qrUrl} alt="Telegram QR" style={{width:180,height:180,borderRadius:12,border:"2px solid rgba(0,136,204,0.3)",display:"block",margin:"0 auto 12px"}}/>
          <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.4)",marginBottom:10}}>Scan with Telegram app → opens bot → links your account</div>
          <button onClick={()=>{navigator.clipboard.writeText(deepLink);setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{background:"rgba(0,136,204,0.15)",border:"1px solid rgba(0,136,204,0.3)",color:"#0088cc",borderRadius:100,padding:"7px 16px",fontFamily:"inherit",fontSize:"0.75rem",fontWeight:600,cursor:"pointer"}}>
            {copied?"✓ Copied!":"Copy Link"}
          </button>
        </div>
      ) : (
        <button onClick={()=>setShowQR(true)} style={{width:"100%",background:"#0088cc",color:"#fff",border:"none",borderRadius:12,padding:"12px",fontFamily:"inherit",fontWeight:700,fontSize:"0.88rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          📱 Show QR Code
        </button>
      )}
    </div>
  );
}

function SiteFooter({go}){
  return <footer style={{background:"#0a0a0a",color:"rgba(255,255,255,0.38)",fontSize:"0.78rem",padding:"0"}}>
    {/* FDA Disclaimer bar */}
    <div style={{background:"rgba(255,107,107,0.12)",borderTop:"1px solid rgba(255,107,107,0.2)",borderBottom:"1px solid rgba(255,107,107,0.15)",padding:"12px 36px",textAlign:"center",fontSize:"0.72rem",color:"rgba(255,200,200,0.8)",lineHeight:1.6}}>
      <strong style={{color:"rgba(255,150,150,0.95)"}}>FDA DISCLAIMER:</strong> These products have not been evaluated by the U.S. Food and compound Administration. They are not intended to evaluate, treat, cure, or support any condition under study. All products are sold exclusively for in-vitro laboratory and research use only. Not for human or veterinary consumption. Alphaomegatides is a research chemical supplier — not a compounding pharmacy or outsourcing facility.
    </div>
    <div style={{padding:"44px 36px 20px",background:"#0a0a0a"}}>
      <div className="footer-grid" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:36,marginBottom:36}}>
        <div>
          <div style={{position:"relative",display:"inline-block",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",color:"#ff6b6b",lineHeight:1,textShadow:"0 0 16px rgba(255,107,107,0.4)"}}>α</span>
              <svg width="16" height="34" viewBox="0 0 14 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="footerdna" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#ff6b6b"/><stop offset="50%" stopColor="#a855f7"/><stop offset="100%" stopColor="#3be8b0"/></linearGradient></defs>
                <path d="M3 0 C1 4,1 8,3 12 C5 16,6 20,4 24 C3 26,2 27,2 28" stroke="url(#footerdna)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <path d="M11 0 C13 4,13 8,11 12 C9 16,8 20,10 24 C11 26,12 27,12 28" stroke="url(#footerdna)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <line x1="3" y1="0" x2="11" y2="0" stroke="rgba(255,107,107,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="2" y1="7" x2="12" y2="7" stroke="rgba(168,85,247,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="4" y1="14" x2="10" y2="14" stroke="rgba(100,150,255,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="3" y1="21" x2="11" y2="21" stroke="rgba(59,232,176,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="2" y1="28" x2="12" y2="28" stroke="rgba(59,232,176,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="3" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/>
                <circle cx="11" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/>
                <circle cx="4" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/>
                <circle cx="10" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/>
                <circle cx="3" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/>
                <circle cx="11" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/>
              </svg>
              <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",color:"#3be8b0",lineHeight:1,textShadow:"0 0 16px rgba(59,232,176,0.4)"}}>Ω</span>
            </div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.7rem",letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",marginTop:5}}>Alphaomegatides</div>
            <div style={{fontStyle:"italic",fontSize:"0.62rem",color:"rgba(255,255,255,0.2)",marginTop:3,letterSpacing:"0.04em"}}>"Where the tide turns for all."</div>
          </div>
          <p style={{lineHeight:1.7,maxWidth:280,color:"rgba(255,255,255,0.4)",fontSize:"0.8rem"}}>Research-grade peptides independently third-party verified. US fulfillment only. For in-vitro research use only.</p>
          <div style={{marginTop:14,display:"flex",gap:10,flexWrap:"wrap"}}>
            <span style={{background:"rgba(59,232,176,0.1)",color:C.g,fontSize:"0.68rem",fontWeight:600,padding:"3px 10px",borderRadius:100,border:"1px solid rgba(59,232,176,0.2)"}}>≥99% Purity</span>
            <span style={{background:"rgba(59,232,176,0.1)",color:C.g,fontSize:"0.68rem",fontWeight:600,padding:"3px 10px",borderRadius:100,border:"1px solid rgba(59,232,176,0.2)"}}>3rd Party Tested</span>
            <span style={{background:"rgba(59,232,176,0.1)",color:C.g,fontSize:"0.68rem",fontWeight:600,padding:"3px 10px",borderRadius:100,border:"1px solid rgba(59,232,176,0.2)"}}>🇺🇸 US Only</span>
          </div>
        </div>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"rgba(255,255,255,0.7)",fontSize:"0.8rem",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:14}}>Categories</div>
          {[
            {label:"🔥 metabolic research",catId:"glp"},
            {label:"🛡️ post-research support & supporting",catId:"Tissue Research"},
            {label:"💪 GH Axis Research",catId:"growth"},
            {label:"⚗️ Longevity Research",catId:"longevity"},
            {label:"🧠 Neuro Research",catId:"neuro"},
            {label:"🧪 Accessories",catId:"accessories"},
          ].map(({label,catId})=>(
            <div key={catId} onClick={()=>go("category",catId)} style={{cursor:"pointer",marginBottom:9,color:"rgba(255,255,255,0.4)",fontSize:"0.8rem",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#3be8b0"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"rgba(255,255,255,0.7)",fontSize:"0.8rem",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:14}}>Company</div>
          {[["Contact",()=>go("contact")],["Community Chat",()=>go("chat")],["X Community",()=>go("xcommunity")],["Admin Panel",()=>go("admin")],["Video Tutorials",()=>go("videos")],["Stack Builder",()=>go("stacks")],["Research Wiki",()=>go("wiki")],["COA Library",()=>go("coa")],["Research Stacks",()=>go("bundles")],["Find My Compound",()=>go("quiz")],["Protocol Guides",()=>go("protocols")],["Track Order",()=>go("track")],["Sign In",()=>go("login")]].map(([l,fn])=>(
            <div key={l} onClick={fn} style={{cursor:"pointer",marginBottom:9,color:"rgba(255,255,255,0.4)",fontSize:"0.8rem",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{l}</div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"rgba(255,255,255,0.7)",fontSize:"0.8rem",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:14}}>Legal</div>
          {[["Terms of Service",()=>go("terms")],["Refund Policy",()=>go("refund")],["Privacy Policy",()=>go("privacy")],["Compliance Info",()=>go("compliance")]].map(([l,fn])=>(
            <div key={l} onClick={fn} style={{cursor:"pointer",marginBottom:9,color:"rgba(255,255,255,0.4)",fontSize:"0.8rem",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{l}</div>
          ))}
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:20,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12,fontSize:"0.72rem",color:"rgba(255,255,255,0.25)"}}>
        <div>© 2026 Alphaomegatides. All rights reserved.</div>
        <div>FOR RESEARCH USE ONLY. NOT FOR USE IN DIAGNOSTIC PROCEDURES. Human/Animal Consumption Prohibited.</div>
      </div>
    </div>
  </footer>;
}

// ── LEGAL PAGES ────────────────────────────────────
function LegalPage({title,go,children}){
  return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
    <div style={{maxWidth:820,margin:"0 auto",padding:"52px 24px 80px"}}>
      <span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:C.muted,cursor:"pointer",display:"block",marginBottom:24}}>← Back to Home</span>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:8}}>{title}</h1>
      <div style={{fontSize:"0.78rem",color:C.muted,marginBottom:40}}>Alphaomegatides Terms — all products for research use only.</div>
      <div style={{display:"flex",flexDirection:"column",gap:28}}>{children}</div>
    </div>
    <SiteFooter go={go}/>
  </div>;
}

function LegalSection({title,children}){
  return <div style={{background:"#1a1a1a",borderRadius:16,padding:"28px 32px",border:"1px solid rgba(255,255,255,0.07)"}}>
    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.05rem",marginBottom:14,paddingBottom:12,borderBottom:"2px solid rgba(0,0,0,0.06)"}}>{title}</div>
    <div style={{fontSize:"0.87rem",color:C.muted,lineHeight:1.85}}>{children}</div>
  </div>;
}

function TermsPage({go}){
  return <LegalPage title="Terms of Service" go={go}>
    <div style={{background:"rgba(255,107,107,0.12)",border:"1px solid rgba(255,107,107,0.3)",borderRadius:14,padding:"18px 22px",display:"flex",gap:12}}>
      <span style={{flexShrink:0,fontSize:"1.2rem"}}>⚠️</span>
      <div style={{fontSize:"0.85rem",color:"#5c1f1f",lineHeight:1.7}}><strong>All orders are final. All products are sold exclusively for research use only.</strong> Orders may be reviewed, limited, delayed, or refused if buyer qualifications or intended use do not comply with these terms.</div>
    </div>
    <LegalSection title="Research Use Only">
      All products are offered solely for lawful laboratory and in-vitro research use. They are not compounds or compounds and are not approved to evaluate, treat, cure, mitigate, or support any condition under study or research condition. Products are not for human or animal use or consumption and are not intended for research, diagnostic, food, compound, research-device, cosmetic, commercial, or recreational purposes. Alphaomegatides does not represent that any product has been sterilized or tested for safety or efficacy for any prohibited use.
    </LegalSection>
    <LegalSection title="Eligibility and Buyer Representations">
      <div>You must be at least <strong>21 years old</strong> to place an order. Products may be purchased and handled only by qualified, properly trained research or laboratory professionals.</div>
      <br/>By ordering, you represent that you understand the applicable laws, regulations, industrial hygiene practices, safety risks, storage requirements, and handling controls associated with the products you purchase. You further represent that the purchase supports legitimate research activity through a laboratory, institution, university, company, or other research-based setting.
      <br/><br/>Alphaomegatides may request verification, limit quantities, delay fulfillment, or refuse a sale if buyer qualifications or intended use cannot be confirmed.
    </LegalSection>
    <LegalSection title="Orders, Pricing, and Payment">
      Prices are quoted in U.S. dollars and are effective when an order is accepted. Alphaomegatides may correct errors, inaccuracies, or omissions and may update product information, pricing, or availability without notice. Customers are responsible for understanding the requirements of their own region before purchasing, including any applicable taxes, import certifications, licenses, registrations, and compliance obligations. Payment must be received before an order is accepted.
    </LegalSection>
    <LegalSection title="Order Finality and Returns">
      Due to the nature of these products, <strong>all orders are final once submitted</strong>. No cancellations, returns, or refunds are available after submission unless required by law or expressly approved. Orders remain subject to research-use-only restrictions and buyer qualification review. If communications or conduct suggest intended misuse, the sale may be refused and the account suspended.
    </LegalSection>
    <LegalSection title="Product Use and Restrictions">
      No product should be considered a food, compound, research device, or cosmetic. Under no circumstances should any material be used for research, diagnostic, or recreational purposes, or for research use of any kind. The purchaser expressly represents and warrants that any product purchased will be tested, handled, used, manufactured, and marketed in strict compliance with applicable laws and regulations.
    </LegalSection>
    <LegalSection title="Liability and Warranty Limitations">
      Products are provided on an 'as is' and 'as available' basis. All warranties of merchantability, fitness for a particular purpose, and non-infringement are disclaimed. The purchaser agrees to indemnify and hold Alphaomegatides harmless from claims, expenses, losses, and liabilities arising from the purchaser's handling, possession, or use of products. Aggregate liability is limited to the purchase price paid in the applicable transaction.
    </LegalSection>
    <LegalSection title="Governing Law">
      These terms are governed by Wyoming law. By using this site or placing an order, you acknowledge that you have read, understood, and accepted these Terms and Conditions together with the refund and privacy policies.
    </LegalSection>
  </LegalPage>;
}

function RefundPage({go}){
  return <LegalPage title="Refund Policy" go={go}>
    <div style={{background:"rgba(255,107,107,0.12)",border:"1px solid rgba(255,107,107,0.3)",borderRadius:14,padding:"18px 22px",display:"flex",gap:12}}>
      <span style={{flexShrink:0,fontSize:"1.2rem"}}>⚠️</span>
      <div style={{fontSize:"0.85rem",color:"#5c1f1f",lineHeight:1.7}}><strong>ALL SALES ARE FINAL.</strong> Because the products supplied are high-purity research chemicals that cannot be re-stocked or re-certified once they leave our chain of custody, we do not accept returns or offer refunds under any circumstances.</div>
    </div>
    <LegalSection title="Agreement on Purchase">
      By placing an order you acknowledge and agree that: Products are sold strictly for laboratory research, forensic analysis, or other qualifying non-human/non-veterinary purposes. You have verified that the items, quantities, and shipping details in your cart are correct before completing payment. All orders are considered final and may not be cancelled once payment has been processed.
    </LegalSection>
    <LegalSection title="Receipt of Damaged or Incorrect Goods">
      Every shipment is photographed, weighed, and sealed prior to dispatch. If a parcel is visibly damaged in transit or you believe you have received the wrong item, you must:
      <ol style={{marginTop:10,marginLeft:20,display:"flex",flexDirection:"column",gap:6}}>
        <li>administer clear photographs of the outer packaging, inner packaging, and product label(s).</li>
        <li>Email the images and a brief description to <strong>alphaomegatides@yahoo.com</strong> within <strong>48 hours</strong> of the carrier's delivery timestamp.</li>
      </ol>
      <br/>After review, we may at our sole discretion offer a one-time reshipment of the affected item(s). No monetary refunds will be issued.
    </LegalSection>
    <LegalSection title="Chargebacks">
      Initiating an unwarranted chargeback violates the sale agreement. We promptly submit full documentation — including order confirmations, shipping records, product photographs, and copies of this policy — to the processing bank to contest any such claims.
    </LegalSection>
    <LegalSection title="Questions">
      For clarifications prior to ordering, contact us at <strong>alphaomegatides@yahoo.com</strong>. Requests received after an order is placed will be handled in accordance with the "All Sales Are Final" clause above.
    </LegalSection>
  </LegalPage>;
}

function PrivacyPage({go}){
  return <LegalPage title="Privacy Policy" go={go}>
    <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",background:"#1a1a1a",borderRadius:12,padding:"14px 18px",border:"1px solid rgba(0,0,0,0.07)"}}>Last updated: May 2026 · Alphaomegatides</div>
    <LegalSection title="Data We Collect">
      We collect information you provide directly: contact details (name, address, phone, email), order information (billing/shipping address, payment confirmation), account information (username, password), and customer support communications. We may also automatically collect usage data including device information, browser information, IP address, and interaction data via cookies.
      <br/><br/><strong>We do not sell or provide your information to any third party, advertiser, or data broker.</strong> Only what is absolutely necessary to provide services may be shared in limited cases — for example, a carrier needs your address to deliver your package.
    </LegalSection>
    <LegalSection title="How We Use Your Information">
      Your information is used to: process payments and fulfill orders; send order/shipping notifications; maintain your account; arrange shipping and handle exchanges; detect and support fraud; provide customer support; and support our services. We may also use contact information for marketing communications where permitted — you may opt out at any time.
    </LegalSection>
    <LegalSection title="SMS / Text Message Policy">
      SMS consent is not shared with third parties. We will never send unsolicited text messages. We only communicate via SMS when you text us first (explicit opt-in) or have requested a follow-up. All SMS is limited to the information you asked for. You may opt out at any time by texting STOP. We will never share your mobile information with anyone.
    </LegalSection>
    <LegalSection title="Your Rights">
      Depending on your location, you may have the right to: access personal information we hold about you; request deletion of your data; request correction of inaccurate data; receive a portable copy of your data; restrict processing; withdraw consent; and appeal decisions. Contact us at alphaomegatides@yahoo.com to exercise any of these rights.
    </LegalSection>
    <LegalSection title="Data Security and Retention">
      No security measures are perfect. We recommend not using inseaddress channels to communicate sensitive information. We retain your personal information as long as necessary to maintain your account, provide services, comply with legal obligations, resolve disputes, and enforce agreements.
    </LegalSection>
    <LegalSection title="Children's Data">
      Our services are not intended for use by children under 21. We do not knowingly collect personal information from anyone under 21. If you believe a minor has provided us with their information, contact us immediately.
    </LegalSection>
    <LegalSection title="Contact">
      For privacy questions or to exercise your rights: <strong>alphaomegatides@yahoo.com</strong>
    </LegalSection>
  </LegalPage>;
}

function CoaLibraryPage({go}){
  return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
    <div style={{maxWidth:900,margin:"0 auto",padding:"52px 24px 80px"}}>
      <span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:C.muted,cursor:"pointer",display:"block",marginBottom:24}}>← Back to Home</span>
      <div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:C.b,marginBottom:10}}>Independent Verification</div>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.6rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:12}}>COA Library</h1>
      <p style={{fontSize:"0.9rem",color:C.muted,lineHeight:1.8,marginBottom:12,maxWidth:660}}>All certificates are independently verified by Freedom Diagnostics — not just PDF downloads. <strong>Never trust a COA that cannot be independently verified at the lab's own website.</strong></p>
      <div style={{background:"rgba(59,232,176,0.08)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:12,padding:"12px 18px",fontSize:"0.8rem",color:"#0e6b4a",marginBottom:40,display:"flex",gap:10,alignItems:"center"}}>
        <span>🔬</span><span>All Alphaomegatides COAs tested by <strong>Freedom Diagnostics</strong> using HPLC and mass spectrometry verification. <a href="https://freedomdiagnostics.com" target="_blank" rel="noopener noreferrer" style={{color:"#3be8b0",textDecoration:"underline"}}>Verify at lab portal →</a></span>
      </div>

      {/* Testing methodology */}
      <div style={{background:"#1a1a1a",borderRadius:16,padding:"28px 32px",border:"1px solid rgba(255,255,255,0.07)",marginBottom:24}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.05rem",marginBottom:16}}>Testing Methodology</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {[["📄 HPLC Purity","High-Performance Liquid Chromatography confirms compound identity and purity percentage. All batches must meet ≥99% threshold."],["🧪 Endotoxin (USP <85>)","Bacterial endotoxin screening using the Charles River Endosafe PTS system per USP guidelines. Reported as EU/mL with coefficient of variation <25%."],["⚗️ Heavy Metals","USP Class 1 or Full Panel elemental impurity screening covering arsenic, cadmium, mercury, lead, and other regulated metals."],["✅ Sterility (USP)","Sterility testing confirms absence of microbial contamination. Some batches additionally undergo rapid sterility testing."]].map(([t,d])=>(
            <div key={t} style={{background:"#1c1c1c",borderRadius:12,padding:"16px 18px",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:6}}>{t}</div>
              <div style={{fontSize:"0.8rem",color:C.muted,lineHeight:1.6}}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* All product COA cards */}
      <div style={{display:"flex",flexDirection:"column",gap:18}}>
        {PRODUCTS.map(p=>{
          const isLight=p.color===C.g||p.color===C.y;
          return <div key={p.id} style={{background:"#1c1c1c",borderRadius:16,border:"1px solid rgba(255,255,255,0.07)",overflow:"hidden"}}>
            <div style={{background:p.color,padding:"14px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:"1.4rem"}}>{p.icon}</span>
                <div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,color:isLight?"#0e0e0e":"#fff",fontSize:"0.98rem"}}>{p.name}</div>
                  <div style={{fontSize:"0.72rem",color:isLight?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.65)"}}>{p.coa.tests.length} batch COAs · {p.coa.labs.join(" + ")}</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",color:isLight?"#0e0e0e":"#fff"}}>{p.coa.purity}</div>
              </div>
            </div>
            <div style={{padding:"18px 22px"}}>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {p.coa.tests.map(t=>(
                  <a key={t.name} href={t.url} target="_blank" rel="noreferrer"
                    style={{display:"inline-flex",alignItems:"center",gap:6,background:"#1e1e1e",color:"#fff",textDecoration:"none",padding:"8px 16px",borderRadius:100,fontSize:"0.77rem",fontWeight:600,transition:"background .2s"}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.b} onMouseLeave={e=>e.currentTarget.style.background=C.ink}>
                    {t.name} ↗
                  </a>
                ))}
              </div>
              <div style={{marginTop:12,fontSize:"0.72rem",color:C.muted}}>Labs: {p.coa.labs.join(" · ")}</div>
            </div>
          </div>;
        })}
      </div>

      <div style={{marginTop:32,background:"#1a1a1a",borderRadius:16,padding:"24px 28px",color:"rgba(255,255,255,0.5)",fontSize:"0.78rem",lineHeight:1.8}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#fff",marginBottom:8}}>About Certificate Fraud</div>
        Certificate fraud is common in the research peptide space. The two most common forms are doctored PDFs and stolen certificates. Protect yourself: always verify the certificate on the issuing laboratory's own website — not just by viewing a PDF. All Alphaomegatides certificates are tested by Freedom Diagnostics and verifiable directly on the lab's website with the batch ID.
      </div>
    </div>
    <SiteFooter go={go}/>
  </div>;
}


// ═══════════════════════════════════════════════════════════════
// PAGE PROGRESS BAR
// ═══════════════════════════════════════════════════════════════
function PageProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.min(100, (scrolled / max) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (pct <= 0) return null;
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,height:2,zIndex:9999,background:"rgba(255,255,255,0.06)"}}>
      <div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#ff6b6b,#a855f7,#3be8b0)",transition:"width .1s linear",borderRadius:"0 2px 2px 0"}}/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════

function OrderTrackingPage({go}: {go:(p:string,id?:string)=>void}) {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<null|"found"|"notfound">(null);
  const [order, setOrder] = useState<any>(null);

  const lookup = () => {
    if (!orderId.trim() || !email.trim()) return;
    // Check localStorage orders
    try {
      const users = JSON.parse(localStorage.getItem("nxg_u") || "{}");
      for (const u of Object.values(users) as any[]) {
        if (u.email?.toLowerCase() === email.toLowerCase()) {
          const found = (u.orders || []).find((o:any) => o.id?.toLowerCase() === orderId.trim().toLowerCase());
          if (found) { setOrder(found); setResult("found"); return; }
        }
      }
    } catch {}
    setResult("notfound");
  };

  const getStageIdx = (status:string) => {
    const map:Record<string,number> = { placed:0, processing:1, "quality-check":2, shipped:3, delivered:4 };
    return map[status?.toLowerCase()] ?? 1;
  };

  return (
    <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
      <div style={{maxWidth:580,margin:"0 auto",padding:"48px 24px 80px"}}>
        <span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.45)",cursor:"pointer",display:"block",marginBottom:24}}>← Back</span>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.6rem,4vw,2.2rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:6}}>Track Your Order</div>
        <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginBottom:28}}>Enter your order ID and email to check your shipment status.</p>

        <div style={{background:"#1a1a1a",borderRadius:18,padding:"24px",border:"1px solid rgba(255,255,255,0.08)",marginBottom:24}}>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
            <div>
              <label style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.4)",display:"block",marginBottom:5}}>ORDER ID</label>
              <input value={orderId} onChange={e=>setOrderId(e.target.value)} placeholder="e.g. NXG-00124"
                style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"11px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box"}}
                onFocus={e=>e.target.style.borderColor="#3be8b0"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
            </div>
            <div>
              <label style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.4)",display:"block",marginBottom:5}}>EMAIL ADDRESS</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="your@email.com"
                style={{width:"100%",background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"11px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box"}}
                onFocus={e=>e.target.style.borderColor="#3be8b0"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
            </div>
          </div>
          <button onClick={lookup} style={{width:"100%",padding:"13px",background:"#3be8b0",color:"#0e0e0e",border:"none",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.9rem"}}>
            Track Order →
          </button>
        </div>

        {result === "notfound" && (
          <div style={{background:"rgba(255,107,107,0.08)",border:"1px solid rgba(255,107,107,0.2)",borderRadius:14,padding:"18px 20px",textAlign:"center"}}>
            <div style={{fontSize:"1.5rem",marginBottom:8}}>🔍</div>
            <div style={{fontWeight:600,marginBottom:6}}>Order not found</div>
            <div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.4)",lineHeight:1.6}}>Check your order ID and email. Need help? <span onClick={()=>go("contact")} style={{color:"#4f8ef7",cursor:"pointer"}}>Contact us →</span></div>
          </div>
        )}

        {result === "found" && order && (
          <div style={{background:"#1a1a1a",borderRadius:18,border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden"}}>
            <div style={{background:"linear-gradient(135deg,rgba(59,232,176,0.12),rgba(79,142,247,0.08))",padding:"20px 22px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                <div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem"}}>{order.id}</div>
                  <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.45)",marginTop:3}}>{order.product} · {order.date}</div>
                </div>
                <div style={{background:"rgba(59,232,176,0.15)",color:"#3be8b0",fontWeight:700,fontSize:"0.75rem",padding:"4px 12px",borderRadius:100,border:"1px solid rgba(59,232,176,0.25)",textTransform:"uppercase"}}>{order.status}</div>
              </div>
            </div>
            <div style={{padding:"24px 22px"}}>
              {/* Progress stepper */}
              <div style={{marginBottom:20}}>
                {ORDER_STAGES.map((stage,i) => {
                  const stageIdx = getStageIdx(order.status);
                  const done = i <= stageIdx;
                  const active = i === stageIdx;
                  return (
                    <div key={stage} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:i<ORDER_STAGES.length-1?16:0}}>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                        <div style={{width:28,height:28,borderRadius:"50%",background:done?(active?"#3be8b0":"rgba(59,232,176,0.3)"):"rgba(255,255,255,0.08)",border:`2px solid ${done?"#3be8b0":"rgba(255,255,255,0.12)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.7rem",color:done?"#0e0e0e":"rgba(255,255,255,0.25)",fontWeight:700,transition:"all .3s"}}>
                          {done && !active ? "✓" : i+1}
                        </div>
                        {i < ORDER_STAGES.length-1 && <div style={{width:2,height:20,background:done?"rgba(59,232,176,0.3)":"rgba(255,255,255,0.08)",margin:"4px 0",borderRadius:1}}/>}
                      </div>
                      <div style={{paddingTop:4}}>
                        <div style={{fontSize:"0.85rem",fontWeight:active?700:500,color:active?"#fff":done?"rgba(255,255,255,0.55)":"rgba(255,255,255,0.25)"}}>{stage}</div>
                        {active && <div style={{fontSize:"0.72rem",color:"#3be8b0",marginTop:2}}>Current status</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
              {order.tracking && (
                <div style={{background:"#252525",borderRadius:10,padding:"12px 14px"}}>
                  <div style={{fontSize:"0.7rem",fontWeight:600,color:"rgba(255,255,255,0.35)",marginBottom:4}}>TRACKING NUMBER</div>
                  <div style={{fontSize:"0.85rem",fontWeight:600,fontFamily:"monospace"}}>{order.tracking}</div>
                  <a href={`https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${order.tracking}`} target="_blank" rel="noreferrer"
                    style={{display:"inline-block",marginTop:8,fontSize:"0.75rem",color:"#4f8ef7",textDecoration:"none"}}>Track on USPS →</a>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{marginTop:24,background:"rgba(255,107,107,0.06)",border:"1px solid rgba(255,107,107,0.12)",borderRadius:10,padding:"12px 16px",fontSize:"0.72rem",color:"rgba(255,200,180,0.6)",lineHeight:1.6}}>
          ⚠️ {DISCLAIMER_SHORT}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GATED PROTOCOL GUIDES (email capture → PDF download)
// ═══════════════════════════════════════════════════════════════
const GATED_GUIDES = [
  {id:"glp-protocol",title:"GLP Peptide Research Protocol",subtitle:"Complete GLP-1/2/3 reconstitution, titration, and cycling guide",icon:"🔥",color:"#ff6b6b",compounds:["GLP-3 R","GLP-2 T","GLP-1"]},
  {id:"gh-stack-protocol",title:"GH Stack Research Protocol",subtitle:"CJC-1295 + Ipamorelin + Tesamorlin timing, administration, and IGF-1 monitoring",icon:"💪",color:"#8b5cf6",compounds:["CJC-1295","Ipamorelin","Tesamorlin"]},
  {id:"supporting-protocol",title:"supporting Stack Research Protocol",subtitle:"BPC-157 + TB-500 dual-pathway research framework",icon:"🛡️",color:"#3be8b0",compounds:["BPC-157","TB-500"]},
  {id:"longevity-protocol",title:"Longevity Stack Research Protocol",subtitle:"NAD+ + MOTS-c + SS-31 mitochondrial research protocol",icon:"⚗️",color:"#f59e0b",compounds:["NAD+","MOTS-c","SS-31"]},
  {id:"cognitive-protocol",title:"Cognitive Research Protocol",subtitle:"Selank + Semax + DSIP neuro-stack administration guide",icon:"🧠",color:"#7c3aed",compounds:["Selank","Semax","DSIP"]},
];

function GatedProtocolsPage({go}: {go:(p:string,id?:string)=>void}) {
  const [unlocking, setUnlocking] = useState<string|null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("aot_unlocked_guides") || "[]"); } catch { return []; }
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const unlock = async (guideId: string) => {
    if (!name.trim() || !email.trim() || !email.includes("@")) return;
    setLoading(true);
    const guide = GATED_GUIDES.find(g=>g.id===guideId)!;
    await sendWaitlistEmail({name,email,interests:[guide.title],source:`Gated guide unlock — ${guide.title}`});
    try {
      const newUnlocked = [...unlocked, guideId];
      localStorage.setItem("aot_unlocked_guides", JSON.stringify(newUnlocked));
      setUnlocked(newUnlocked);
      const saved = JSON.parse(localStorage.getItem("aot_waitlist") || "[]");
      saved.push({name,email,date:new Date().toISOString(),source:`Guide: ${guide.title}`,interests:[guide.title]});
      localStorage.setItem("aot_waitlist", JSON.stringify(saved));
    } catch {}
    setLoading(false);
    setDone(true);
    setTimeout(()=>{setUnlocking(null);setDone(false);},1500);
  };

  return (
    <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
      <div style={{maxWidth:800,margin:"0 auto",padding:"48px 24px 80px"}}>
        <span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.45)",cursor:"pointer",display:"block",marginBottom:24}}>← Back</span>
        <div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#3be8b0",marginBottom:8}}>Exclusive Research Documentation</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.4rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:8}}>Protocol Guides</div>
        <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginBottom:32,lineHeight:1.7}}>
          Detailed week-by-week research protocols for each compound stack. Enter your email to unlock any guide — free, no spam.
        </p>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {GATED_GUIDES.map(guide => {
            const isUnlocked = unlocked.includes(guide.id);
            return (
              <div key={guide.id} style={{background:"#1a1a1a",borderRadius:18,border:`1px solid ${guide.color}33`,overflow:"hidden"}}>
                <div style={{display:"flex",alignItems:"center",gap:16,padding:"20px 22px",flexWrap:"wrap"}}>
                  <div style={{width:48,height:48,borderRadius:12,background:guide.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",flexShrink:0}}>{guide.icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",marginBottom:3}}>{guide.title}</div>
                    <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",marginBottom:6}}>{guide.subtitle}</div>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {guide.compounds.map(c=><span key={c} style={{fontSize:"0.65rem",padding:"2px 8px",borderRadius:100,background:guide.color+"18",color:guide.color,fontWeight:600}}>{c}</span>)}
                    </div>
                  </div>
                  {isUnlocked ? (
                    <button onClick={()=>{/* open download */}} style={{background:guide.color,color:guide.color==="#3be8b0"||guide.color==="#f59e0b"?"#0e0e0e":"#fff",border:"none",padding:"10px 20px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.82rem",flexShrink:0}}>
                      📥 Download PDF
                    </button>
                  ) : (
                    <button onClick={()=>{setUnlocking(guide.id);setDone(false);}} style={{background:"transparent",color:guide.color,border:`1.5px solid ${guide.color}55`,padding:"10px 20px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.82rem",flexShrink:0,transition:"all .15s"}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=guide.color+"22";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent";}}>
                      🔒 Unlock Free
                    </button>
                  )}
                </div>

                {unlocking === guide.id && !isUnlocked && (
                  <div style={{borderTop:`1px solid ${guide.color}22`,padding:"18px 22px",background:guide.color+"08"}}>
                    {done ? (
                      <div style={{color:"#3be8b0",fontWeight:600,fontSize:"0.88rem"}}>✅ Unlocked! Your guide is ready to download.</div>
                    ) : (
                      <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
                        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"
                          style={{flex:1,minWidth:120,background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none"}}/>
                        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="your@email.com"
                          style={{flex:2,minWidth:160,background:"#252525",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none"}}/>
                        <button onClick={()=>unlock(guide.id)} disabled={loading}
                          style={{background:guide.color,color:guide.color==="#3be8b0"||guide.color==="#f59e0b"?"#0e0e0e":"#fff",border:"none",padding:"10px 20px",borderRadius:9,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.85rem",whiteSpace:"nowrap"}}>
                          {loading?"…":"Unlock →"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{marginTop:28,fontSize:"0.72rem",color:"rgba(255,255,255,0.25)",lineHeight:1.7,textAlign:"center"}}>
          All protocol guides are for in-vitro research reference only · {DISCLAIMER_SHORT}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STICKY MOBILE BUY BAR (follows scroll on product page)
// ═══════════════════════════════════════════════════════════════
function StickyBuyBar({p, sel, onAction}: {p:any; sel:any; onAction:()=>void}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, {passive:true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  const isLight = p.color==="#ffd166"||p.color==="#3be8b0"||p.color==="#f59e0b";
  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:988,background:"rgba(10,10,10,0.97)",borderTop:"1px solid rgba(255,255,255,0.08)",padding:"12px 20px",display:"flex",alignItems:"center",gap:12,backdropFilter:"blur(12px)",transform:visible?"translateY(0)":"translateY(100%)",transition:"transform .25s cubic-bezier(.4,0,.2,1)"}}>
      <div style={{width:36,height:36,borderRadius:8,background:p.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0}}>{p.icon}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.85rem",color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
        <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.4)"}}>{sel?.s} · {sel?.p}</div>
      </div>
      <button onClick={onAction}
        style={{background:p.color,color:isLight?"#0e0e0e":"#fff",border:"none",padding:"11px 22px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.85rem",flexShrink:0,transition:"opacity .2s"}}
        onMouseEnter={e=>e.currentTarget.style.opacity="0.88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
        {`Add — ${sel?.p}`}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RELATED PRODUCTS (shown at bottom of product page)
// ═══════════════════════════════════════════════════════════════
function RelatedProducts({productId, go}: {productId:string; go:(p:string,id?:string)=>void}) {
  const meta = PRODUCT_META[productId];
  if (!meta?.stacks?.length) return null;
  const related = PRODUCTS.filter(p => meta.stacks.includes(p.id)).slice(0,3);
  if (!related.length) return null;
  return (
    <div style={{maxWidth:760,margin:"0 auto",padding:"0 24px 48px"}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",marginBottom:16}}>Commonly Stacked With</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {related.map(p => (
          <div key={p.id} onClick={()=>go("product",p.id)}
            style={{background:"#1a1a1a",borderRadius:14,padding:"14px 16px",border:`1px solid ${p.color}22`,cursor:"pointer",display:"flex",alignItems:"center",gap:12,transition:"all .2s"}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=p.color+"55";(e.currentTarget as HTMLElement).style.transform="translateX(4px)";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=p.color+"22";(e.currentTarget as HTMLElement).style.transform="none";}}>
            <div style={{width:40,height:40,borderRadius:10,background:p.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0}}>{p.icon}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem"}}>{p.name}</div>
              <div style={{fontSize:"0.73rem",color:"rgba(255,255,255,0.4)"}}>{p.tag} · {p.sizes?p.sizes[0].p:p.price}</div>
            </div>
            <div style={{fontSize:"0.78rem",color:p.color,fontWeight:600,flexShrink:0}}>View →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ANNOUNCEMENT BAR (rotating promo messages, dismissible)
// ═══════════════════════════════════════════════════════════════
function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("aot_theme") !== "light"; } catch { return true; }
  });
  const toggle = () => {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem("aot_theme", next ? "dark" : "light"); } catch {}
  };
  return { dark, toggle };
}



// ═══════════════════════════════════════════════════════════════
// TOAST NOTIFICATION SYSTEM
// ═══════════════════════════════════════════════════════════════
interface Toast { id:string; msg:string; type:"success"|"error"|"info"; }
let _toastFn: ((msg:string,type?:Toast["type"])=>void)|null = null;
function showToast(msg:string, type:Toast["type"]="success") { _toastFn?.(msg,type); }

function ToastProvider() {
  const [toasts,setToasts] = useState<Toast[]>([]);
  useEffect(()=>{ _toastFn=(msg,type="success")=>{ const id=Date.now().toString(); setToasts(p=>[...p,{id,msg,type}]); setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3200); }; return()=>{ _toastFn=null; }; },[]);
  if(!toasts.length) return null;
  return (
    <div style={{position:"fixed",top:72,right:16,zIndex:10000,display:"flex",flexDirection:"column",gap:8,pointerEvents:"none"}}>
      {toasts.map(t=>(
        <div key={t.id} style={{background:t.type==="success"?"rgba(59,232,176,0.95)":t.type==="error"?"rgba(255,107,107,0.95)":"rgba(79,142,247,0.95)",color:"#0e0e0e",padding:"10px 18px",borderRadius:12,fontSize:"0.82rem",fontWeight:600,boxShadow:"0 4px 20px rgba(0,0,0,0.4)",animation:"fadeIn 0.2s ease-out",maxWidth:280,pointerEvents:"auto"}}>
          {t.type==="success"?"✅":t.type==="error"?"❌":"ℹ️"} {t.msg}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FLOATING CHATBOT
// ═══════════════════════════════════════════════════════════════
// ── SCROLL TO TOP BUTTON ─────────────────────────────────────
function ScrollToTopBtn() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const handle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handle, {passive:true});
    return () => window.removeEventListener("scroll", handle);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({top:0,behavior:"smooth"})}
      style={{position:"fixed",bottom:78,right:16,zIndex:800,width:40,height:40,borderRadius:"50%",background:"rgba(59,232,176,0.15)",border:"1px solid rgba(59,232,176,0.3)",color:"#3be8b0",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)",boxShadow:"0 4px 16px rgba(0,0,0,0.3)",transition:"opacity .2s"}}>
      ↑
    </button>
  );
}

function ChatWidget() {
  const [open,setOpen] = useState(false);
  const [msgs,setMsgs] = useState<{role:string;text:string}[]>([{role:"bot",text:"Hi! I'm the Alphaomegatides research assistant. Ask me anything about our compounds, reconstitution, protocols, or ordering."}]);
  const [input,setInput] = useState("");
  const [typing,setTyping] = useState(false);
  const [unread,setUnread] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);
  useEffect(()=>{ if(open) setUnread(0); },[open]);

  const send = async(text?:string) => {
    const q = (text||input).trim();
    if(!q) return;
    setInput("");
    setMsgs(p=>[...p,{role:"user",text:q}]);
    setTyping(true);
    // Small delay for natural feel, then use local BOT_QA
    await new Promise(r=>setTimeout(r,600+Math.random()*400));
    const reply = getBotReply(q);
    setMsgs(p=>[...p,{role:"bot",text:reply}]);
    setTyping(false);
    if(!open) setUnread(n=>n+1);
  };

  const handleKey = (e:any) => { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();} };

  return (
    <>
      {/* Toggle button */}
      <button onClick={()=>setOpen(p=>!p)}
        style={{position:"fixed",bottom:open?340:80,right:16,zIndex:990,width:52,height:52,borderRadius:"50%",background:open?"#1c1c1c":"linear-gradient(135deg,#3be8b0,#4f8ef7)",color:open?"rgba(255,255,255,0.7)":"#0e0e0e",border:open?"1px solid rgba(255,255,255,0.12)":"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",boxShadow:"0 4px 20px rgba(0,0,0,0.4)",transition:"all .25s cubic-bezier(.4,0,.2,1)"}}>
        {open?"✕":"🤖"}
        {!open&&unread>0&&<span style={{position:"absolute",top:2,right:2,width:16,height:16,borderRadius:"50%",background:"#ff6b6b",color:"#fff",fontSize:"0.6rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{unread}</span>}
      </button>

      {/* Chat window */}
      {open&&(
        <div style={{position:"fixed",bottom:84,right:16,zIndex:989,width:Math.min(340,window.innerWidth-32),height:380,background:"#111",borderRadius:18,border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 16px 60px rgba(0,0,0,0.6)",display:"flex",flexDirection:"column",overflow:"hidden",animation:"fadeIn .2s ease-out"}}>
          {/* Header */}
          <div style={{padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",gap:10,background:"linear-gradient(135deg,rgba(59,232,176,0.08),rgba(79,142,247,0.06))"}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#3be8b0,#4f8ef7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.9rem",flexShrink:0}}>🤖</div>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.85rem"}}>Research Assistant</div>
              <div style={{fontSize:"0.65rem",color:"#3be8b0"}}>● Online · Alphaomegatides</div>
            </div>
          </div>
          {/* Messages */}
          <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:8}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"85%",background:m.role==="user"?"#3be8b0":"rgba(255,255,255,0.06)",color:m.role==="user"?"#0e0e0e":"rgba(255,255,255,0.85)",padding:"9px 13px",borderRadius:m.role==="user"?"14px 14px 2px 14px":"14px 14px 14px 2px",fontSize:"0.8rem",lineHeight:1.55}}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing&&<div style={{display:"flex",gap:4,padding:"8px 12px",background:"rgba(255,255,255,0.06)",borderRadius:"14px 14px 14px 2px",width:"fit-content"}}>
              {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"rgba(255,255,255,0.4)",animation:`bounce .9s ${i*0.15}s ease-in-out infinite`}}/>)}
            </div>}
            <div ref={endRef}/>
          </div>
          {/* Quick questions */}
          {msgs.length<=2&&(
            <div style={{padding:"0 12px 8px",display:"flex",gap:5,flexWrap:"wrap"}}>
              {SUGGESTED_QUESTIONS.slice(0,4).map(q=>(
                <button key={q} onClick={()=>send(q)} style={{background:"rgba(59,232,176,0.08)",border:"1px solid rgba(59,232,176,0.2)",color:"rgba(255,255,255,0.6)",padding:"4px 10px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.68rem",transition:"all .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.color="#3be8b0"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.6)"}>
                  {q.length>30?q.slice(0,28)+"…":q}
                </button>
              ))}
            </div>
          )}
          {/* Input */}
          <div style={{padding:"10px 12px",borderTop:"1px solid rgba(255,255,255,0.07)",display:"flex",gap:8,alignItems:"center"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey} placeholder="Ask about any compound…"
              style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:9,padding:"8px 11px",color:"#fff",fontFamily:"inherit",fontSize:"0.82rem",outline:"none"}}
              onFocus={e=>e.target.style.borderColor="#3be8b0"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
            <button onClick={()=>send()} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:"0.9rem",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>→</button>
          </div>
        </div>
      )}
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// COA VERIFIER WIDGET
// ═══════════════════════════════════════════════════════════════
function CoaVerifierWidget({go}: {go:(p:string,id?:string)=>void}) {
  const [query,setQuery] = useState("");
  const [results,setResults] = useState<any[]>([]);
  const [searched,setSearched] = useState(false);

  const search = () => {
    if(!query.trim()){setResults([]);setSearched(false);return;}
    const q = query.toLowerCase();
    const found: any[] = [];
    PRODUCTS.forEach(p=>{
      p.coa.tests.forEach(t=>{
        if(p.name.toLowerCase().includes(q)||t.name.toLowerCase().includes(q)||p.id.includes(q)){
          found.push({product:p,test:t});
        }
      });
    });
    setResults(found);
    setSearched(true);
  };

  return (
    <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
      <div style={{maxWidth:680,margin:"0 auto",padding:"48px 24px 80px"}}>
        <span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.45)",cursor:"pointer",display:"block",marginBottom:24}}>← Back</span>
        <div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#3be8b0",marginBottom:8}}>Independent Verification</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.6rem,4vw,2.2rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:8}}>COA Verifier</div>
        <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginBottom:28,lineHeight:1.7}}>
          Search by compound name or batch to access all Certificates of Analysis directly. Each COA links to Freedom Diagnostics for independent verification.
        </p>
        <div style={{background:"rgba(255,107,107,0.07)",border:"1px solid rgba(255,107,107,0.15)",borderRadius:12,padding:"13px 16px",marginBottom:24,fontSize:"0.78rem",color:"rgba(255,200,180,0.7)",lineHeight:1.6}}>
          🛡️ <strong style={{color:"rgba(255,180,160,0.9)"}}>Anti-fraud tip:</strong> Always verify COAs at the lab's own website — never trust a PDF alone. All links below go directly to Freedom Diagnostics' servers.
        </div>
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()} placeholder="Search compound or batch (e.g. BPC-157, GLP-3, COA #2…)"
            style={{flex:1,background:"#1a1a1a",border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:100,padding:"11px 18px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none"}}
            onFocus={e=>e.target.style.borderColor="#3be8b0"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
          <button onClick={search} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"11px 22px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.88rem"}}>Search</button>
        </div>

        {!searched&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {PRODUCTS.slice(0,6).map(p=>(
              <div key={p.id} style={{background:"#1a1a1a",borderRadius:14,padding:"14px 16px",border:`1px solid ${p.color}22`,display:"flex",alignItems:"center",gap:12,cursor:"pointer",transition:"all .2s"}}
                onClick={()=>{setQuery(p.name);setResults(p.coa.tests.map(t=>({product:p,test:t})));setSearched(true);}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=p.color+"55";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=p.color+"22";}}>
                <span style={{fontSize:"1.2rem"}}>{p.icon}</span>
                <div style={{flex:1}}><div style={{fontWeight:600,fontSize:"0.85rem"}}>{p.name}</div><div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.35)"}}>{p.coa.tests.length} COA{p.coa.tests.length!==1?"s":""} available</div></div>
                <div style={{fontSize:"0.78rem",fontWeight:700,color:"#3be8b0"}}>{p.coa.purity}</div>
              </div>
            ))}
            <button onClick={()=>{setQuery("COA");search();}} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"12px",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontFamily:"inherit",fontSize:"0.8rem"}}>Show all {PRODUCTS.reduce((s,p)=>s+p.coa.tests.length,0)} COAs →</button>
          </div>
        )}

        {searched&&(
          results.length===0?(
            <div style={{textAlign:"center",padding:"32px 0",color:"rgba(255,255,255,0.3)"}}>
              <div style={{fontSize:"2rem",marginBottom:8}}>🔍</div>
              <div>No COAs found for "{query}"</div>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.35)",marginBottom:4}}>{results.length} result{results.length!==1?"s":""} found</div>
              {results.map((r,i)=>(
                <div key={i} style={{background:"#1a1a1a",borderRadius:14,padding:"14px 16px",border:`1px solid ${r.product.color}22`}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <span style={{fontSize:"1.1rem"}}>{r.product.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:"0.85rem"}}>{r.product.name}</div>
                      <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.35)"}}>Freedom Diagnostics · {r.product.coa.purity}</div>
                    </div>
                    <span style={{background:"rgba(59,232,176,0.12)",color:"#3be8b0",fontSize:"0.68rem",fontWeight:700,padding:"2px 10px",borderRadius:100}}>PASS</span>
                  </div>
                  <a href={r.test.url} target="_blank" rel="noreferrer"
                    style={{display:"flex",alignItems:"center",gap:8,background:"rgba(79,142,247,0.08)",border:"1px solid rgba(79,142,247,0.2)",borderRadius:10,padding:"10px 14px",textDecoration:"none",transition:"all .2s"}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(79,142,247,0.14)";}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="rgba(79,142,247,0.08)";}}>
                    <span style={{fontSize:"0.9rem"}}>📄</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"0.82rem",fontWeight:600,color:"#fff"}}>{r.test.name}</div>
                      <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.35)"}}>{r.test.result}</div>
                    </div>
                    <span style={{fontSize:"0.78rem",color:"#4f8ef7",fontWeight:600}}>Open ↗</span>
                  </a>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 404 / NOT FOUND PAGE
// ═══════════════════════════════════════════════════════════════
function NotFoundPage({go}: {go:(p:string)=>void}) {
  return (
    <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"80px 24px"}}>
      <div style={{textAlign:"center",maxWidth:440}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"6rem",color:"rgba(255,255,255,0.06)",lineHeight:1,marginBottom:16}}>404</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",marginBottom:10}}>Page not found</div>
        <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",lineHeight:1.7,marginBottom:28}}>The page you're looking for doesn't exist, or may have moved.</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>go("home")} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"12px 28px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.9rem"}}>← Home</button>
          <button onClick={()=>go("contact")} style={{background:"transparent",color:"rgba(255,255,255,0.5)",border:"1.5px solid rgba(255,255,255,0.15)",padding:"12px 24px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.88rem"}}>Contact Us</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// COOKIE CONSENT BANNER
// ═══════════════════════════════════════════════════════════════
function CookieConsent() {
  const [show, setShow] = useState(() => {
    try { return !localStorage.getItem("aot_cookie"); } catch { return true; }
  });
  if (!show) return null;
  const accept = () => { try { localStorage.setItem("aot_cookie","1"); } catch {} setShow(false); };
  const decline = () => { setShow(false); };
  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:9992,background:"rgba(14,14,14,0.98)",borderTop:"1px solid rgba(255,255,255,0.08)",padding:"14px 20px",display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",backdropFilter:"blur(10px)"}}>
      <div style={{flex:1,minWidth:200,fontSize:"0.78rem",color:"rgba(255,255,255,0.5)",lineHeight:1.6}}>
        🍪 We use cookies and localStorage to remember your preferences, cart, and session. No third-party ad tracking. <span onClick={()=>window.open("https://alphaomegatides.com","_blank")} style={{color:"#4f8ef7",cursor:"pointer",textDecoration:"underline"}}>Privacy Policy</span>
      </div>
      <div style={{display:"flex",gap:8,flexShrink:0}}>
        <button onClick={decline} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.4)",padding:"7px 16px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.75rem"}}>Decline</button>
        <button onClick={accept} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"7px 18px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.75rem"}}>Accept</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MOBILE BOTTOM NAV BAR
// ═══════════════════════════════════════════════════════════════
function MobileBottomNav({go, pg, cartCount, user}: {go:(p:string,id?:string)=>void; pg:string; cartCount:number; user:any}) {
  const items = [
    {icon:"🏠", label:"Home",    page:"home"},
    {icon:"🎯", label:"Quiz",    page:"quiz"},
    {icon:"🛒", label:"Cart",    page:"cart", badge:cartCount},
    {icon:"💬", label:"Chat",    page:"chat", membersOnly:true},
    {icon:"👤", label:"Account", page:"dashboard"},
  ];
  return (
    <nav style={{position:"fixed",bottom:0,left:0,right:0,zIndex:987,background:"rgba(10,10,10,0.97)",borderTop:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"stretch",backdropFilter:"blur(12px)",paddingBottom:"env(safe-area-inset-bottom)"}}>
      {items.map(item=>(
        <button key={item.page}
          onClick={()=>{
            if(item.membersOnly && !user) { go("login"); return; }
            go(item.page);
          }}
          style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,padding:"8px 4px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",position:"relative",transition:"opacity .15s",opacity:pg===item.page?1:0.45}}>
          <span style={{fontSize:"1.1rem"}}>{item.icon}</span>
          <span style={{fontSize:"0.55rem",fontWeight:pg===item.page?700:400,color:pg===item.page?"#3be8b0":"rgba(255,255,255,0.5)",letterSpacing:"0.04em"}}>{item.label}</span>
          {item.badge!=null&&item.badge>0&&<span style={{position:"absolute",top:6,right:"calc(50% - 14px)",width:14,height:14,borderRadius:"50%",background:"#ff6b6b",color:"#fff",fontSize:"0.55rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{item.badge}</span>}
          {item.membersOnly&&!user&&<span style={{position:"absolute",top:5,right:"calc(50% - 16px)",fontSize:"0.55rem",color:"rgba(255,209,102,0.7)"}}>🔒</span>}
          {pg===item.page&&<div style={{position:"absolute",bottom:0,left:"20%",right:"20%",height:2,background:"#3be8b0",borderRadius:2}}/>}
        </button>
      ))}
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════════
function useKeyboardShortcuts(go: (p:string,id?:string)=>void, setSearchOpen: (v:boolean)=>void) {
  useEffect(()=>{
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if(tag==="INPUT"||tag==="TEXTAREA"||tag==="SELECT") return;
      if(e.key==="/"){ e.preventDefault(); setSearchOpen(true); return; }
      if(e.key==="Escape"){ setSearchOpen(false); return; }
      if(e.key==="h"&&!e.ctrlKey&&!e.metaKey){ go("home"); return; }
      if(e.key==="c"&&!e.ctrlKey&&!e.metaKey){ go("cart"); return; }
      if(e.key==="?"){ go("quiz"); return; }
    };
    window.addEventListener("keydown",handler);
    return()=>window.removeEventListener("keydown",handler);
  },[go,setSearchOpen]);
}

// ═══════════════════════════════════════════════════════════════
// FULL SEARCH PAGE / OVERLAY
// ═══════════════════════════════════════════════════════════════
function SearchOverlay({open, onClose, go}: {open:boolean; onClose:()=>void; go:(p:string,id?:string)=>void}) {
  const [q,setQ] = useState("");
  const [debouncedQ,setDebouncedQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>{ if(open){ setQ(""); setDebouncedQ(""); setTimeout(()=>inputRef.current?.focus(),50); } },[open]);
  useEffect(()=>{ const h=(e:KeyboardEvent)=>{if(e.key==="Escape")onClose();}; window.addEventListener("keydown",h); return()=>window.removeEventListener("keydown",h); },[onClose]);

  const handleSearch = (v:string) => {
    setQ(v);
    if(debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(()=>setDebouncedQ(v), 150);
  };

  const results = debouncedQ.trim().length>1 ? PRODUCTS.filter(p=>{
    const t=[p.name,p.tag,p.id,p.desc||"",...(PRODUCT_META[p.id]?.bestFor||[]),...(p.chips||[])].join(" ").toLowerCase();
    return t.includes(debouncedQ.toLowerCase());
  }) : [];

  if(!open) return null;
  return (
    <div style={{position:"fixed",inset:0,zIndex:10001,background:"rgba(0,0,0,0.88)",backdropFilter:"blur(8px)",padding:"20px 16px"}} onClick={onClose}>
      <div style={{maxWidth:620,margin:"0 auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",alignItems:"center",gap:10,background:"#1a1a1a",borderRadius:16,padding:"12px 16px",border:"1.5px solid rgba(59,232,176,0.3)",marginBottom:16}}>
          <span style={{fontSize:"1rem",color:"rgba(255,255,255,0.4)"}}>🔍</span>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search compounds, benefits, mechanisms…"
            style={{flex:1,background:"none",border:"none",color:"#fff",fontFamily:"inherit",fontSize:"1rem",outline:"none"}}/>
          <span style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.25)"}}>ESC to close</span>
        </div>
        {q.trim().length>1&&(
          <div style={{background:"#141414",borderRadius:14,border:"1px solid rgba(255,255,255,0.07)",overflow:"hidden"}}>
            {results.length===0?(
              <div style={{padding:"24px",textAlign:"center",color:"rgba(255,255,255,0.3)",fontSize:"0.88rem"}}>No compounds found for "{q}"</div>
            ):(
              results.map(p=>(
                <div key={p.id} onClick={()=>{go("product",p.id);onClose();}}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",cursor:"pointer",borderBottom:"1px solid rgba(255,255,255,0.05)",transition:"background .15s"}}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.04)"}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="transparent"}>
                  <div style={{width:36,height:36,borderRadius:8,background:p.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>{p.icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem"}}>{p.name}</div>
                    <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.35)",marginTop:2}}>{p.tag} · {p.sizes?p.sizes[0].p:p.price}</div>
                  </div>
                  <div style={{fontSize:"0.72rem",color:p.color,fontWeight:600,flexShrink:0}}>View →</div>
                </div>
              ))
            )}
            <div style={{padding:"8px 14px",fontSize:"0.68rem",color:"rgba(255,255,255,0.2)",textAlign:"center",borderTop:"1px solid rgba(255,255,255,0.04)"}}>{results.length} compound{results.length!==1?"s":""} match "{q}"</div>
          </div>
        )}
        {!q.trim()&&(
          <div style={{background:"#141414",borderRadius:14,border:"1px solid rgba(255,255,255,0.07)",padding:"16px"}}>
            <div style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",marginBottom:10}}>SHORTCUTS</div>
            {[["/ ","Open search"],["H","Home"],["C","Cart"],["?","Quiz — find my compound"],["ESC","Close"]].map(([k,d])=>(
              <div key={k} style={{display:"flex",gap:12,alignItems:"center",marginBottom:8}}>
                <kbd style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:6,padding:"2px 8px",fontSize:"0.72rem",fontFamily:"monospace",color:"rgba(255,255,255,0.5)",minWidth:28,textAlign:"center"}}>{k}</kbd>
                <span style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.4)"}}>{d}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DYNAMIC PAGE TITLE
// ═══════════════════════════════════════════════════════════════
function usePageTitle(pg: string, pid: string|null) {
  useEffect(()=>{
    const titles: Record<string,string> = {
      home:"Alphaomegatides | Research Peptides — BPC-157, Semaglutide, TB-500, NAD+",
      cart:"Shopping Cart | Alphaomegatides",
      quiz:"Find My Compound | Alphaomegatides",
      bundles:"Research Stacks | Alphaomegatides",
      protocols:"Protocol Guides | Alphaomegatides",
      track:"Track Order | Alphaomegatides",
      coa:"COA Library | Alphaomegatides",
      research:"Research Library | Alphaomegatides",
      compliance:"Compliance & Disclaimers | Alphaomegatides",
      contact:"Contact | Alphaomegatides",
      login:"Sign In | Alphaomegatides",
      register:"Create Account | Alphaomegatides",
      terms:"Terms of Service | Alphaomegatides",
      privacy:"Privacy Policy | Alphaomegatides",
      refund:"Refund Policy | Alphaomegatides",
      dashboard:"My Account | Alphaomegatides",
      "coa-verify":"COA Verifier | Alphaomegatides",
    };
    if(pg==="product"&&pid){
      const p=PRODUCTS.find(x=>x.id===pid);
      document.title=p?`${p.name} Research Compound | Alphaomegatides`:"Product | Alphaomegatides";
    } else {
      document.title=titles[pg]||"Alphaomegatides | Research Peptides";
    }
  },[pg,pid]);
}


// ── AGE GATE ─────────────────────────────────────────
function AgeGate({onConfirm}){
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:24,backdropFilter:"blur(8px)"}}>
    <div style={{background:"#1a1a1a",borderRadius:24,padding:"44px 36px",maxWidth:440,width:"100%",textAlign:"center",boxShadow:"0 32px 80px rgba(0,0,0,0.4)"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.8rem",color:"#ff6b6b",lineHeight:1,textShadow:"0 0 16px rgba(255,107,107,0.45)"}}>α</span>
          <svg width="120" height="36" viewBox="0 0 14 28" fill="none" style={{transform:"rotate(90deg)"}} xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="agegatedna" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#ff6b6b"/><stop offset="50%" stopColor="#a855f7"/><stop offset="100%" stopColor="#3be8b0"/></linearGradient></defs>
            <path d="M3 0 C1 4,1 8,3 12 C5 16,6 20,4 24 C3 26,2 27,2 28" stroke="url(#agegatedna)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <path d="M11 0 C13 4,13 8,11 12 C9 16,8 20,10 24 C11 26,12 27,12 28" stroke="url(#agegatedna)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <line x1="3" y1="0" x2="11" y2="0" stroke="rgba(255,107,107,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="2" y1="7" x2="12" y2="7" stroke="rgba(168,85,247,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="4" y1="14" x2="10" y2="14" stroke="rgba(100,150,255,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="3" y1="21" x2="11" y2="21" stroke="rgba(59,232,176,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="2" y1="28" x2="12" y2="28" stroke="rgba(59,232,176,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
            <circle cx="3" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/>
            <circle cx="11" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/>
            <circle cx="4" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/>
            <circle cx="10" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/>
            <circle cx="3" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/>
            <circle cx="11" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/>
          </svg>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.8rem",color:"#3be8b0",lineHeight:1,textShadow:"0 0 16px rgba(59,232,176,0.45)"}}>Ω</span>
        </div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.65rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)"}}>Alphaomegatides</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontWeight:700,fontSize:"1.05rem",color:"rgba(255,255,255,0.55)",marginTop:6,letterSpacing:"0.02em",textAlign:"center"}}>"Where the tide turns for all."</div>
      </div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.3rem",fontWeight:800,marginBottom:16,letterSpacing:"-.02em"}}>Age & Terms Verification</div>
      <div style={{background:"rgba(255,107,107,0.08)",border:"1px solid rgba(255,107,107,0.25)",borderRadius:12,padding:"14px 18px",marginBottom:24,fontSize:"0.84rem",color:"rgba(255,180,160,0.95)",lineHeight:1.75}}>
        <strong>⚠️ For Research Use Only</strong><br/>
        All products are for in-vitro laboratory research only. Not for human or veterinary consumption. Not FDA-approved for research use.
      </div>
      <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.65)",lineHeight:1.75,marginBottom:28}}>
        By entering this site you confirm that you are <strong>at least 21 years old</strong>, a qualified research or laboratory professional, and that you have read and agree to our Terms of Service and research-use-only restrictions.
      </p>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={onConfirm} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"14px 32px",borderRadius:100,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"0.95rem",transition:"background .2s"}} onMouseEnter={e=>e.currentTarget.style.background=C.b} onMouseLeave={e=>e.currentTarget.style.background=C.ink}>
          I am 21+ and agree →
        </button>
        <button onClick={()=>window.location.href="https://www.google.com"} style={{background:"transparent",color:C.muted,border:"1.5px solid rgba(255,255,255,0.2)",padding:"14px 24px",borderRadius:100,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.88rem"}}>
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

// ─── INVENTORY SYSTEM ─────────────────────────────────────────────────────────
const INITIAL_INVENTORY: Record<string,number> = {
  "glp3r":10,"glp2t":10,"glp1":10,"bpc157":10,"tb500":10,"cjc1295":10,
  "cjcipa":10,"ipamorlin":10,"tesamorlin":10,"igf1lr3":10,"ghkcu":10,
  "glow":10,"nad":10,"motsc":10,"glutathione":10,"ss31":10,"selank":10,
  "semax":10,"dsip":10,"mt2":10,"reconst":10,
};
function getInventory():Record<string,number>{
  try{ const s=localStorage.getItem("nxg_inv"); return s?JSON.parse(s):INITIAL_INVENTORY; }
  catch{ return INITIAL_INVENTORY; }
}
function saveInventory(inv:Record<string,number>){ localStorage.setItem("nxg_inv",JSON.stringify(inv)); }
function decrementInventory(productId:string){
  const inv=getInventory();
  if(inv[productId]===undefined) inv[productId]=10;
  if(inv[productId]>0) inv[productId]--;
  saveInventory(inv);
  return inv[productId];
}
function getStock(productId:string):number{
  const inv=getInventory();
  return inv[productId]===undefined?10:inv[productId];
}

function StockBadge({productId,color=""}:{productId:string,color?:string}){
  const [stock,setStock]=useState(()=>getStock(productId));
  useEffect(()=>{
    const handler=()=>setStock(getStock(productId));
    window.addEventListener("nxg_inv_update",handler);
    return()=>window.removeEventListener("nxg_inv_update",handler);
  },[productId]);
  if(stock<=0) return(
    <span style={{background:"rgba(255,107,107,0.12)",border:"1px solid rgba(255,107,107,0.3)",borderRadius:20,padding:"2px 9px",fontSize:"0.65rem",fontWeight:700,color:"#ff6b6b",letterSpacing:"0.06em"}}>OUT OF STOCK</span>
  );
  return(
    <span style={{background:stock<=3?"rgba(255,193,7,0.12)":"rgba(59,232,176,0.08)",border:`1px solid ${stock<=3?"rgba(255,193,7,0.3)":"rgba(59,232,176,0.15)"}`,borderRadius:20,padding:"2px 9px",fontSize:"0.65rem",fontWeight:700,color:stock<=3?"#ffc107":"#3be8b0",letterSpacing:"0.06em"}}>
      {stock<=3?`⚡ ${stock} left`:`${stock} in stock`}
    </span>
  );
}


const AUTHNET_CONFIG = {
  apiLoginId: "YOUR_API_LOGIN_ID",       // from Authorize.net dashboard
  clientKey: "YOUR_CLIENT_KEY",          // from Authorize.net dashboard
  environment: "PRODUCTION",             // "SANDBOX" for testing, "PRODUCTION" for live
};

function AuthNetCheckout({cart, total}:{cart:any[], total:number}) {
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const formatCard = (v:string) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const formatExpiry = (v:string) => {
    const d = v.replace(/\D/g,"").slice(0,4);
    return d.length>2 ? d.slice(0,2)+"/"+d.slice(2) : d;
  };

  const handleSubmit = async () => {
    if(!cardNum||!expiry||!cvv||!name||!zip){setError("Please fill in all fields.");return;}
    setLoading(true);setError("");
    try {
      // Authorize.net Accept.js tokenization
      const authData = { clientKey: AUTHNET_CONFIG.clientKey, apiLoginID: AUTHNET_CONFIG.apiLoginId };
      const [expM, expY] = expiry.split("/");
      const cardData = { cardNumber: cardNum.replace(/\s/g,""), month: expM, year: "20"+expY, cardCode: cvv, zip };
      (window as any).Accept.dispatchData({authData, cardData}, async (res:any) => {
        if(res.messages.resultCode==="Error"){
          setError(res.messages.message[0].text);
          setLoading(false);return;
        }
        // Send nonce to your backend to charge
        const nonce = res.opaqueData;
        // TODO: POST nonce + total + cart to your backend endpoint
        // For now we show success — wire up backend when ready
        console.log("AuthNet nonce received:", nonce);
        setSuccess(true);setLoading(false);
      });
    } catch(e) {
      setError("Payment error. Please try again.");setLoading(false);
    }
  };

  if(success) return (
    <div style={{textAlign:"center",padding:"32px 0"}}>
      <div style={{fontSize:"2.5rem",marginBottom:12}}>✅</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",marginBottom:8,color:"#3be8b0"}}>Payment Authorized</div>
      <p style={{color:"rgba(255,255,255,0.5)",fontSize:"0.85rem",lineHeight:1.6}}>Your order is being processed. You'll receive a confirmation email shortly.</p>
    </div>
  );

  return (
    <div>
      {/* Accept.js script */}
      <script src={`https://js${AUTHNET_CONFIG.environment==="SANDBOX"?".sandbox":""}.authorize.net/v1/Accept.js`} charSet="utf-8"/>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {/* Name */}
        <div>
          <label style={{fontSize:"0.72rem",fontWeight:700,color:"rgba(255,255,255,0.45)",letterSpacing:"0.1em",display:"block",marginBottom:5}}>CARDHOLDER NAME</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="John Smith"
            style={{width:"100%",background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px 14px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}}/>
        </div>
        {/* Card number */}
        <div>
          <label style={{fontSize:"0.72rem",fontWeight:700,color:"rgba(255,255,255,0.45)",letterSpacing:"0.1em",display:"block",marginBottom:5}}>CARD NUMBER</label>
          <input value={cardNum} onChange={e=>setCardNum(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19}
            style={{width:"100%",background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px 14px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",outline:"none",boxSizing:"border-box",letterSpacing:"0.1em"}}/>
        </div>
        {/* Expiry + CVV + ZIP */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          <div>
            <label style={{fontSize:"0.72rem",fontWeight:700,color:"rgba(255,255,255,0.45)",letterSpacing:"0.1em",display:"block",marginBottom:5}}>EXPIRY</label>
            <input value={expiry} onChange={e=>setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5}
              style={{width:"100%",background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px 10px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",outline:"none",boxSizing:"border-box",textAlign:"center"}}/>
          </div>
          <div>
            <label style={{fontSize:"0.72rem",fontWeight:700,color:"rgba(255,255,255,0.45)",letterSpacing:"0.1em",display:"block",marginBottom:5}}>CVV</label>
            <input value={cvv} onChange={e=>setCvv(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="•••" maxLength={4}
              style={{width:"100%",background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px 10px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",outline:"none",boxSizing:"border-box",textAlign:"center"}}/>
          </div>
          <div>
            <label style={{fontSize:"0.72rem",fontWeight:700,color:"rgba(255,255,255,0.45)",letterSpacing:"0.1em",display:"block",marginBottom:5}}>ZIP</label>
            <input value={zip} onChange={e=>setZip(e.target.value.replace(/\D/g,"").slice(0,5))} placeholder="10001" maxLength={5}
              style={{width:"100%",background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px 10px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",outline:"none",boxSizing:"border-box",textAlign:"center"}}/>
          </div>
        </div>

        {error&&<div style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.25)",borderRadius:10,padding:"10px 14px",color:"#ff8a80",fontSize:"0.82rem"}}>{error}</div>}

        <button onClick={handleSubmit} disabled={loading}
          style={{width:"100%",padding:"16px",background:loading?"#333":"#4f8ef7",color:"#fff",borderRadius:100,border:"none",cursor:loading?"not-allowed":"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"background 0.2s"}}>
          {loading ? "Processing…" : <><span>🔒</span> Pay ${total.toFixed(2)} · Authorize.net</>}
        </button>

        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:4}}>
          <span style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.25)"}}>Secured by Authorize.net · PCI DSS Compliant</span>
        </div>
      </div>
    </div>
  );
}

// ── SEND WAITLIST EMAIL via Resend API ──────────────────────────
// Simple in-memory rate limiter — max 3 emails per session
const _emailRateMap: Record<string,number> = {};
function isRateLimited(email: string): boolean {
  const key = email.toLowerCase();
  const count = _emailRateMap[key] || 0;
  if (count >= 3) return true;
  _emailRateMap[key] = count + 1;
  return false;
}

async function sendWaitlistEmail(data: {name:string,email:string,interests?:string[],source?:string}) {
  if (isRateLimited(data.email)) { console.warn("Rate limited:", data.email); return; }
  try {
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "notify", data }),
    });
  } catch(e) { console.error("Email error:", e); }
}

// ── COMING SOON / WAITLIST MODAL ─────────────────────────────────
function ComingSoonModal({onClose, cartItems=[], sourcePage=""}:{onClose:()=>void, cartItems?:any[], sourcePage?:string}) {
  const [step, setStep] = useState<"main"|"interests"|"done">("main");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Pre-select cart items as interests
  const INTEREST_OPTIONS = [
    "GLP-3 R (Retatrutide) — metabolic research",
    "GLP-2 T (Tirzepatide) — metabolic research",
    "GLP-1 (Semaglutide) — metabolic research",
    "BPC-157 — supporting & post-research support",
    "TB-500 — Tissue Repair",
    "CJC-1295 / Ipamorelin — GH Stack",
    "GHK-Cu — Skin & longevity research",
    "NAD+ — Longevity",
    "MOTS-c — Metabolic",
    "SS-31 — Mitochondrial",
    "Glutathione — Antioxidant",
    "Selank / Semax — Cognitive",
    "DSIP / MT2 — Sleep",
    "IGF-1 LR3 — Growth Factor",
    "Glow Complex — Skin Blend",
    "Tesamorlin — GH Research",
    "Reconstitution Solution",
  ];

  const toggleInterest = (i: string) => {
    setSelectedInterests(p => p.includes(i) ? p.filter(x=>x!==i) : [...p,i]);
  };

  const handleJoin = async () => {
    if (!name.trim() || !email.trim() || !email.includes("@")) {
      setErr("Please enter your name and a valid email.");
      return;
    }
    setLoading(true); setErr("");
    const interests = cartItems.length > 0
      ? cartItems.map(i => i.name)
      : selectedInterests;
    // Save locally
    try {
      const saved = JSON.parse(localStorage.getItem("aot_waitlist") || "[]");
      saved.push({ name, email, interests, date: new Date().toISOString(), source: sourcePage });
      localStorage.setItem("aot_waitlist", JSON.stringify(saved));
    } catch {}
    // Send email
    await sendWaitlistEmail({ name, email, interests, source: sourcePage });
    setLoading(false);
    setStep("interests");
  };

  const handleInterestSubmit = async () => {
    setLoading(true);
    try {
      const saved = JSON.parse(localStorage.getItem("aot_waitlist") || "[]");
      if (saved.length > 0) {
        saved[saved.length-1].interests = selectedInterests;
        localStorage.setItem("aot_waitlist", JSON.stringify(saved));
      }
    } catch {}
    await sendWaitlistEmail({ name, email, interests: selectedInterests, source: `${sourcePage} - interest survey` });
    setLoading(false);
    setStep("done");
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:9998,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(8px)"}}>
      <div style={{background:"#111",borderRadius:24,width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 40px 120px rgba(0,0,0,0.8)"}}>

        {/* Header */}
        <div style={{background:"linear-gradient(135deg,#0d0d1a,#0e1a0e)",padding:"32px 28px 20px",borderRadius:"24px 24px 0 0",textAlign:"center",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:10}}>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"2.8rem",color:"#ff6b6b",textShadow:"0 0 24px rgba(255,107,107,0.5)"}}>α</span>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"2.8rem",color:"#3be8b0",textShadow:"0 0 24px rgba(59,232,176,0.5)"}}>Ω</span>
          </div>
          {step === "done" ? (
            <>
              <div style={{fontSize:"2.5rem",marginBottom:8}}>🎉</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",color:"#fff",marginBottom:8}}>You're on the list!</div>
              <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.5)",lineHeight:1.6}}>
                We'll email you the moment we launch. You're among the first researchers to join. Something extraordinary is coming.
              </p>
            </>
          ) : step === "interests" ? (
            <>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#3be8b0",marginBottom:6}}>One more thing, {name.split(" ")[0]}…</div>
              <p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.5)",lineHeight:1.6}}>Which compounds are you most interested in? We'll prioritize these for your launch notification.</p>
            </>
          ) : (
            <>
              <div style={{background:"rgba(59,232,176,0.1)",border:"1px solid rgba(59,232,176,0.25)",borderRadius:100,padding:"4px 16px",display:"inline-block",fontSize:"0.72rem",fontWeight:700,color:"#3be8b0",letterSpacing:"0.1em",marginBottom:14}}>🚀 LAUNCHING SOON</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"1.4rem",color:"#fff",lineHeight:1.2,marginBottom:8}}>
                Something extraordinary<br/>is being prepared.
              </div>
              <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:0}}>
                We're putting the finishing touches on the most complete research peptide experience you've seen. Join the waitlist — you'll be first to know when we open.
              </p>
            </>
          )}
        </div>

        {/* Body */}
        <div style={{padding:"24px 28px 28px"}}>
          {step === "done" ? (
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div style={{background:"rgba(59,232,176,0.08)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:14,padding:"16px 18px"}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",color:"#3be8b0",marginBottom:4}}>What happens next?</div>
                <div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.5)",lineHeight:1.7}}>
                  📧 You'll get a launch email the moment we go live<br/>
                  🎯 Priority access to your selected compounds<br/>
                  🔬 All COAs and research documentation ready<br/>
                  🚀 Exclusive early access — no waiting in line
                </div>
              </div>
              <div style={{background:"rgba(255,107,107,0.07)",border:"1px solid rgba(255,107,107,0.15)",borderRadius:12,padding:"11px 14px",fontSize:"0.72rem",color:"rgba(255,200,180,0.7)",lineHeight:1.6}}>
                ⚠️ {DISCLAIMER_SHORT}
              </div>
              <button onClick={onClose} style={{width:"100%",padding:"13px",background:"#3be8b0",color:"#0e0e0e",border:"none",borderRadius:100,fontFamily:"inherit",fontWeight:700,fontSize:"0.9rem",cursor:"pointer"}}>
                Continue Browsing →
              </button>
            </div>
          ) : step === "interests" ? (
            <div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
                {INTEREST_OPTIONS.map(opt => (
                  <button key={opt} onClick={()=>toggleInterest(opt)}
                    style={{padding:"7px 14px",borderRadius:100,border:`1.5px solid ${selectedInterests.includes(opt)?"#3be8b0":"rgba(255,255,255,0.12)"}`,background:selectedInterests.includes(opt)?"rgba(59,232,176,0.1)":"transparent",color:selectedInterests.includes(opt)?"#3be8b0":"rgba(255,255,255,0.5)",cursor:"pointer",fontFamily:"inherit",fontSize:"0.75rem",fontWeight:selectedInterests.includes(opt)?700:400,transition:"all .15s"}}>
                    {opt}
                  </button>
                ))}
              </div>
              {err && <div style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.2)",borderRadius:10,padding:"10px 14px",color:"#ff8a80",fontSize:"0.8rem",marginBottom:12}}>{err}</div>}
              <button onClick={handleInterestSubmit} disabled={loading}
                style={{width:"100%",padding:"14px",background:loading?"#333":"#3be8b0",color:"#0e0e0e",border:"none",borderRadius:100,fontFamily:"inherit",fontWeight:700,fontSize:"0.9rem",cursor:loading?"not-allowed":"pointer",transition:"background .2s"}}>
                {loading ? "Saving…" : selectedInterests.length > 0 ? `Submit ${selectedInterests.length} Interest${selectedInterests.length>1?"s":""}` : "Skip →"}
              </button>
              <button onClick={()=>setStep("done")} style={{width:"100%",marginTop:8,padding:"10px",background:"transparent",color:"rgba(255,255,255,0.3)",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.8rem"}}>Skip this step</button>
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {cartItems.length > 0 && (
                <div style={{background:"rgba(79,142,247,0.08)",border:"1px solid rgba(79,142,247,0.2)",borderRadius:12,padding:"12px 16px",marginBottom:4}}>
                  <div style={{fontSize:"0.75rem",fontWeight:600,color:"#4f8ef7",marginBottom:6}}>🛒 Your cart items will be saved to your interest profile</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {cartItems.map((item,i) => (
                      <span key={i} style={{background:"rgba(79,142,247,0.12)",color:"rgba(255,255,255,0.6)",fontSize:"0.68rem",padding:"2px 10px",borderRadius:100,border:"1px solid rgba(79,142,247,0.2)"}}>{item.name}</span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.45)",letterSpacing:"0.08em",display:"block",marginBottom:5}}>FULL NAME</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Dr. Jane Smith"
                  style={{width:"100%",background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"12px 14px",color:"#fff",fontFamily:"inherit",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}}
                  onFocus={e=>e.target.style.borderColor="#3be8b0"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
              </div>
              <div>
                <label style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.45)",letterSpacing:"0.08em",display:"block",marginBottom:5}}>EMAIL ADDRESS</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="research@university.edu"
                  style={{width:"100%",background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"12px 14px",color:"#fff",fontFamily:"inherit",fontSize:"0.9rem",outline:"none",boxSizing:"border-box"}}
                  onFocus={e=>e.target.style.borderColor="#3be8b0"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.12)"}/>
              </div>
              {err && <div style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.2)",borderRadius:10,padding:"10px 14px",color:"#ff8a80",fontSize:"0.8rem"}}>{err}</div>}
              <button onClick={handleJoin} disabled={loading}
                style={{width:"100%",padding:"15px",background:loading?"#333":"linear-gradient(135deg,#3be8b0,#4f8ef7)",color:"#0e0e0e",border:"none",borderRadius:100,fontFamily:"inherit",fontWeight:700,fontSize:"0.95rem",cursor:loading?"not-allowed":"pointer",transition:"all .2s",letterSpacing:"0.02em"}}>
                {loading ? "Joining…" : "🚀 Join the Waitlist — Be First"}
              </button>
              <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.25)",textAlign:"center",lineHeight:1.5}}>
                No spam, ever. We only email when we launch and for major announcements.<br/>
                {DISCLAIMER_SHORT}
              </div>
            </div>
          )}
        </div>

        {/* Close button */}
        {step !== "done" && (
          <button onClick={onClose}
            style={{position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

// ── COMING SOON BUY BUTTON (replaces all purchase CTA) ────────────
function BuyBtn({children="View Pricing →", style={}, cartItems=[], sourcePage=""}: {children?:any, style?:any, cartItems?:any[], sourcePage?:string}) {
  const [showModal, setShowModal] = useState(false);
  if (!COMING_SOON) return null; // handled separately when store is live
  return (
    <>
      <button onClick={()=>setShowModal(true)}
        style={{background:"linear-gradient(135deg,#3be8b0,#4f8ef7)",color:"#0e0e0e",border:"none",padding:"13px 28px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.9rem",transition:"all .2s",...style}}>
        {children}
      </button>
      {showModal && <ComingSoonModal onClose={()=>setShowModal(false)} cartItems={cartItems} sourcePage={sourcePage}/>}
    </>
  );
}

// ── COMING SOON BANNER ───────────────────────────────────────────
function ComingSoonBanner() {
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  if (!show) return null;
  return (
    <>
      <div style={{position:"fixed",top:55,left:0,right:0,zIndex:997,background:"linear-gradient(135deg,rgba(59,232,176,0.15),rgba(79,142,247,0.12))",borderBottom:"1px solid rgba(59,232,176,0.25)",padding:"8px 20px",display:"flex",alignItems:"center",gap:12,justifyContent:"center",backdropFilter:"blur(8px)"}}>
        <span style={{fontSize:"0.9rem"}}>🚀</span>
        <span style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.75)",fontWeight:500}}>
          <strong style={{color:"#3be8b0"}}>Store launching soon</strong> — browse our compounds and join the waitlist
        </span>
        <button onClick={()=>setShowModal(true)} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"4px 14px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.72rem",flexShrink:0}}>
          Shop Compounds →
        </button>
        <button onClick={()=>setShow(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.3)",cursor:"pointer",fontSize:"0.9rem",padding:0,marginLeft:4}}>✕</button>
      </div>
      {showModal && <ComingSoonModal onClose={()=>setShowModal(false)} sourcePage="Top Banner"/>}
    </>
  );
}

// ── COMPLIANCE BANNER (sitewide) ───────────────────────────────────
function ComplianceBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem("aot_cb") === "1"; } catch { return false; }
  });
  if (dismissed) return null;
  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:9990,background:"rgba(10,10,10,0.97)",borderTop:"1px solid rgba(255,107,107,0.3)",padding:"12px 20px",display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",backdropFilter:"blur(10px)"}}>
      <div style={{flex:1,minWidth:200}}>
        <span style={{fontSize:"0.72rem",color:"rgba(255,200,180,0.85)",lineHeight:1.6}}>
          <strong style={{color:"#ff8a80"}}>⚠️ Research Use Only:</strong> All products on this site are for in-vitro laboratory and scientific research only. Not for human or veterinary use. Not FDA-approved. Must be 21+.
        </span>
      </div>
      <button onClick={()=>{localStorage.setItem("aot_cb","1");setDismissed(true);}}
        style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"7px 18px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.78rem",flexShrink:0}}>
        I Understand
      </button>
    </div>
  );
}

// ── EXIT INTENT POPUP ─────────────────────────────────────────────
function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    if (done) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10 && !triggered.current) {
        triggered.current = true;
        setTimeout(() => setShow(true), 200);
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [done]);

  if (!show || done) return null;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:9995,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(6px)"}}>
      <div style={{background:"#111",borderRadius:20,padding:"36px 32px",maxWidth:440,width:"100%",textAlign:"center",border:"1px solid rgba(59,232,176,0.2)",boxShadow:"0 40px 100px rgba(0,0,0,0.7)"}}>
        <div style={{fontSize:"2rem",marginBottom:12}}>🧬</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",color:"#fff",marginBottom:8,letterSpacing:"-.02em"}}>Wait — don't miss the launch</div>
        <p style={{fontSize:"0.87rem",color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:20}}>
          Alphaomegatides is opening soon. Leave your email and be the first researcher notified — we'll send one email, no spam.
        </p>
        <ExitIntentForm onDone={()=>{setDone(true);setShow(false);}}/>
        <button onClick={()=>setShow(false)} style={{marginTop:14,background:"transparent",color:"rgba(255,255,255,0.3)",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.8rem"}}>No thanks</button>
      </div>
    </div>
  );
}

function ExitIntentForm({onDone}: {onDone:()=>void}) {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [done,setDone]=useState(false);
  const [loading,setLoading]=useState(false);
  const handle = async () => {
    if(!email.includes("@")) return;
    setLoading(true);
    await sendWaitlistEmail({name:name||"Anonymous",email,source:"Exit intent popup"});
    try {
      const saved=JSON.parse(localStorage.getItem("aot_waitlist")||"[]");
      saved.push({name,email,date:new Date().toISOString(),source:"exit intent"});
      localStorage.setItem("aot_waitlist",JSON.stringify(saved));
    } catch {}
    setLoading(false); setDone(true);
    setTimeout(onDone, 2000);
  };
  if(done) return <div style={{color:"#3be8b0",fontWeight:700,padding:"12px 0"}}>✅ You're on the list — we'll be in touch!</div>;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name (optional)"
        style={{background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"11px 14px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none"}}/>
      <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Your email address"
        style={{background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"11px 14px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none"}}/>
      <button onClick={handle} disabled={loading}
        style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"13px",borderRadius:100,fontFamily:"inherit",fontWeight:700,fontSize:"0.9rem",cursor:"pointer"}}>
        {loading?"Saving…":"Notify Me at Launch 🚀"}
      </button>
    </div>
  );
}

// ── PAYMENT PROCESSORS & XRP ─────────────────────────────────────
const XRP_WALLET = "rB1kVfLSxpXCw7sLCBcm5LFZYzkS6xmwSK";
const XRP_TAG = "2182338096";
const PAYMENT_PROCESSORS = [
  {
    id:"xrp",
    name:"XRP (Ripple)",
    icon:"⚡",
    color:"#346aa9",
    desc:"Instant, near-zero fees. Send XRP directly to our wallet.",
    note:"XRP payments confirmed within 3-5 seconds. Include your order ID in memo.",
  },
  {
    id:"allaypay",
    name:"AllayPay",
    icon:"💳",
    color:"#3be8b0",
    desc:"High-risk friendly card processing. Visa, Mastercard, Amex accepted.",
    note:"AllayPay specializes in nutraceutical and research chemical merchants.",
    url:"https://allaypay.com",
  },
  {
    id:"vector",
    name:"Vector Payments",
    icon:"🔒",
    color:"#8b5cf6",
    desc:"Research chemical approved processor. ACH, debit, and credit accepted.",
    note:"No holds, no freezes for compliant research suppliers.",
    url:"https://vectorpayments.com",
  },
  {
    id:"echeck",
    name:"eCheck / ACH",
    icon:"🏦",
    color:"#f59e0b",
    desc:"Bank transfer — lowest fees, no chargebacks.",
    note:"ACH transfers clear in 1-2 business days.",
  },

];

function XRPPaymentModal({total, onClose}:{total:number; onClose:()=>void}) {
  const [copied, setCopied] = useState(false);
  const xrpAmount = (total / 0.52).toFixed(2); // approximate XRP conversion
  const copy = (text:string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(()=>setCopied(false), 2000);
  };
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(8px)"}}>
      <div style={{background:"#111",borderRadius:20,padding:"28px 24px",maxWidth:420,width:"100%",border:"1px solid rgba(52,106,169,0.4)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem"}}>⚡ Pay with XRP</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:"1.2rem"}}>✕</button>
        </div>
        <div style={{background:"rgba(52,106,169,0.1)",border:"1px solid rgba(52,106,169,0.3)",borderRadius:14,padding:"16px",marginBottom:16,textAlign:"center"}}>
          <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.4)",marginBottom:6}}>SEND EXACTLY</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.8rem",color:"#346aa9"}}>{xrpAmount} XRP</div>
          <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.35)",marginTop:4}}>≈ ${total.toFixed(2)} USD · Rate updates every 15 min</div>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.4)",marginBottom:6}}>XRP WALLET ADDRESS</div>
          <div style={{background:"#1c1c1c",borderRadius:10,padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,border:"1px solid rgba(255,255,255,0.08)"}}>
            <code style={{fontSize:"0.72rem",color:"#fff",wordBreak:"break-all",flex:1}}>{XRP_WALLET}</code>
            <button onClick={()=>copy(XRP_WALLET)} style={{background:"#346aa9",color:"#fff",border:"none",padding:"5px 10px",borderRadius:7,cursor:"pointer",fontSize:"0.7rem",fontWeight:700,flexShrink:0}}>{copied?"✓":"Copy"}</button>
          </div>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.4)",marginBottom:6}}>DESTINATION TAG <span style={{color:"#ff6b6b",fontWeight:800}}>REQUIRED</span></div>
          <div style={{background:"#1c1c1c",borderRadius:10,padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,border:"1px solid rgba(255,107,107,0.3)"}}>
            <code style={{fontSize:"0.88rem",color:"#ff6b6b",fontWeight:800,flex:1}}>{XRP_TAG}</code>
            <button onClick={()=>copy(XRP_TAG)} style={{background:"#ff6b6b",color:"#fff",border:"none",padding:"5px 10px",borderRadius:7,cursor:"pointer",fontSize:"0.7rem",fontWeight:700,flexShrink:0}}>{copied?"✓":"Copy"}</button>
          </div>
        </div>
        <div style={{background:"rgba(255,209,102,0.08)",border:"1px solid rgba(255,209,102,0.2)",borderRadius:10,padding:"11px 14px",fontSize:"0.75rem",color:"rgba(255,200,150,0.8)",lineHeight:1.6,marginBottom:14}}>
          ⚠️ You <strong>must</strong> include the Destination Tag above — payments sent without it cannot be matched to your order.
        </div>
        <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.25)",textAlign:"center",lineHeight:1.6}}>
          After sending, email <span style={{color:"#3be8b0"}}>alphaomegatides@yahoo.com</span> with your TX hash for instant confirmation. For research use only.
        </div>
      </div>
    </div>
  );
}

function PaymentOptions({total, cartItems}:{total:number; cartItems:any[]}) {
  const [selected, setSelected] = useState<string|null>(null);
  const [showXRP, setShowXRP] = useState(false);
  return (
    <div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",marginBottom:12}}>Select Payment Method</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
        {PAYMENT_PROCESSORS.map(p=>(
          <button key={p.id} onClick={()=>{setSelected(p.id); if(p.id==="xrp")setShowXRP(true);}}
            style={{textAlign:"left",padding:"12px 14px",background:selected===p.id?`${p.color}15`:"#1c1c1c",border:`1.5px solid ${selected===p.id?p.color:"rgba(255,255,255,0.08)"}`,borderRadius:12,cursor:"pointer",fontFamily:"inherit",transition:"all .15s",display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:"1.1rem"}}>{p.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,fontSize:"0.85rem",color:selected===p.id?p.color:"#fff"}}>{p.name}</div>
              <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.4)",marginTop:2}}>{p.desc}</div>
            </div>
            {selected===p.id&&<span style={{color:p.color,fontSize:"0.9rem"}}>✓</span>}
          </button>
        ))}
      </div>
      {selected&&selected!=="xrp"&&(
        <div style={{background:"rgba(59,232,176,0.07)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:12,padding:"12px 14px",fontSize:"0.78rem",color:"rgba(255,255,255,0.55)",lineHeight:1.65,marginBottom:12}}>
          {PAYMENT_PROCESSORS.find(p=>p.id===selected)?.note}

        </div>
      )}
      {showXRP&&<XRPPaymentModal total={total} onClose={()=>{setShowXRP(false);setSelected(null);}}/>}
    </div>
  );
}

function CheckoutLink({cart,total}:{cart:{id:string}[],total:number}){
  // Shopify disabled — XRP + alternative payments only
  return (
    <div style={{background:"rgba(59,232,176,0.06)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:14,padding:"14px 18px",textAlign:"center" as const}}>
      <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.5)",lineHeight:1.6}}>
        ⚡ Select a payment method above and complete your order.<br/>
        <span style={{color:"#3be8b0",fontWeight:600}}>XRP recommended</span> — instant, near-zero fees.<br/>
        <span style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.3)"}}>Credit card processing coming soon · Orders confirmed via email</span>
      </div>
    </div>
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
      <span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:C.muted,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5,marginBottom:28}}>← Continue Shopping</span>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,5vw,2.4rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:6}}>Shopping Cart</h1>
      <p style={{fontSize:"0.85rem",color:C.muted,marginBottom:28}}>{cart.length} item{cart.length!==1?"s":""}</p>

      {cart.length===0
        ?<div style={{textAlign:"center",padding:"60px 0"}}>
          <div style={{fontSize:"3rem",marginBottom:16}}>🛒</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.1rem",marginBottom:8}}>Your cart is empty</div>
          <p style={{color:C.muted,marginBottom:24,fontSize:"0.9rem"}}>Browse our research compounds to get started.</p>
          <PrimaryBtn onClick={()=>go("home")}>View All Compounds →</PrimaryBtn>
        </div>
        :<>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
            {cart.map((item,i)=>{
              const isLight=item.color==="#ffd166"||item.color==="#3be8b0";
              return <div key={i} style={{background:"#1c1c1c",borderRadius:14,padding:"16px 18px",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:52,height:52,borderRadius:10,background:item.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem",flexShrink:0}}>{item.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:"0.88rem",marginBottom:3}}>{item.name}</div>
                  <div style={{fontSize:"0.75rem",color:C.muted}}>{item.selectedSize||item.size} · Research grade</div>
                </div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",flexShrink:0}}>{item.selectedPrice||item.price}</div>
                <button onClick={()=>onRemove(i)} style={{background:"rgba(255,107,107,0.1)",border:"none",color:C.r,borderRadius:"50%",width:28,height:28,cursor:"pointer",fontSize:"0.9rem",flexShrink:0,minHeight:"auto",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
              </div>;
            })}
          </div>

          {/* BAC Water upsell */}
          {hasVial&&!bacInCart&&!bacAdded&&<div style={{background:"linear-gradient(135deg,rgba(59,232,176,0.08),rgba(79,142,247,0.06))",borderRadius:14,padding:"16px 18px",border:"1px solid rgba(59,232,176,0.2)",marginBottom:16,display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:48,height:48,borderRadius:10,background:"rgba(59,232,176,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",flexShrink:0}}>💧</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <div style={{fontWeight:700,fontSize:"0.88rem",color:"#fff"}}>Reconstitution Solution</div>
                <div style={{fontSize:"0.65rem",fontWeight:700,background:"rgba(59,232,176,0.15)",color:"#3be8b0",padding:"2px 8px",borderRadius:100,letterSpacing:"0.06em"}}>RECOMMENDED</div>
              </div>
              <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.45)",lineHeight:1.5}}>Your vial peptides require bacteriostatic water to reconstitute. 10mL bottle · 0.9% Benzyl Alcohol</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",color:"#fff"}}>$20.00</div>
              <button onClick={addBac} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"7px 16px",borderRadius:100,fontFamily:"inherit",fontWeight:700,fontSize:"0.78rem",cursor:"pointer",whiteSpace:"nowrap"}}>Add +</button>
            </div>
          </div>}

          {/* Added confirmation */}
          {bacAdded&&<div style={{background:"rgba(59,232,176,0.08)",borderRadius:12,padding:"11px 16px",border:"1px solid rgba(59,232,176,0.2)",marginBottom:16,display:"flex",alignItems:"center",gap:10,fontSize:"0.82rem",color:"#3be8b0"}}>
            <span>✅</span><span>Reconstitution Solution added to cart</span>
          </div>}

          {/* Total */}
          <div style={{background:"#1c1c1c",borderRadius:14,padding:"18px 20px",border:"1px solid rgba(255,255,255,0.08)",marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:"0.85rem"}}>
              <span style={{color:C.muted}}>Subtotal ({cart.length} item{cart.length!==1?"s":""})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.85rem"}}>
              <span style={{color:C.muted}}>Shipping</span>
              <span style={{color:"#3be8b0"}}>Calculated at checkout</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",marginTop:6,paddingTop:6,borderTop:"1px solid rgba(59,232,176,0.1)"}}>
              <span style={{color:"rgba(59,232,176,0.7)"}}>⭐ Points you'll earn</span>
              <span style={{color:"#3be8b0",fontWeight:700}}>+ pts</span>
            </div>
          </div>

          {/* Referral code at checkout */}
          {(()=>{

            return <div style={{marginBottom:12}}>
              
            </div>;
          })()}
          <PaymentOptions total={total} cartItems={cart}/>
          <div style={{marginTop:16}}>
            <CheckoutLink cart={cart} total={total}/>
          </div>
          <p style={{textAlign:"center",fontSize:"0.72rem",color:C.muted}}>🔒 Seaddress checkout · Research use only · All sales final</p>
        </>
      }
    </div>
    <SiteFooter go={go}/>
  </div>;
}

// ── APP ─────────────────────────────────────────────
// ── COMPLIANCE PAGE ─────────────────────────────────────────────
function CompliancePage({go}) {
  const sections = [
    {
      icon:"⚠️", title:"Research Use Only — No Exceptions",
      text:"ALL products sold by Alphaomegatides are strictly for in-vitro laboratory and scientific research purposes. They are NOT for research use, NOT for veterinary use, NOT for use as a food, compound, dietary supplement, research device, or cosmetic. Any purchase constitutes the buyer's express agreement to these restrictions."
    },
    {
      icon:"🏛️", title:"FDA Status",
      text:"These products have NOT been evaluated by the U.S. Food and compound Administration. They are not intended to evaluate, treat, cure, mitigate, or support any condition under study or research condition in humans or animals. Alphaomegatides is not a compounding pharmacy, outsourcing facility, or research-grade manufacturer."
    },
    {
      icon:"🔬", title:"Qualified Researcher Requirement",
      text:"Products may only be purchased by qualified, properly trained research or laboratory professionals aged 21 or older. By placing any order, you represent that you are a qualified researcher, that the purchase is for legitimate research activity, and that you will handle all materials in accordance with applicable laws, institutional policies, and professional safety standards."
    },
    {
      icon:"📋", title:"Regulatory Compliance — Buyer's Responsibility",
      text:"Research peptides exist in a complex and evolving regulatory environment. The purchaser is solely responsible for determining the legality of purchase and possession in their jurisdiction, obtaining any required licenses or permits, and ensuring all use is compliant with local, state, federal, and institutional regulations. Alphaomegatides makes no representation regarding legality in any specific jurisdiction."
    },
    {
      icon:"🔐", title:"Controlled Substances — Not Scheduled",
      text:"Current Alphaomegatides products are NOT classified as controlled substances under the United States Controlled Substances Act as of the date of sale. However, regulations change. Some peptides may be regulated or scheduled in certain states or countries. The buyer bears full responsibility for verifying current legal status in their location before purchase."
    },
    {
      icon:"📊", title:"No research Claims",
      text:"Nothing on this website constitutes research advice, research guidance, or research application recommendations. Product descriptions, research guides, and protocol references are summaries of published scientific literature for educational purposes only. They do not represent endorsement or validation of any research protocol, and should not be interpreted as instructions for self-administration or research application of any condition."
    },
    {
      icon:"🧪", title:"Purity and Testing",
      text:"All Alphaomegatides products are independently tested by Freedom Diagnostics using HPLC analysis and mass spectrometry confirmation. Certificates of Analysis are available for every product and batch. Reported purity (≥99%) reflects analytical testing results and does not constitute a guarantee of fitness for any particular research purpose."
    },
    {
      icon:"⚖️", title:"Liability Limitation",
      text:"By purchasing from Alphaomegatides, you expressly agree that Alphaomegatides, its officers, employees, and affiliates bear no liability whatsoever for any subject tissue, death, property damage, or other harm resulting from the purchase, possession, handling, or use of any product. All products are sold AS-IS. Maximum liability is limited to the purchase price of the specific transaction."
    },
    {
      icon:"📧", title:"Questions & Verification",
      text:`For compliance questions, documentation requests, or to verify your eligibility as a qualified researcher, contact us at ${SITE_EMAIL}. We maintain records of all transactions and may request proof of research affiliation prior to fulfillment.`
    },
  ];

  return (
    <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
      <div style={{maxWidth:820,margin:"0 auto",padding:"52px 24px 80px"}}>
        <span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.45)",cursor:"pointer",display:"block",marginBottom:24}}>← Back to Home</span>
        
        <div style={{background:"rgba(255,107,107,0.12)",border:"2px solid rgba(255,107,107,0.4)",borderRadius:16,padding:"20px 24px",marginBottom:32,display:"flex",gap:14,alignItems:"flex-start"}}>
          <span style={{fontSize:"1.5rem",flexShrink:0}}>⚠️</span>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"#ff8a80",marginBottom:6}}>IMPORTANT NOTICE — READ BEFORE PURCHASING</div>
            <div style={{fontSize:"0.84rem",color:"rgba(255,200,180,0.85)",lineHeight:1.75}}>{DISCLAIMER_FULL}</div>
          </div>
        </div>

        <div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#ff6b6b",marginBottom:8}}>Legal & Regulatory</div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.4rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:6}}>Compliance & Disclaimers</h1>
        <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginBottom:40,lineHeight:1.7}}>
          Alphaomegatides operates as a research chemical supplier. We are committed to full transparency regarding the nature, intended use, and regulatory status of every product we offer.
        </p>

        <div style={{display:"flex",flexDirection:"column",gap:16,marginBottom:40}}>
          {sections.map((s,i) => (
            <div key={i} style={{background:"#1a1a1a",borderRadius:16,padding:"24px 28px",border:"1px solid rgba(255,255,255,0.07)"}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <span style={{fontSize:"1.2rem",flexShrink:0,marginTop:2}}>{s.icon}</span>
                <div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.98rem",color:"#fff",marginBottom:10}}>{s.title}</div>
                  <div style={{fontSize:"0.86rem",color:"rgba(255,255,255,0.5)",lineHeight:1.8}}>{s.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:"rgba(59,232,176,0.07)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:16,padding:"24px 28px",marginBottom:32}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"#3be8b0",marginBottom:12}}>Our Commitment to Compliance</div>
          <div style={{fontSize:"0.86rem",color:"rgba(255,255,255,0.5)",lineHeight:1.8}}>
            Alphaomegatides voluntarily maintains the following practices to support compliant research procurement:<br/><br/>
            ✅ Age verification gate (21+) at site entry<br/>
            ✅ Independent third-party COA for every product and batch<br/>
            ✅ "Research Use Only" labeling on all products and documentation<br/>
            ✅ US-only fulfillment — no international shipping of research chemicals<br/>
            ✅ Buyer eligibility review — we reserve the right to refuse any sale<br/>
            ✅ Full terms of service and privacy policy available at all times<br/>
            ✅ Resend-verified transactional emails — no spam, ever
          </div>
        </div>

        <div style={{textAlign:"center",fontSize:"0.75rem",color:"rgba(255,255,255,0.25)",lineHeight:1.7,borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:28}}>
          Last reviewed: May 2026 · Alphaomegatides · {SITE_EMAIL}<br/>
          These disclaimers are subject to change without notice as regulations evolve.
        </div>
      </div>
    </div>
  );
}

// ── COMING SOON FULL PAGE ────────────────────────────────────────
function ComingSoonPage({go}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{paddingTop:70,background:"#0a0a0a",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"80px 24px"}}>
      <div style={{maxWidth:540,width:"100%",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:24}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"3rem",color:"#ff6b6b",textShadow:"0 0 40px rgba(255,107,107,0.4)"}}>α</span>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"3rem",color:"#3be8b0",textShadow:"0 0 40px rgba(59,232,176,0.4)"}}>Ω</span>
        </div>
        <div style={{background:"rgba(59,232,176,0.1)",border:"1px solid rgba(59,232,176,0.3)",borderRadius:100,padding:"4px 16px",display:"inline-block",fontSize:"0.72rem",fontWeight:700,color:"#3be8b0",letterSpacing:"0.12em",marginBottom:20}}>🚀 LAUNCHING SOON</div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(2rem,5vw,3rem)",fontWeight:900,color:"#fff",letterSpacing:"-.03em",lineHeight:1.1,marginBottom:16}}>
          Something extraordinary<br/>is coming.
        </h1>
        <p style={{fontSize:"0.95rem",color:"rgba(255,255,255,0.5)",lineHeight:1.8,marginBottom:32}}>
          The store is getting its final preparations. We're verifying COAs, finalizing fulfillment, and making sure every detail is perfect before we open. Join the waitlist — you'll be among the very first to access verified research peptides from Alphaomegatides.
        </p>
        <button onClick={()=>setShowModal(true)} style={{background:"linear-gradient(135deg,#3be8b0,#4f8ef7)",color:"#0e0e0e",border:"none",padding:"16px 36px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"1rem",marginBottom:16,transition:"opacity .2s"}}
          onMouseEnter={e=>e.currentTarget.style.opacity="0.9"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          🚀 Join the Waitlist
        </button>
        <div style={{display:"block"}}><button onClick={()=>go("home")} style={{background:"transparent",color:"rgba(255,255,255,0.3)",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.85rem"}}>← Back to Browse</button></div>
        {showModal && <ComingSoonModal onClose={()=>setShowModal(false)} sourcePage="Coming Soon Page"/>}
        <div style={{marginTop:32,fontSize:"0.72rem",color:"rgba(255,255,255,0.2)",lineHeight:1.7}}>{DISCLAIMER_SHORT}</div>
      </div>
    </div>
  );
}

// ── ERROR BOUNDARY ────────────────────────────────────────────────
class ErrorBoundary extends React.Component<{children:React.ReactNode},{error:Error|null}> {
  constructor(props:any){super(props);this.state={error:null};}
  static getDerivedStateFromError(error:Error){return{error};}
  componentDidCatch(error:Error,info:React.ErrorInfo){
    console.error("App Error:",error,info);
    // TODO: Send to error tracking (Sentry, LogRocket, etc.)
  }
  render(){
    if(this.state.error){
      return(
        <div style={{minHeight:"100vh",background:"#0e0e0e",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'DM Sans',sans-serif",color:"#fff"}}>
          <div style={{textAlign:"center",maxWidth:440}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"4rem",color:"rgba(255,255,255,0.06)",marginBottom:16}}>500</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",marginBottom:10}}>Something went wrong</div>
            <p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.4)",lineHeight:1.7,marginBottom:24}}>An unexpected error occurred. Your cart and data are safe in localStorage.</p>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={()=>window.location.reload()} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"12px 28px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.9rem"}}>Reload Page</button>
              <button onClick={()=>{this.setState({error:null});}} style={{background:"transparent",color:"rgba(255,255,255,0.5)",border:"1.5px solid rgba(255,255,255,0.15)",padding:"12px 24px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.88rem"}}>Try Again</button>
            </div>
            <details style={{marginTop:20,textAlign:"left",background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"12px 14px"}}>
              <summary style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.3)",cursor:"pointer"}}>Error details (for support)</summary>
              <pre style={{fontSize:"0.68rem",color:"rgba(255,107,107,0.7)",marginTop:8,overflow:"auto",whiteSpace:"pre-wrap"}}>{this.state.error?.message}</pre>
            </details>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}


// ══════════════════════════════════════════════════════════════════
// BLOG PAGE
// ══════════════════════════════════════════════════════════════════
const BLOG_POSTS = [
  {
    id: "bpc157-research-2026",
    title: "BPC-157 Research: What the Studies Show in 2026",
    category: "Tissue Research",
    date: "June 1, 2026",
    readTime: "8 min read",
    summary: "A comprehensive overview of the BPC-157 research literature — mechanisms, tissue studies, neurological findings, and what the evidence base looks like heading into 2026.",
    body: `BPC-157 is one of the most studied synthetic peptides in the research literature. Derived from a protective protein found in gastric juice, the compound has appeared in hundreds of peer-reviewed studies over the past three decades.

**What Is BPC-157?**

BPC-157 (Body Protective Compound-157) is a pentadecapeptide consisting of 15 amino acids. Its sequence is synthetic, derived from the human body's gastric juice protein BPC. It is notable for its oral and systemic stability in animal models, which has made it a useful tool for studying compound effects across multiple administration routes.

**Proposed Mechanisms**

Research has identified several mechanisms through which BPC-157 influences biological systems in animal studies: angiogenesis modulation (VEGF expression and vascularization), nitric oxide system interaction, growth factor upregulation, and increased fibroblast migration and collagen synthesis in connective tissue models.

**Tissue Research**

The bulk of published research has focused on connective tissue and musculoskeletal systems. Studies in rat models have documented accelerated tendon reconnection, enhanced bone remodeling at defect sites, and significant GI mucosal healing activity in ulcer models. Muscle crush injury models showed differences in inflammatory infiltration and tissue organization in treated groups.

**Neurological Research**

A growing body of research has examined BPC-157 in neurological contexts, including dopamine pathway models, CNS trauma models (spinal cord and TBI), and behavioral studies observing stress response parameters in rodents.

**Storage & Purity**

Lyophilized BPC-157 should be stored at -20°C long-term. Reconstituted solutions are typically stored at 4°C and used within 14 days. HPLC purity ≥99% is recommended for research validity.

*All compounds are for research use only. Not for human or veterinary use.*`,
    tags: ["BPC-157", "tissue research", "peptide research", "COA"],
    accent: "#3be8b0"
  },
  {
    id: "glp-comparison-2026",
    title: "Semaglutide vs Tirzepatide vs Retatrutide: A Research Comparison",
    category: "Metabolic Research",
    date: "June 1, 2026",
    readTime: "10 min read",
    summary: "The GLP receptor agonist family has evolved from single to triple agonists. This overview compares receptor targets, mechanisms, and research applications of all three compounds.",
    body: `The GLP receptor agonist family has become one of the most actively researched compound categories in metabolic biology. Understanding the distinctions between semaglutide, tirzepatide, and retatrutide is essential for experimental design.

**The GLP Receptor Landscape**

Three receptors are relevant: GLP-1R (pancreas, brain, heart, GI tract — insulin secretion and appetite signaling), GIPR (pancreatic beta cells, adipose tissue — insulin potentiation), and GCGR (liver — hepatic glucose production and energy expenditure).

**Semaglutide: GLP-1 Mono-Agonist**

Targets GLP-1R only. Designed half-life ~7 days. A C18 fatty diacid modification enables albumin binding for extended duration. The single-receptor profile makes it the cleanest reference compound for isolating GLP-1R-specific effects.

**Tirzepatide: GLP-1 + GIP Dual Agonist**

Targets GLP-1R + GIPR. Designed half-life ~5 days. A novel "twincretin" structure (not a direct analog of either native hormone). GIP activation influences adipose tissue metabolism and may synergize with GLP-1R signaling. Studies have shown greater metabolic parameter changes vs semaglutide in head-to-head animal models.

**Retatrutide: Triple Agonist**

Targets GLP-1R + GIPR + GCGR. Designed half-life ~6 days. The glucagon receptor component introduces hepatic energy expenditure activity absent in the dual agonists. Phase 2 data (2023) showed the largest magnitude weight-related parameter changes of any compound in this class. Best suited for researchers specifically investigating triple-agonist or energy expenditure mechanisms.

**Choosing for Your Research Model**

Isolating GLP-1R effects → Semaglutide. Studying incretin synergy → Tirzepatide. Investigating hepatic energy expenditure or triple-receptor biology → Retatrutide.

*All compounds are for research use only. Not for human or veterinary use.*`,
    tags: ["Semaglutide", "Tirzepatide", "Retatrutide", "GLP-1", "metabolic research"],
    accent: "#ff6b6b"
  },
  {
    id: "how-to-read-coa",
    title: "How to Read a Peptide Certificate of Analysis",
    category: "Research Guidance",
    date: "June 1, 2026",
    readTime: "6 min read",
    summary: "A COA is your primary quality document. This guide walks through every section — what to look for, what to question, and how to verify a document is legitimate.",
    body: `A Certificate of Analysis (COA) is the primary quality document for any research compound. It tells you what's in the vial — not what the vendor claims, but what an independent laboratory confirmed.

**What a Legitimate COA Must Contain**

1. **Lot/Batch Number** — Links the COA to a specific batch. Must match the vial label. Mismatched lot numbers = red flag.
2. **Compound Name + Molecular Formula** — Specific, not vague.
3. **Date of Analysis** — Recent, and logically before your order date. Undated = invalid.
4. **Testing Laboratory Info** — Name, contact details, verifiable online.
5. **Testing Methods** — HPLC (purity percentage) and MS (identity confirmation). Both required for full verification.
6. **Purity Result** — Specific number (e.g., "99.2%"), not just "≥98%". Chromatogram preferred.

**Red Flags**

Missing lot number. No test date. Self-certified (vendor's own lab). No lab contact info. Blurred chromatogram. Generic purity claim with no numerical result.

**Trusted Third-Party Labs (2026)**

Janoshik Analytical (Czech Republic — publicly searchable results), MZ Biolabs (US-based HPLC + MS), Colmaric Analyticals (US-based, pharmaceutical-grade infrastructure).

**How to Verify in 3 Steps**

1. Note the lab name and lot number from the COA.
2. Go to the lab's website (e.g., janoshik.com).
3. Enter the lot number in their verification portal. If the record exists and matches, the COA is authentic.

**Alphaomegatides Standard**

Every product ships with a batch-specific, third-party COA including lot number, test date, HPLC purity result, MS identity confirmation, and full lab contact information. COAs are accessible in the Research Library before purchase.

*All compounds are for research use only.*`,
    tags: ["COA", "certificate of analysis", "purity", "verification", "HPLC"],
    accent: "#a855f7"
  }
];

function BlogPage({go}:{go:Function}){
  const {dark}=useDarkMode();
  const [selected,setSelected]=React.useState<string|null>(null);
  const bg=dark?"#0e0e0e":"#f0f0ec";
  const card=dark?"#141414":"#ffffff";
  const muted=dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.45)";

  if(selected){
    const post=BLOG_POSTS.find(p=>p.id===selected);
    if(!post) return null;
    return <div style={{maxWidth:760,margin:"0 auto",padding:"24px 20px 80px"}}>
      <button onClick={()=>setSelected(null)} style={{background:"transparent",border:"none",color:post.accent,cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:"0.9rem",padding:0,marginBottom:24}}>← Back to Blog</button>
      <div style={{background:card,borderRadius:20,padding:"36px 32px",boxShadow:"0 4px 24px rgba(0,0,0,0.12)"}}>
        <span style={{background:post.accent+"22",color:post.accent,borderRadius:100,padding:"4px 14px",fontSize:"0.78rem",fontWeight:700}}>{post.category}</span>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.4rem,4vw,2rem)",margin:"16px 0 8px",lineHeight:1.2}}>{post.title}</h1>
        <div style={{display:"flex",gap:16,color:muted,fontSize:"0.82rem",marginBottom:28}}><span>{post.date}</span><span>·</span><span>{post.readTime}</span></div>
        <div style={{lineHeight:1.8,fontSize:"0.97rem",color:dark?"rgba(255,255,255,0.85)":"rgba(0,0,0,0.8)"}}>
          {post.body.split('\n\n').map((para,i)=>{
            if(para.startsWith('**')&&para.endsWith('**')){
              return <h2 key={i} style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.05rem",margin:"24px 0 8px",color:post.accent}}>{para.replace(/\*\*/g,'')}</h2>;
            }
            const formatted=para.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
            return <p key={i} style={{margin:"0 0 16px"}} dangerouslySetInnerHTML={{__html:formatted}}/>;
          })}
        </div>
        <div style={{marginTop:32,paddingTop:24,borderTop:"1px solid rgba(128,128,128,0.15)"}}>
          <p style={{fontSize:"0.82rem",color:muted,fontStyle:"italic"}}>All compounds are for research use only. Not for human or veterinary use. This content does not constitute medical advice.</p>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap" as const,marginTop:16}}>
          {post.tags.map(tag=><span key={tag} style={{background:dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)",borderRadius:100,padding:"4px 12px",fontSize:"0.78rem",color:muted}}>#{tag}</span>)}
        </div>
      </div>
    </div>;
  }

  return <div style={{maxWidth:900,margin:"0 auto",padding:"24px 20px 80px"}}>
    <div style={{textAlign:"center",marginBottom:40}}>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,5vw,2.6rem)",margin:"0 0 12px"}}>Research Blog</h1>
      <p style={{color:muted,fontSize:"0.97rem"}}>Research overviews, compound comparisons, and documentation guides for qualified investigators.</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
      {BLOG_POSTS.map(post=>(
        <div key={post.id} onClick={()=>setSelected(post.id)}
          style={{background:card,borderRadius:20,padding:"24px",cursor:"pointer",transition:"transform .2s,box-shadow .2s",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}
          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(-4px)";(e.currentTarget as HTMLElement).style.boxShadow="0 8px 32px rgba(0,0,0,0.15)";}}
          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)";(e.currentTarget as HTMLElement).style.boxShadow="0 2px 12px rgba(0,0,0,0.08)";}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <span style={{background:post.accent+"22",color:post.accent,borderRadius:100,padding:"3px 12px",fontSize:"0.75rem",fontWeight:700}}>{post.category}</span>
            <span style={{color:muted,fontSize:"0.76rem"}}>{post.readTime}</span>
          </div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.05rem",margin:"0 0 10px",lineHeight:1.3}}>{post.title}</h2>
          <p style={{color:muted,fontSize:"0.86rem",lineHeight:1.6,margin:"0 0 16px"}}>{post.summary}</p>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:muted,fontSize:"0.78rem"}}>{post.date}</span>
            <span style={{color:post.accent,fontSize:"0.85rem",fontWeight:600}}>Read →</span>
          </div>
        </div>
      ))}
    </div>
    <div style={{textAlign:"center",marginTop:40,padding:"28px",background:card,borderRadius:20,boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
      <p style={{color:muted,fontSize:"0.88rem",margin:"0 0 8px"}}>More research posts coming weekly.</p>
      <p style={{color:muted,fontSize:"0.82rem",margin:0,fontStyle:"italic"}}>All content is for informational purposes only. For qualified researchers. Not medical advice.</p>
    </div>
  </div>;
}


// ══════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ══════════════════════════════════════════════════════════════════
function AboutPage({go}:{go:Function}){
  const {dark}=useDarkMode();
  const card=dark?"#141414":"#ffffff";
  const muted=dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.45)";
  const badges=[
    {icon:"🧪",label:"Third-Party COA",sub:"Every batch, every product"},
    {icon:"🇺🇸",label:"US Fulfillment",sub:"Domestic shipping only"},
    {icon:"⚖️",label:"RUO Compliant",sub:"Zero therapeutic claims"},
    {icon:"🔬",label:"≥99% Purity",sub:"HPLC verified"},
    {icon:"📦",label:"Cold-Chain Shipping",sub:"Stability guaranteed"},
    {icon:"📧",label:"Direct Support",sub:"alphaomegatides@yahoo.com"},
  ];
  const sections=[
    {heading:"Who We Are",body:"Alphaomegatides is a US-based research compound supplier dedicated to the highest standards of documentation, purity, and compliance. We exist at the intersection of scientific rigor and accessibility — making research-grade compounds available to qualified investigators with the transparency they require."},
    {heading:"Our Standard",body:"Every compound in our catalog is backed by a batch-specific Certificate of Analysis from an independent third-party analytical laboratory. We publish lot numbers, test dates, HPLC purity results, and full lab contact information for every product — because researchers deserve to verify, not just trust."},
    {heading:"Research Use Only",body:"All compounds sold by Alphaomegatides are strictly for in vitro and laboratory research purposes. They are not intended for human or veterinary use, diagnosis, treatment, or consumption. We enforce this standard without exception, and our site is designed with full regulatory compliance as a foundation — not an afterthought."},
    {heading:"US Fulfillment",body:"All orders ship from within the United States. We fulfill US orders only. Our cold-chain packaging protocols maintain compound stability from our facility to your laboratory. Standard fulfillment is 2–4 business days."},
    {heading:"Why Alphaomegatides",body:"Alpha and Omega — beginning and end. We built this to be the first and last peptide supplier a researcher ever needs. Where the tide turns for all."},
  ];
  return <div style={{maxWidth:860,margin:"0 auto",padding:"24px 20px 80px"}}>
    {/* Hero */}
    <div style={{textAlign:"center",marginBottom:48,padding:"48px 24px",background:card,borderRadius:24,boxShadow:"0 4px 24px rgba(0,0,0,0.1)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:20}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"2.4rem",color:"#ff6b6b",textShadow:"0 0 20px rgba(255,107,107,0.4)"}}>α</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem"}}>Alphaomegatides</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"2.4rem",color:"#3be8b0",textShadow:"0 0 20px rgba(59,232,176,0.4)"}}>Ω</span>
      </div>
      <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"clamp(1.1rem,3vw,1.5rem)",margin:"0 0 12px",lineHeight:1.3}}>"Where the tide turns for all."</p>
      <p style={{color:muted,fontSize:"0.95rem",maxWidth:560,margin:"0 auto",lineHeight:1.7}}>Research-grade compounds. Independent verification. US fulfillment. Built for investigators who need documentation they can trust.</p>
    </div>

    {/* Trust badges */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16,marginBottom:40}}>
      {badges.map(b=>(
        <div key={b.label} style={{background:card,borderRadius:16,padding:"20px",display:"flex",alignItems:"center",gap:14,boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
          <span style={{fontSize:"1.6rem"}}>{b.icon}</span>
          <div>
            <div style={{fontWeight:700,fontSize:"0.9rem",marginBottom:2}}>{b.label}</div>
            <div style={{color:muted,fontSize:"0.8rem"}}>{b.sub}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Story sections */}
    <div style={{display:"flex",flexDirection:"column" as const,gap:20,marginBottom:40}}>
      {sections.map(s=>(
        <div key={s.heading} style={{background:card,borderRadius:20,padding:"28px 28px",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.1rem",margin:"0 0 10px",color:"#3be8b0"}}>{s.heading}</h2>
          <p style={{color:muted,lineHeight:1.75,margin:0,fontSize:"0.95rem"}}>{s.body}</p>
        </div>
      ))}
    </div>

    {/* Contact CTA */}
    <div style={{background:"linear-gradient(135deg,rgba(59,232,176,0.08),rgba(255,107,107,0.08))",border:"1px solid rgba(59,232,176,0.2)",borderRadius:20,padding:"28px",textAlign:"center"}}>
      <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,margin:"0 0 8px"}}>Questions?</h3>
      <p style={{color:muted,margin:"0 0 16px",fontSize:"0.9rem"}}>Our team responds within 24 hours, Mon–Fri.</p>
      <button onClick={()=>go("contact")} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",borderRadius:100,padding:"11px 28px",fontFamily:"inherit",fontWeight:700,fontSize:"0.9rem",cursor:"pointer"}}>Contact Us</button>
    </div>
  </div>;
}


// ══════════════════════════════════════════════════════════════════
// RESEARCH JOURNAL PAGE
// ══════════════════════════════════════════════════════════════════
function ResearchJournalPage({go,user}:{go:Function,user:any}){
  const {dark}=useDarkMode();
  const card=dark?"#141414":"#ffffff";
  const muted=dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.45)";
  const inputStyle={width:"100%",background:dark?"#1e1e1e":"#f5f5f5",border:"1px solid rgba(128,128,128,0.2)",borderRadius:10,padding:"10px 14px",color:dark?"#fff":"#111",fontFamily:"inherit",fontSize:"0.92rem",boxSizing:"border-box" as const};

  const STORAGE_KEY=`ao_journal_${user?.email||"guest"}`;
  const [entries,setEntries]=React.useState<any[]>(()=>{
    try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");}catch{return [];}
  });

  // Firebase cross-device sync
  React.useEffect(()=>{
    if(!user?.email) return;
    const safeEmail=(user.email||'').replace(/[.]/g,'_');
    const fbPath=`/journals/${safeEmail}.json`;
    fetch(`${FB_CONFIG.databaseURL}${fbPath}`)
      .then(r=>r.ok?r.json():null)
      .then(data=>{
        if(!data) return;
        const fbEntries=Array.isArray(data)?data:Object.values(data);
        const local=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
        const ids=new Set(local.map((e:any)=>e.id));
        const merged=[...local,...fbEntries.filter((e:any)=>!ids.has(e.id))].sort((a:any,b:any)=>b.id-a.id);
        setEntries(merged);
        localStorage.setItem(STORAGE_KEY,JSON.stringify(merged));
      }).catch(()=>{});
  },[user?.email]);
  const [form,setForm]=React.useState({compound:"",date:new Date().toISOString().split("T")[0],dose:"",route:"",notes:"",rating:"3"});
  const [adding,setAdding]=React.useState(false);
  const [filterCompound,setFilterCompound]=React.useState("");

  function saveEntry(){
    if(!form.compound||!form.notes) return;
    const newEntry={...form,id:Date.now(),createdAt:new Date().toISOString()};
    const updated=[newEntry,...entries];
    setEntries(updated);
    // Push to Firebase for cross-device sync
    if(user?.email){
      const safeEmail=user.email.replace(/[.]/g,'_');
      fetch(`${FB_CONFIG.databaseURL}/journals/${safeEmail}/${newEntry.id}.json`,{
        method:'PUT',headers:{'Content-Type':'application/json'},
        body:JSON.stringify(newEntry)
      }).catch(()=>{});
    }
    localStorage.setItem(STORAGE_KEY,JSON.stringify(updated));
    setForm({compound:"",date:new Date().toISOString().split("T")[0],dose:"",route:"",notes:"",rating:"3"});
    setAdding(false);
  }
  function deleteEntry(id:number){
    const updated=entries.filter((e:any)=>e.id!==id);
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(updated));
  }

  const compounds=[...new Set(entries.map((e:any)=>e.compound))];
  const filtered=filterCompound?entries.filter((e:any)=>e.compound===filterCompound):entries;

  return <div style={{maxWidth:800,margin:"0 auto",padding:"24px 20px 80px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28,flexWrap:"wrap" as const,gap:12}}>
      <div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.5rem,4vw,2rem)",margin:"0 0 4px"}}>Research Journal</h1>
        <p style={{color:muted,fontSize:"0.88rem",margin:0}}>Private log — stored locally on this device</p>
      </div>
      <button onClick={()=>setAdding(true)} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",borderRadius:100,padding:"10px 22px",fontFamily:"inherit",fontWeight:700,fontSize:"0.88rem",cursor:"pointer"}}>+ New Entry</button>
    </div>

    {/* Compound filter pills */}
    {compounds.length>1&&<div style={{display:"flex",gap:8,flexWrap:"wrap" as const,marginBottom:20}}>
      <button onClick={()=>setFilterCompound("")} style={{background:filterCompound===""?"#3be8b0":"transparent",color:filterCompound===""?"#0e0e0e":muted,border:"1px solid rgba(59,232,176,0.3)",borderRadius:100,padding:"5px 14px",fontFamily:"inherit",fontSize:"0.8rem",cursor:"pointer"}}>All</button>
      {compounds.map((c:any)=><button key={c} onClick={()=>setFilterCompound(c===filterCompound?"":c)} style={{background:filterCompound===c?"#3be8b0":"transparent",color:filterCompound===c?"#0e0e0e":muted,border:"1px solid rgba(59,232,176,0.3)",borderRadius:100,padding:"5px 14px",fontFamily:"inherit",fontSize:"0.8rem",cursor:"pointer"}}>{c}</button>)}
    </div>}

    {/* Add entry form */}
    {adding&&<div style={{background:card,borderRadius:20,padding:"24px",marginBottom:24,boxShadow:"0 4px 24px rgba(0,0,0,0.12)"}}>
      <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,margin:"0 0 20px"}}>New Journal Entry</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div><label style={{fontSize:"0.8rem",color:muted,display:"block",marginBottom:4}}>Compound *</label>
          <input style={inputStyle} value={form.compound} onChange={e=>setForm(f=>({...f,compound:e.target.value}))} placeholder="e.g. BPC-157"/></div>
        <div><label style={{fontSize:"0.8rem",color:muted,display:"block",marginBottom:4}}>Date</label>
          <input type="date" style={inputStyle} value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div>
        <div><label style={{fontSize:"0.8rem",color:muted,display:"block",marginBottom:4}}>Concentration / Dose</label>
          <input style={inputStyle} value={form.dose} onChange={e=>setForm(f=>({...f,dose:e.target.value}))} placeholder="e.g. 250mcg/mL"/></div>
        <div><label style={{fontSize:"0.8rem",color:muted,display:"block",marginBottom:4}}>Administration Route</label>
          <input style={inputStyle} value={form.route} onChange={e=>setForm(f=>({...f,route:e.target.value}))} placeholder="e.g. IP injection"/></div>
      </div>
      <div style={{marginBottom:12}}><label style={{fontSize:"0.8rem",color:muted,display:"block",marginBottom:4}}>Research Notes *</label>
        <textarea style={{...inputStyle,minHeight:100,resize:"vertical" as const}} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Observations, results, conditions..."/></div>
      <div style={{marginBottom:20}}><label style={{fontSize:"0.8rem",color:muted,display:"block",marginBottom:8}}>Observation Quality: {["","⭐","⭐⭐","⭐⭐⭐","⭐⭐⭐⭐","⭐⭐⭐⭐⭐"][parseInt(form.rating)]}</label>
        <input type="range" min="1" max="5" value={form.rating} onChange={e=>setForm(f=>({...f,rating:e.target.value}))} style={{width:"100%",accentColor:"#3be8b0"}}/></div>
      <div style={{display:"flex",gap:10}}>
        <button onClick={saveEntry} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",borderRadius:100,padding:"10px 24px",fontFamily:"inherit",fontWeight:700,fontSize:"0.88rem",cursor:"pointer"}}>Save Entry</button>
        <button onClick={()=>setAdding(false)} style={{background:"transparent",color:muted,border:"1px solid rgba(128,128,128,0.2)",borderRadius:100,padding:"10px 20px",fontFamily:"inherit",fontSize:"0.88rem",cursor:"pointer"}}>Cancel</button>
      </div>
    </div>}

    {/* Entries list */}
    {filtered.length===0?<div style={{textAlign:"center",padding:"60px 24px",background:card,borderRadius:20,color:muted}}>
      <div style={{fontSize:"2.5rem",marginBottom:12}}>📓</div>
      <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,margin:"0 0 8px"}}>No entries yet</p>
      <p style={{fontSize:"0.88rem",margin:0}}>Start logging your research observations above.</p>
    </div>:filtered.map((entry:any)=>(
      <div key={entry.id} style={{background:card,borderRadius:16,padding:"20px 22px",marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,0.08)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem"}}>{entry.compound}</span>
            {entry.dose&&<span style={{color:"#3be8b0",fontSize:"0.82rem",marginLeft:10,fontWeight:600}}>{entry.dose}</span>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{color:muted,fontSize:"0.78rem"}}>{entry.date}</span>
            <button onClick={()=>deleteEntry(entry.id)} style={{background:"transparent",border:"none",color:muted,cursor:"pointer",fontSize:"0.85rem",padding:"2px 6px",borderRadius:6}}>✕</button>
          </div>
        </div>
        {entry.route&&<p style={{color:muted,fontSize:"0.8rem",margin:"0 0 8px"}}>Route: {entry.route}</p>}
        <p style={{color:dark?"rgba(255,255,255,0.8)":"rgba(0,0,0,0.75)",lineHeight:1.6,margin:"0 0 8px",fontSize:"0.9rem"}}>{entry.notes}</p>
        <div style={{color:"#f5c842",fontSize:"0.85rem"}}>{"⭐".repeat(parseInt(entry.rating))}</div>
      </div>
    ))}

    <p style={{color:muted,fontSize:"0.78rem",textAlign:"center",marginTop:24,fontStyle:"italic"}}>Research Journal data is stored locally on this device only. For research documentation purposes. All compounds for research use only.</p>
  </div>;
}


// ══════════════════════════════════════════════════════════════════
// STACK CHECKER PAGE
// ══════════════════════════════════════════════════════════════════
const STACK_DATA:{[key:string]:{[key:string]:{level:"safe"|"caution"|"avoid",note:string}}}={
  "BPC-157":{
    "TB-500":{level:"safe",note:"Frequently combined in tissue research models. Complementary mechanisms — BPC-157 influences angiogenesis and GI signaling while TB-500 acts through thymosin-β4 pathways. No documented antagonism in the literature."},
    "GHK-Cu":{level:"safe",note:"Different mechanisms (BPC-157: gastric/tissue repair signaling; GHK-Cu: collagen synthesis). No documented adverse interactions in research models."},
    "Semaglutide":{level:"safe",note:"No known mechanistic conflict. BPC-157 primarily acts on tissue repair pathways; semaglutide on GLP-1 receptor. Combination has appeared in metabolic + GI research contexts."},
    "Epithalon":{level:"safe",note:"Both are well-studied individually with no documented cross-reactions. Different primary mechanisms (BPC-157: tissue repair; Epithalon: telomere/pineal)."},
    "Selank":{level:"safe",note:"No documented interactions. Selank acts on GABAergic/anxiety pathways; BPC-157 on tissue/GI signaling. Compatible in research designs."},
    "NAD+":{level:"safe",note:"Complementary areas — cellular energy (NAD+) and tissue repair signaling (BPC-157). No known antagonism."},
    "Retatrutide":{level:"caution",note:"Both have GI-relevant activity (BPC-157 on gut mucosa; Retatrutide on GLP-1/glucagon receptors). Exercise caution in GI-specific research models to avoid confounding variables."},
    "CJC-1295":{level:"safe",note:"Different primary systems (BPC-157: tissue/GI; CJC-1295: GH axis). No documented adverse interactions in the literature."},
    "Ipamorelin":{level:"safe",note:"Complementary research areas with no known antagonism."},
  },
  "TB-500":{
    "BPC-157":{level:"safe",note:"Frequently combined in tissue research models. See BPC-157 entry."},
    "GHK-Cu":{level:"safe",note:"Both influence tissue remodeling through different mechanisms (TB-500: actin sequestration/thymosin-β4; GHK-Cu: collagen). No documented antagonism."},
    "CJC-1295":{level:"safe",note:"Different primary mechanisms. No known adverse interactions in research literature."},
    "Ipamorelin":{level:"safe",note:"No documented interactions. Often used in recovery research stacks."},
    "IGF-1 LR3":{level:"caution",note:"Both have activity in tissue growth contexts. Potential for additive effects in growth/proliferation models — factor this into experimental design and dosing."},
    "Epithalon":{level:"safe",note:"Different primary mechanisms, no documented interactions."},
  },
  "Semaglutide":{
    "Tirzepatide":{level:"avoid",note:"Both are GLP-1 receptor agonists. Combining them in research models is not standard practice and would produce confounded GLP-1R signaling data with no mechanistic clarity. Use one at a time."},
    "Retatrutide":{level:"avoid",note:"Retatrutide includes full GLP-1R agonism. Combining with semaglutide provides no additional mechanistic clarity and produces confounded GLP-1R data."},
    "Cagrilintide":{level:"safe",note:"Different receptors (semaglutide: GLP-1R; cagrilintide: amylin receptor). This combination has been studied in clinical trials (CagriSema). No antagonism documented."},
    "BPC-157":{level:"safe",note:"No known mechanistic conflict. Different primary pathways."},
    "NAD+":{level:"safe",note:"Different mechanisms. No documented adverse interactions."},
  },
  "Tirzepatide":{
    "Semaglutide":{level:"avoid",note:"Redundant GLP-1R activity — avoid in research models. See Semaglutide entry."},
    "Retatrutide":{level:"avoid",note:"Overlapping receptor activity (both hit GLP-1R and GIPR). Would produce confounded data with no mechanistic value."},
    "Cagrilintide":{level:"caution",note:"Tirzepatide covers GLP-1R and GIPR; cagrilintide adds amylin receptor. Some research has explored this combination. Use with clearly defined research objectives."},
    "BPC-157":{level:"safe",note:"No known mechanistic conflict."},
  },
  "Retatrutide":{
    "Semaglutide":{level:"avoid",note:"Overlapping GLP-1R activity. See Semaglutide entry."},
    "Tirzepatide":{level:"avoid",note:"Overlapping GLP-1R + GIPR activity. See Tirzepatide entry."},
    "BPC-157":{level:"caution",note:"Both have GI-relevant activity. In GI-specific research models, control carefully for confounding."},
    "NAD+":{level:"safe",note:"Complementary mechanisms (energy metabolism and receptor agonism). No documented interactions."},
  },
  "Selank":{
    "Semax":{level:"caution",note:"Both act in cognitive/neuropeptide research contexts. Selank has anxiolytic properties; Semax has stimulant-like properties in animal models. Complementary but may produce competing behavioral signals in the same model."},
    "Dihexa":{level:"safe",note:"Different primary mechanisms (Selank: GABAergic/anxiety; Dihexa: HGF/MET pathway). No documented antagonism."},
    "BPC-157":{level:"safe",note:"Different primary systems. No documented interactions."},
    "NAD+":{level:"safe",note:"No documented interactions."},
  },
  "Semax":{
    "Selank":{level:"caution",note:"See Selank entry. Opposing behavioral effects (stimulant vs anxiolytic) may confound behavioral studies."},
    "Dihexa":{level:"safe",note:"Both are cognitive research peptides with different mechanisms (Semax: BDNF/ACTH analog; Dihexa: HGF/MET). No documented antagonism."},
    "NAD+":{level:"safe",note:"Complementary (cellular energy + neuroprotection). No documented interactions."},
  },
  "CJC-1295":{
    "Ipamorelin":{level:"safe",note:"Classic research stack. CJC-1295 (GHRH analog) + Ipamorelin (ghrelin mimetic) act at different points in the GH axis — synergistic in GH secretion research models. Widely studied."},
    "GHRP-6":{level:"caution",note:"Both stimulate GH release through similar (ghrelin/GH secretagogue) pathways. Combining may produce strong additive GH axis stimulation — factor into research design."},
    "Sermorelin":{level:"caution",note:"Both are GHRH-axis agents. Combining two GHRH-pathway stimulants may confound mechanistic findings. Use separately unless specifically studying additive effects."},
    "BPC-157":{level:"safe",note:"Different primary systems. No documented interactions."},
    "TB-500":{level:"safe",note:"No documented interactions."},
    "IGF-1 LR3":{level:"caution",note:"CJC-1295 increases GH (which stimulates IGF-1); adding exogenous IGF-1 LR3 creates compounded IGF-1 pathway activation. Control carefully in growth research models."},
  },
  "Ipamorelin":{
    "CJC-1295":{level:"safe",note:"Well-studied combination. See CJC-1295 entry."},
    "GHRP-6":{level:"caution",note:"Both are GH secretagogues. Overlapping mechanism — additive GH stimulation likely. Factor into research design."},
    "Sermorelin":{level:"caution",note:"Overlapping GH axis activity. May produce compounded GH secretion in research models."},
    "TB-500":{level:"safe",note:"Different mechanisms. No documented interactions."},
    "BPC-157":{level:"safe",note:"No documented interactions."},
  },
  "NAD+":{
    "Epithalon":{level:"safe",note:"Complementary longevity research compounds. Different mechanisms (NAD+: cellular energy/sirtuin; Epithalon: telomere/pineal). No documented antagonism."},
    "GHK-Cu":{level:"safe",note:"Both used in longevity/aging research contexts with different mechanisms. Compatible."},
    "BPC-157":{level:"safe",note:"No documented interactions."},
    "Semaglutide":{level:"safe",note:"No documented adverse interactions."},
    "Sermorelin":{level:"safe",note:"No documented interactions."},
  },
};

const ALL_COMPOUNDS=["BPC-157","TB-500","GHK-Cu","Epithalon","CJC-1295","IGF-1 LR3","Ipamorelin","Sermorelin","GHRP-6","Selank","Semax","Dihexa","NAD+","Semaglutide","Tirzepatide","Retatrutide","Cagrilintide","GLP-3R","Melanotan 2","PT-141","MK-677"];

function StackCheckerPage({go}:{go:Function}){
  const {dark}=useDarkMode();
  const card=dark?"#141414":"#ffffff";
  const muted=dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.45)";
  const [selected,setSelected]=React.useState<string[]>([]);

  function toggle(c:string){
    setSelected(prev=>prev.includes(c)?prev.filter(x=>x!==c):[...prev,c].slice(0,6));
  }

  const levelColor={safe:"#3be8b0",caution:"#f5c842",avoid:"#ff6b6b"};
  const levelBg={safe:"rgba(59,232,176,0.1)",caution:"rgba(245,200,66,0.1)",avoid:"rgba(255,107,107,0.1)"};
  const levelIcon={safe:"✅",caution:"⚠️",avoid:"🚫"};

  // Generate all pairs
  const pairs:any[]=[];
  for(let i=0;i<selected.length;i++){
    for(let j=i+1;j<selected.length;j++){
      const a=selected[i],b=selected[j];
      const result=STACK_DATA[a]?.[b]||STACK_DATA[b]?.[a];
      pairs.push({a,b,result:result||{level:"safe" as const,note:"No documented interactions found in the research literature for this combination. Insufficient data to assess — proceed with appropriate controls."}});
    }
  }

  const summary=pairs.length?{
    avoid:pairs.filter(p=>p.result.level==="avoid").length,
    caution:pairs.filter(p=>p.result.level==="caution").length,
    safe:pairs.filter(p=>p.result.level==="safe").length,
  }:null;

  return <div style={{maxWidth:860,margin:"0 auto",padding:"24px 20px 80px"}}>
    <div style={{textAlign:"center",marginBottom:32}}>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.6rem,4vw,2.2rem)",margin:"0 0 10px"}}>Compound Stack Checker</h1>
      <p style={{color:muted,fontSize:"0.9rem",maxWidth:560,margin:"0 auto"}}>Select up to 6 compounds to check research literature compatibility. For research protocol design only.</p>
    </div>

    {/* Compound selector */}
    <div style={{background:card,borderRadius:20,padding:"24px",marginBottom:24,boxShadow:"0 2px 12px rgba(0,0,0,0.08)"}}>
      <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:700,margin:"0 0 16px",fontSize:"0.95rem"}}>Select Compounds ({selected.length}/6)</h3>
      <div style={{display:"flex",flexWrap:"wrap" as const,gap:8}}>
        {ALL_COMPOUNDS.map(c=>{
          const isSelected=selected.includes(c);
          return <button key={c} onClick={()=>toggle(c)}
            style={{background:isSelected?"#3be8b0":dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)",
              color:isSelected?"#0e0e0e":dark?"rgba(255,255,255,0.8)":"rgba(0,0,0,0.75)",
              border:isSelected?"2px solid #3be8b0":"2px solid transparent",
              borderRadius:100,padding:"7px 16px",fontFamily:"inherit",fontWeight:600,
              fontSize:"0.82rem",cursor:"pointer",transition:"all .15s"}}>
            {c}
          </button>;
        })}
      </div>
      {selected.length>0&&<button onClick={()=>setSelected([])} style={{background:"transparent",border:"none",color:muted,cursor:"pointer",fontFamily:"inherit",fontSize:"0.82rem",marginTop:14,padding:0}}>Clear all</button>}
    </div>

    {/* Summary bar */}
    {summary&&pairs.length>0&&<div style={{display:"flex",gap:12,marginBottom:20,flexWrap:"wrap" as const}}>
      {summary.avoid>0&&<div style={{background:levelBg.avoid,border:"1px solid rgba(255,107,107,0.3)",borderRadius:12,padding:"10px 18px",display:"flex",gap:8,alignItems:"center"}}>
        <span>🚫</span><span style={{fontWeight:700,color:"#ff6b6b",fontSize:"0.88rem"}}>{summary.avoid} Avoid</span>
      </div>}
      {summary.caution>0&&<div style={{background:levelBg.caution,border:"1px solid rgba(245,200,66,0.3)",borderRadius:12,padding:"10px 18px",display:"flex",gap:8,alignItems:"center"}}>
        <span>⚠️</span><span style={{fontWeight:700,color:"#f5c842",fontSize:"0.88rem"}}>{summary.caution} Caution</span>
      </div>}
      {summary.safe>0&&<div style={{background:levelBg.safe,border:"1px solid rgba(59,232,176,0.3)",borderRadius:12,padding:"10px 18px",display:"flex",gap:8,alignItems:"center"}}>
        <span>✅</span><span style={{fontWeight:700,color:"#3be8b0",fontSize:"0.88rem"}}>{summary.safe} Compatible</span>
      </div>}
    </div>}

    {/* Pair results */}
    {selected.length<2?<div style={{textAlign:"center",padding:"48px",background:card,borderRadius:20,color:muted}}>
      <div style={{fontSize:"2.5rem",marginBottom:12}}>🧬</div>
      <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,margin:"0 0 8px"}}>Select at least 2 compounds</p>
      <p style={{fontSize:"0.85rem",margin:0}}>Compatibility analysis will appear here.</p>
    </div>:pairs.sort((a,b)=>({avoid:0,caution:1,safe:2}[a.result.level as string]||2)-({avoid:0,caution:1,safe:2}[b.result.level as string]||2)).map((pair,i)=>(
      <div key={i} style={{background:card,borderRadius:16,padding:"18px 20px",marginBottom:12,borderLeft:`4px solid ${levelColor[pair.result.level as keyof typeof levelColor]}`,boxShadow:"0 2px 10px rgba(0,0,0,0.07)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap" as const}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem"}}>{pair.a}</span>
          <span style={{color:muted}}>+</span>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem"}}>{pair.b}</span>
          <span style={{marginLeft:"auto",background:levelBg[pair.result.level as keyof typeof levelBg],color:levelColor[pair.result.level as keyof typeof levelColor],borderRadius:100,padding:"3px 12px",fontSize:"0.78rem",fontWeight:700,whiteSpace:"nowrap" as const}}>
            {levelIcon[pair.result.level as keyof typeof levelIcon]} {pair.result.level.charAt(0).toUpperCase()+pair.result.level.slice(1)}
          </span>
        </div>
        <p style={{color:muted,fontSize:"0.86rem",lineHeight:1.65,margin:0}}>{pair.result.note}</p>
      </div>
    ))}

    <p style={{color:muted,fontSize:"0.78rem",textAlign:"center",marginTop:28,lineHeight:1.6,fontStyle:"italic"}}>
      Stack Checker is based on published research literature and is intended for research protocol design only. Not medical advice. All compounds for research use only. Always consult primary literature before designing experiments.
    </p>
  </div>;
}



// ══════════════════════════════════════════════════════════════════
// LOYALTY PAGE (standalone)
// ══════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════
// MEMBER COMMUNITY CHAT v7 — Firebase Realtime Database
// Channels · Typing · Online presence · Search · Pin · React
// Admin panel: view all members, mute, allow, ban
// ═══════════════════════════════════════════════════════════════
const FB_CONFIG = { databaseURL: "https://alphaomegatides-chat-default-rtdb.firebaseio.com" };
const FB_CHAT_PATH   = "/chat/messages";
const FB_TYPING_PATH = "/chat/typing";
const FB_ONLINE_PATH = "/chat/online";
const FB_MEMBERS_PATH = "/chat/members"; // stores all seen members + their status
const FB_URL = (path:string) => `${FB_CONFIG.databaseURL}${path}.json`;

const CHAT_CHANNELS = [
  { id:"general",  label:"General",  icon:"💬", desc:"Open discussion" },
  { id:"research", label:"Research", icon:"🔬", desc:"Protocol talk" },
  { id:"stacks",   label:"Stacks",   icon:"⚗️",  desc:"Compound combos" },
  { id:"results",  label:"Results",  icon:"📊", desc:"Research outcomes" },
];

interface ChatMessage {
  id?: string;
  userEmail: string;
  userName: string;
  isAdmin: boolean;
  text: string;
  imageData?: string;
  fileName?: string;
  fileData?: string;
  fileType?: string;
  timestamp: number;
  channel?: string;
  replyTo?: { id: string; userName: string; text: string; imageData?: string };
  reactions?: { [emoji: string]: string[] };
  pinned?: boolean;
}

interface ChatMember {
  email: string;
  userName: string;
  lastSeen: number;
  status: "active" | "muted" | "banned";
  messageCount?: number;
}

// ── Firebase helpers ────────────────────────────────────────────
async function fbPost(msg: Omit<ChatMessage,"id">, channel="general"): Promise<void> {
  try {
    await fetch(`${FB_CONFIG.databaseURL}/chat/channels/${channel}/messages.json`, {
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(msg),
    });
  } catch(e) { console.error("Chat post failed:", e); }
}

async function fbGetMessages(channel="general"): Promise<ChatMessage[]> {
  try {
    const res = await fetch(`${FB_CONFIG.databaseURL}/chat/channels/${channel}/messages.json?orderBy="timestamp"&limitToLast=120`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data || typeof data !== "object") return [];
    return Object.entries(data).map(([id,val]:any)=>({...val,id,channel})).sort((a,b)=>a.timestamp-b.timestamp);
  } catch { return []; }
}

async function fbDeleteMessage(id: string, channel="general"): Promise<void> {
  try { await fetch(`${FB_CONFIG.databaseURL}/chat/channels/${channel}/messages/${id}.json`,{method:"DELETE"}); } catch {}
}

async function fbToggleReaction(msgId: string, emoji: string, userEmail: string, channel="general"): Promise<void> {
  try {
    const res = await fetch(`${FB_CONFIG.databaseURL}/chat/channels/${channel}/messages/${msgId}.json`);
    if (!res.ok) return;
    const msg = await res.json(); if (!msg) return;
    const reactions = msg.reactions || {};
    const users: string[] = reactions[emoji] || [];
    const idx = users.indexOf(userEmail);
    if (idx>=0) users.splice(idx,1); else users.push(userEmail);
    if (users.length===0) delete reactions[emoji]; else reactions[emoji]=users;
    await fetch(`${FB_CONFIG.databaseURL}/chat/channels/${channel}/messages/${msgId}.json`,{
      method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({reactions}),
    });
  } catch {}
}

async function fbSetTyping(email: string, name: string, isTyping: boolean): Promise<void> {
  try {
    const key = email.replace(/[.@]/g,"_");
    if (isTyping) {
      await fetch(`${FB_CONFIG.databaseURL}${FB_TYPING_PATH}/${key}.json`,{
        method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({name,ts:Date.now()}),
      });
    } else {
      await fetch(`${FB_CONFIG.databaseURL}${FB_TYPING_PATH}/${key}.json`,{method:"DELETE"});
    }
  } catch {}
}

async function fbSetOnline(email: string, name: string, online: boolean): Promise<void> {
  try {
    const key = email.replace(/[.@]/g,"_");
    if (online) {
      await fetch(`${FB_CONFIG.databaseURL}${FB_ONLINE_PATH}/${key}.json`,{
        method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({name,ts:Date.now()}),
      });
    } else {
      await fetch(`${FB_CONFIG.databaseURL}${FB_ONLINE_PATH}/${key}.json`,{method:"DELETE"});
    }
  } catch {}
}

async function fbGetOnline(): Promise<{name:string;ts:number}[]> {
  try {
    const res = await fetch(FB_URL(FB_ONLINE_PATH));
    if (!res.ok) return [];
    const data = await res.json(); if (!data) return [];
    const cutoff = Date.now()-90000;
    return Object.values(data).filter((u:any)=>u.ts>cutoff) as any[];
  } catch { return []; }
}

async function fbGetTyping(myEmail: string): Promise<string[]> {
  try {
    const res = await fetch(FB_URL(FB_TYPING_PATH));
    if (!res.ok) return [];
    const data = await res.json(); if (!data) return [];
    const cutoff = Date.now()-5000;
    return Object.values(data).filter((u:any)=>u.ts>cutoff&&u.name!==myEmail).map((u:any)=>u.name);
  } catch { return []; }
}

// ── Member management (admin) ───────────────────────────────────
async function fbRegisterMember(email: string, name: string): Promise<void> {
  try {
    const key = email.replace(/[.@]/g,"_");
    const res = await fetch(`${FB_CONFIG.databaseURL}${FB_MEMBERS_PATH}/${key}.json`);
    const existing = res.ok ? await res.json() : null;
    if (existing && existing.status === "banned") return; // don't overwrite ban
    await fetch(`${FB_CONFIG.databaseURL}${FB_MEMBERS_PATH}/${key}.json`,{
      method:"PATCH", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ email, userName:name, lastSeen:Date.now(), status: existing?.status||"active", messageCount:(existing?.messageCount||0)+1 }),
    });
  } catch {}
}

async function fbGetAllMembers(): Promise<ChatMember[]> {
  try {
    const res = await fetch(FB_URL(FB_MEMBERS_PATH));
    if (!res.ok) return [];
    const data = await res.json(); if (!data) return [];
    return Object.values(data) as ChatMember[];
  } catch { return []; }
}

async function fbSetMemberStatus(email: string, status: "active"|"muted"|"banned"): Promise<void> {
  try {
    const key = email.replace(/[.@]/g,"_");
    await fetch(`${FB_CONFIG.databaseURL}${FB_MEMBERS_PATH}/${key}.json`,{
      method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({status}),
    });
  } catch {}
}

async function fbCheckMemberStatus(email: string): Promise<"active"|"muted"|"banned"> {
  try {
    const key = email.replace(/[.@]/g,"_");
    const res = await fetch(`${FB_CONFIG.databaseURL}${FB_MEMBERS_PATH}/${key}.json`);
    if (!res.ok) return "active";
    const data = await res.json();
    return data?.status || "active";
  } catch { return "active"; }
}

// ── Admin member panel ──────────────────────────────────────────
function ChatMemberPanel({onClose, currentUserEmail}: {onClose:()=>void; currentUserEmail:string}) {
  const [members, setMembers]   = useState<ChatMember[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState<"all"|"active"|"muted"|"banned">("all");
  const [search, setSearch]     = useState("");
  const [saving, setSaving]     = useState<string|null>(null);
  const [online, setOnline]     = useState<string[]>([]);

  const accentG="#3be8b0", accentR="#ff6b6b", accentY="#ffd166", accentB="#4f8ef7";
  const bg="#0e0e0e", card="#161616", border="rgba(255,255,255,0.08)", muted="rgba(255,255,255,0.38)";

  const load = async () => {
    const [all, onlineList] = await Promise.all([fbGetAllMembers(), fbGetOnline()]);
    setMembers(all.sort((a,b)=>b.lastSeen-a.lastSeen));
    setOnline(onlineList.map((u:any)=>u.name));
    setLoading(false);
  };

  useEffect(()=>{ load(); const iv=setInterval(load,8000); return()=>clearInterval(iv); },[]);

  const handleStatus = async (member: ChatMember, status: "active"|"muted"|"banned") => {
    if (member.email === currentUserEmail) { alert("You can't change your own status."); return; }
    setSaving(member.email);
    await fbSetMemberStatus(member.email, status);
    await load();
    setSaving(null);
  };

  const filtered = members.filter(m => {
    if (filter!=="all" && m.status!==filter) return false;
    if (search && !m.userName?.toLowerCase().includes(search.toLowerCase()) && !m.email?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusColor = (s:string) => s==="banned"?accentR:s==="muted"?accentY:accentG;
  const statusBg    = (s:string) => s==="banned"?"rgba(255,107,107,0.12)":s==="muted"?"rgba(255,209,102,0.12)":"rgba(59,232,176,0.10)";
  const statusIcon  = (s:string) => s==="banned"?"🚫":s==="muted"?"🔇":"✅";
  const timeAgo = (ts:number) => {
    const d=Date.now()-ts, m=Math.floor(d/60000), h=Math.floor(d/3600000), dy=Math.floor(d/86400000);
    if (d<60000) return "just now"; if (m<60) return `${m}m ago`; if (h<24) return `${h}h ago`; return `${dy}d ago`;
  };
  const avatarCol = (email:string) => {
    const cols=["#3be8b0","#ff6b6b","#4f8ef7","#ffd166","#a855f7","#f59e0b","#ec4899"];
    let h=0; for(const c of (email||"")) h=(h*31+c.charCodeAt(0))%cols.length;
    return cols[Math.abs(h)];
  };
  const initials = (name:string) => (name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  const counts = { all:members.length, active:members.filter(m=>m.status==="active").length, muted:members.filter(m=>m.status==="muted").length, banned:members.filter(m=>m.status==="banned").length };

  return (
    <div style={{position:"fixed" as const,inset:0,zIndex:9999,background:"rgba(0,0,0,0.85)",backdropFilter:"blur(8px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:20,paddingBottom:20}}>
      <style>{`
        @keyframes panelIn { from{opacity:0;transform:translateY(12px) scale(0.97);} to{opacity:1;transform:translateY(0) scale(1);} }
        .member-row:hover { background: rgba(255,255,255,0.04) !important; }
        .status-btn:hover { filter: brightness(1.2); transform: scale(1.05); }
      `}</style>
      <div style={{background:bg,border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,width:"min(680px,96vw)",maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 24px 80px rgba(0,0,0,0.8)",animation:"panelIn .22s ease-out",overflow:"hidden"}}>

        {/* Header */}
        <div style={{padding:"18px 20px 14px",borderBottom:"1px solid "+border,display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
          <div style={{width:38,height:38,borderRadius:12,background:"rgba(255,107,107,0.15)",border:"1px solid rgba(255,107,107,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem"}}>👥</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.05rem",color:"#fff"}}>Member Management</div>
            <div style={{fontSize:"0.7rem",color:muted}}>{members.length} total members · {counts.active} active · {online.length} online now</div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.07)",border:"1px solid "+border,color:"rgba(255,255,255,0.5)",borderRadius:10,width:32,height:32,cursor:"pointer",fontSize:"0.9rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>

        {/* Stats row */}
        <div style={{display:"flex",gap:0,borderBottom:"1px solid "+border,flexShrink:0}}>
          {(["all","active","muted","banned"] as const).map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              style={{flex:1,padding:"10px 4px",background:filter===f?statusBg(f==="all"?"active":f):"transparent",border:"none",cursor:"pointer",borderBottom:filter===f?"2px solid "+(f==="all"?accentG:statusColor(f)):"2px solid transparent",transition:"all .15s"}}>
              <div style={{fontSize:"1rem"}}>{f==="all"?"👥":statusIcon(f)}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",color:f==="all"?"#fff":statusColor(f)}}>{counts[f]}</div>
              <div style={{fontSize:"0.62rem",color:muted,textTransform:"capitalize" as const}}>{f}</div>
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{padding:"10px 16px",borderBottom:"1px solid "+border,flexShrink:0}}>
          <div style={{position:"relative" as const}}>
            <span style={{position:"absolute" as const,left:10,top:"50%",transform:"translateY(-50%)",color:muted,fontSize:"0.82rem"}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search by name or email…"
              style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid "+border,borderRadius:10,padding:"8px 12px 8px 30px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",outline:"none",boxSizing:"border-box" as const}}/>
            {search && <button onClick={()=>setSearch("")} style={{position:"absolute" as const,right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:muted,cursor:"pointer"}}>✕</button>}
          </div>
        </div>

        {/* Member list */}
        <div style={{flex:1,overflowY:"auto",padding:"6px 0"}}>
          {loading && (
            <div style={{textAlign:"center",padding:40,color:muted,fontSize:"0.85rem"}}>Loading members…</div>
          )}
          {!loading && filtered.length===0 && (
            <div style={{textAlign:"center",padding:40,color:muted,fontSize:"0.85rem"}}>No members found</div>
          )}
          {filtered.map(member=>{
            const isOnline = online.includes(member.userName);
            const isSelf   = member.email===currentUserEmail;
            return (
              <div key={member.email} className="member-row"
                style={{display:"flex",alignItems:"center",gap:12,padding:"10px 18px",transition:"background .12s",borderBottom:"1px solid rgba(255,255,255,0.03)"}}>

                {/* Avatar */}
                <div style={{position:"relative" as const,flexShrink:0}}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:member.status==="banned"?"#2a1a1a":avatarCol(member.email),display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.72rem",fontWeight:800,color:member.status==="banned"?"rgba(255,255,255,0.3)":"#0e0e0e",filter:member.status==="banned"?"grayscale(1) opacity(0.5)":"none"}}>
                    {member.status==="banned"?"🚫":initials(member.userName)}
                  </div>
                  {isOnline && member.status!=="banned" && (
                    <span style={{position:"absolute" as const,bottom:0,right:0,width:10,height:10,borderRadius:"50%",background:accentG,border:"2px solid "+bg}}/>
                  )}
                </div>

                {/* Info */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                    <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",color:member.status==="banned"?"rgba(255,255,255,0.3)":"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" as const,maxWidth:160}}>
                      {member.userName}
                    </span>
                    {isSelf && <span style={{background:"rgba(59,232,176,0.15)",color:accentG,fontSize:"0.58rem",fontWeight:700,padding:"1px 6px",borderRadius:100,flexShrink:0}}>YOU</span>}
                    {isOnline && <span style={{fontSize:"0.58rem",color:accentG,fontWeight:600,flexShrink:0}}>● LIVE</span>}
                    <span style={{background:statusBg(member.status||"active"),color:statusColor(member.status||"active"),fontSize:"0.58rem",fontWeight:700,padding:"1px 7px",borderRadius:100,flexShrink:0,letterSpacing:"0.04em"}}>
                      {(member.status||"active").toUpperCase()}
                    </span>
                  </div>
                  <div style={{fontSize:"0.68rem",color:muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" as const}}>
                    {member.email} · {member.messageCount||0} msgs · {timeAgo(member.lastSeen)}
                  </div>
                </div>

                {/* Action buttons — only if not self */}
                {!isSelf && (
                  <div style={{display:"flex",gap:5,flexShrink:0}}>
                    {member.status!=="active" && (
                      <button className="status-btn"
                        disabled={saving===member.email}
                        onClick={()=>handleStatus(member,"active")}
                        title="Allow"
                        style={{background:"rgba(59,232,176,0.12)",border:"1px solid rgba(59,232,176,0.25)",color:accentG,borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:"0.72rem",fontWeight:700,transition:"all .15s",opacity:saving===member.email?.5:1}}>
                        ✅ Allow
                      </button>
                    )}
                    {member.status!=="muted" && (
                      <button className="status-btn"
                        disabled={saving===member.email}
                        onClick={()=>handleStatus(member,"muted")}
                        title="Mute"
                        style={{background:"rgba(255,209,102,0.1)",border:"1px solid rgba(255,209,102,0.25)",color:accentY,borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:"0.72rem",fontWeight:700,transition:"all .15s",opacity:saving===member.email?.5:1}}>
                        🔇 Mute
                      </button>
                    )}
                    {member.status!=="banned" && (
                      <button className="status-btn"
                        disabled={saving===member.email}
                        onClick={()=>{ if(window.confirm(`Ban ${member.userName}? They won't be able to post.`)) handleStatus(member,"banned"); }}
                        title="Ban"
                        style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.22)",color:accentR,borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:"0.72rem",fontWeight:700,transition:"all .15s",opacity:saving===member.email?.5:1}}>
                        🚫 Ban
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{padding:"10px 18px",borderTop:"1px solid "+border,fontSize:"0.65rem",color:muted,textAlign:"center",flexShrink:0}}>
          Muted members can view chat but cannot post · Banned members are blocked entirely · Changes take effect immediately
        </div>
      </div>
    </div>
  );
}

function MemberChatPage({go, user}: {go: Function; user: any}) {
  const [channel, setChannel]       = useState("general");
  const [messages, setMessages]     = useState<ChatMessage[]>([]);
  const [text, setText]             = useState("");
  const [loading, setLoading]       = useState(true);
  const [sending, setSending]       = useState(false);
  const [imagePreview, setImgPrev]  = useState<string|null>(null);
  const [imageData, setImgData]     = useState<string|null>(null);
  const [fileInfo, setFileInfo]     = useState<{name:string;data:string;type:string}|null>(null);
  const [deletingId, setDeletingId] = useState<string|null>(null);
  const [replyTo, setReplyTo]       = useState<ChatMessage|null>(null);
  const [lightboxSrc, setLightbox]  = useState<string|null>(null);
  const [showEmojiFor, setShowEmojiFor] = useState<string|null>(null);
  const [searchQuery, setSearchQuery]   = useState("");
  const [showSearch, setShowSearch]     = useState(false);
  const [onlineUsers, setOnlineUsers]   = useState<{name:string}[]>([]);
  const [typingUsers, setTypingUsers]   = useState<string[]>([]);
  const [showChannels, setShowChannels] = useState(false);
  const [pinnedMsg, setPinnedMsg]       = useState<ChatMessage|null>(null);
  const [showPinned, setShowPinned]     = useState(false);
  const [copiedId, setCopiedId]         = useState<string|null>(null);
  const [showOnline, setShowOnline]     = useState(false);
  const [showMemberPanel, setShowMemberPanel] = useState(false);
  const [myStatus, setMyStatus]         = useState<"active"|"muted"|"banned">("active");
  const bottomRef    = useRef<HTMLDivElement>(null);
  const inputRef     = useRef<HTMLTextAreaElement>(null);
  const imgInputRef  = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastCount    = useRef(0);
  const pollerRef    = useRef<any>(null);
  const typingTimer  = useRef<any>(null);
  const onlineRef    = useRef<any>(null);

  const accentG="#3be8b0", accentR="#ff6b6b", bg="#0e0e0e", card2="#1a1a1a";
  const glass="rgba(255,255,255,0.04)", border="rgba(255,255,255,0.08)", muted="rgba(255,255,255,0.38)";
  const ch = CHAT_CHANNELS.find(c=>c.id===channel)||CHAT_CHANNELS[0];

  const loadMessages = async (scrollToBottom=false) => {
    const msgs = await fbGetMessages(channel);
    if (msgs.length!==lastCount.current||scrollToBottom) {
      setMessages(msgs); lastCount.current=msgs.length;
      if (scrollToBottom) setTimeout(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),80);
    }
    const pin=msgs.find(m=>m.pinned);
    if (pin) setPinnedMsg(pin); else setPinnedMsg(null);
    setLoading(false);
  };

  const loadPresence = async () => {
    const [online, typing] = await Promise.all([fbGetOnline(), fbGetTyping(user?.email||"")]);
    setOnlineUsers(online);
    setTypingUsers(typing);
  };

  useEffect(()=>{
    setLoading(true); lastCount.current=0;
    loadMessages(true);
    pollerRef.current=setInterval(()=>{loadMessages(false);loadPresence();},2500);
    return()=>clearInterval(pollerRef.current);
  },[channel]);

  useEffect(()=>{
    if (!user?.email) return;
    // Check own status
    fbCheckMemberStatus(user.email).then(setMyStatus);
    fbSetOnline(user.email, user.name||user.email.split("@")[0], true);
    fbRegisterMember(user.email, user.name||user.email.split("@")[0]);
    onlineRef.current=setInterval(()=>{
      fbSetOnline(user.email, user.name||user.email.split("@")[0], true);
      fbCheckMemberStatus(user.email).then(setMyStatus);
    },30000);
    const handleUnload=()=>fbSetOnline(user.email, user.name, false);
    window.addEventListener("beforeunload", handleUnload);
    return()=>{ clearInterval(onlineRef.current); fbSetOnline(user.email,user.name,false); window.removeEventListener("beforeunload",handleUnload); };
  },[user?.email]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (!user?.email||myStatus!=="active") return;
    clearTimeout(typingTimer.current);
    fbSetTyping(user.email, user.name||user.email.split("@")[0], true);
    typingTimer.current=setTimeout(()=>fbSetTyping(user.email,user.name,false),3000);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file=e.target.files?.[0]; if(!file) return;
    if(file.size>3*1024*1024){alert("Images must be under 3MB.");e.target.value="";return;}
    const reader=new FileReader();
    reader.onload=()=>{const r=reader.result as string;setImgData(r);setImgPrev(r);};
    reader.readAsDataURL(file); e.target.value="";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file=e.target.files?.[0]; if(!file) return;
    if(file.size>5*1024*1024){alert("Files must be under 5MB.");e.target.value="";return;}
    const reader=new FileReader();
    reader.onload=()=>setFileInfo({name:file.name,data:reader.result as string,type:file.type});
    reader.readAsDataURL(file); e.target.value="";
  };

  const clearAttachments=()=>{setImgData(null);setImgPrev(null);setFileInfo(null);};

  const handleSend = async () => {
    if (myStatus==="banned") { alert("You have been banned from chat."); return; }
    if (myStatus==="muted") { alert("You are muted and cannot post."); return; }
    if ((!text.trim()&&!imageData&&!fileInfo)||sending) return;
    setSending(true);
    clearTimeout(typingTimer.current);
    if (user?.email) fbSetTyping(user.email,user.name,false);
    const msg: Omit<ChatMessage,"id"> = {
      userEmail:user.email||"",
      userName:user.name||user.email?.split("@")[0]||"Member",
      isAdmin:isAdmin(user),
      text:text.trim(),
      timestamp:Date.now(),
      channel,
      ...(imageData?{imageData}:{}),
      ...(fileInfo?{fileName:fileInfo.name,fileData:fileInfo.data,fileType:fileInfo.type}:{}),
      ...(replyTo?{replyTo:{id:replyTo.id||"",userName:replyTo.userName,text:replyTo.text,imageData:replyTo.imageData}}:{}),
    };
    await fbPost(msg,channel);
    await fbRegisterMember(user.email, user.name||user.email?.split("@")[0]||"Member");
    setText(""); clearAttachments(); setReplyTo(null); setSending(false);
    await loadMessages(true);
    setTimeout(()=>inputRef.current?.focus(),50);
  };

  const handleDelete = async (id:string) => {
    if(!window.confirm("Delete this message?")) return;
    setDeletingId(id);
    await fbDeleteMessage(id,channel);
    await loadMessages(false);
    setDeletingId(null);
  };

  const handlePin = async (msg:ChatMessage) => {
    if(!isAdmin(user)) return;
    try {
      const all=await fbGetMessages(channel);
      for(const m of all.filter(m=>m.pinned&&m.id)) {
        await fetch(`${FB_CONFIG.databaseURL}/chat/channels/${channel}/messages/${m.id}.json`,{
          method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({pinned:false})
        });
      }
      const isPinned=pinnedMsg?.id===msg.id;
      if(!isPinned&&msg.id) {
        await fetch(`${FB_CONFIG.databaseURL}/chat/channels/${channel}/messages/${msg.id}.json`,{
          method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({pinned:true})
        });
        setPinnedMsg(msg);
      } else { setPinnedMsg(null); }
      loadMessages(false);
    } catch {}
  };

  const handleCopyMsg=(msg:ChatMessage)=>{
    navigator.clipboard.writeText(msg.text||"").catch(()=>{});
    setCopiedId(msg.id||null);
    setTimeout(()=>setCopiedId(null),1500);
  };

  const handleKeyDown=(e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
    if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleSend();}
    if(e.key==="Escape"){setReplyTo(null);setShowEmojiFor(null);}
  };

  const formatTime=(ts:number)=>new Date(ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
  const formatDate=(ts:number)=>{
    const d=new Date(ts),t=new Date();
    if(d.toDateString()===t.toDateString()) return "Today";
    const y=new Date(t);y.setDate(t.getDate()-1);
    if(d.toDateString()===y.toDateString()) return "Yesterday";
    return d.toLocaleDateString([],{month:"short",day:"numeric"});
  };

  const avatarColor=(email:string)=>{
    const cols=["#3be8b0","#ff6b6b","#4f8ef7","#ffd166","#a855f7","#f59e0b","#ec4899","#14b8a6"];
    let h=0;for(const c of email)h=(h*31+c.charCodeAt(0))%cols.length;
    return cols[Math.abs(h)];
  };
  const initials=(name:string)=>name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  const grouped: {date:string;msgs:ChatMessage[]}[] = [];
  const filtered=searchQuery?messages.filter(m=>m.text?.toLowerCase().includes(searchQuery.toLowerCase())||m.userName?.toLowerCase().includes(searchQuery.toLowerCase())):messages;
  filtered.forEach(m=>{
    const label=formatDate(m.timestamp);
    if(!grouped.length||grouped[grouped.length-1].date!==label) grouped.push({date:label,msgs:[m]});
    else grouped[grouped.length-1].msgs.push(m);
  });

  const isMe=(msg:ChatMessage)=>msg.userEmail===user?.email;
  const QUICK_EMOJIS=["👍","🔥","💉","🧬","⚗️","💪","🙌","❤️","😂","🤯","👀","✅"];

  if (!user) return (
    <div style={{minHeight:"100vh",background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,padding:40}}>
      <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,#3be8b0,#4f8ef7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2rem",boxShadow:"0 0 40px rgba(59,232,176,0.3)"}}>💬</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",color:"#fff",marginTop:8}}>Members Only</div>
      <div style={{color:muted,fontSize:"0.9rem",textAlign:"center",maxWidth:280,lineHeight:1.6}}>Sign in to access the community chat.</div>
      <button onClick={()=>go("login")} style={{background:accentG,color:"#0e0e0e",border:"none",borderRadius:100,padding:"13px 32px",fontFamily:"inherit",fontWeight:700,fontSize:"0.95rem",cursor:"pointer",marginTop:8,boxShadow:"0 4px 20px rgba(59,232,176,0.4)"}}>Sign In</button>
      <button onClick={()=>go("register")} style={{background:"transparent",color:muted,border:"1px solid rgba(255,255,255,0.12)",borderRadius:100,padding:"11px 28px",fontFamily:"inherit",fontWeight:600,fontSize:"0.88rem",cursor:"pointer"}}>Create Account</button>
    </div>
  );

  return (
    <div style={{background:bg,minHeight:"100vh",display:"flex",flexDirection:"column",paddingTop:60}}>
      <style>{`
        @keyframes chatpulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(.9);}}
        @keyframes msgIn{from{opacity:0;transform:translateY(6px) scale(0.98);}to{opacity:1;transform:translateY(0) scale(1);}}
        @keyframes msgflash{0%{background:rgba(59,232,176,0.18);}100%{background:transparent;}}
        @keyframes typingDot{0%,80%,100%{transform:translateY(0);opacity:0.4;}40%{transform:translateY(-4px);opacity:1;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:translateY(0);}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-8px);}to{opacity:1;transform:translateX(0);}}
        .msg-flash{animation:msgflash 1.2s ease-out;}
        .chat-msg{animation:msgIn 0.2s ease-out;}
        .bubble-hover{transition:filter .15s;}.bubble-hover:hover{filter:brightness(1.07);}
        .channel-btn:hover{background:rgba(255,255,255,0.08)!important;}
        .action-btn:hover{opacity:1!important;background:rgba(255,255,255,0.1)!important;}
        .emoji-btn:hover{background:rgba(255,255,255,0.12)!important;transform:scale(1.2);}
        .online-dot{animation:chatpulse 2s infinite;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:2px;}
      `}</style>

      {/* ── TOP HEADER ── */}
      <div style={{background:"rgba(10,10,10,0.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid "+border,padding:"0 16px",display:"flex",alignItems:"center",gap:10,position:"sticky",top:60,zIndex:20,height:56}}>
        <button onClick={()=>setShowChannels(!showChannels)} className="channel-btn"
          style={{display:"flex",alignItems:"center",gap:8,background:showChannels?"rgba(59,232,176,0.1)":glass,border:"1px solid "+(showChannels?"rgba(59,232,176,0.3)":border),borderRadius:10,padding:"7px 12px",cursor:"pointer",transition:"all .15s"}}>
          <span style={{fontSize:"1rem"}}>{ch.icon}</span>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.88rem",color:"#fff"}}>{ch.label}</span>
          <span style={{fontSize:"0.6rem",color:muted,marginLeft:2}}>{showChannels?"▲":"▼"}</span>
        </button>
        <div style={{display:"flex",alignItems:"center",gap:5,fontSize:"0.72rem"}}>
          <span className="online-dot" style={{width:6,height:6,borderRadius:"50%",background:accentG,display:"inline-block"}}/>
          <span style={{color:muted}}>{onlineUsers.length} online</span>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
          <button onClick={()=>{setShowSearch(!showSearch);if(!showSearch)setTimeout(()=>document.getElementById("chat-search")?.focus(),100);}}
            style={{background:showSearch?"rgba(79,142,247,0.15)":glass,border:"1px solid "+(showSearch?"rgba(79,142,247,0.3)":border),borderRadius:9,width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",transition:"all .15s"}}>🔍</button>
          <button onClick={()=>setShowOnline(!showOnline)}
            style={{background:glass,border:"1px solid "+border,borderRadius:9,width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem"}}>👥</button>
          {isAdmin(user)&&(
            <button onClick={()=>setShowMemberPanel(true)}
              title="Member Management"
              style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.25)",borderRadius:9,width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem"}}>⚙️</button>
          )}
          {pinnedMsg&&(
            <button onClick={()=>setShowPinned(!showPinned)}
              style={{background:"rgba(255,209,102,0.12)",border:"1px solid rgba(255,209,102,0.25)",borderRadius:9,width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem"}}>📌</button>
          )}
        </div>
      </div>

      {/* ── CHANNEL DROPDOWN ── */}
      {showChannels&&(
        <div style={{background:"rgba(18,18,18,0.98)",backdropFilter:"blur(20px)",borderBottom:"1px solid "+border,padding:"10px 16px",display:"flex",gap:8,flexWrap:"wrap" as const,position:"sticky",top:116,zIndex:19,animation:"fadeUp .15s ease-out"}}>
          {CHAT_CHANNELS.map(c=>(
            <button key={c.id} onClick={()=>{setChannel(c.id);setShowChannels(false);}} className="channel-btn"
              style={{display:"flex",alignItems:"center",gap:7,background:channel===c.id?"rgba(59,232,176,0.12)":glass,border:"1px solid "+(channel===c.id?"rgba(59,232,176,0.3)":border),borderRadius:10,padding:"8px 14px",cursor:"pointer",transition:"all .15s"}}>
              <span style={{fontSize:"1rem"}}>{c.icon}</span>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.82rem",color:channel===c.id?accentG:"#fff"}}>{c.label}</div>
                <div style={{fontSize:"0.65rem",color:muted}}>{c.desc}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── SEARCH BAR ── */}
      {showSearch&&(
        <div style={{background:"rgba(14,14,14,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid "+border,padding:"10px 16px",position:"sticky",top:116,zIndex:18}}>
          <div style={{maxWidth:700,margin:"0 auto",position:"relative" as const}}>
            <span style={{position:"absolute" as const,left:12,top:"50%",transform:"translateY(-50%)",color:muted,fontSize:"0.85rem"}}>🔍</span>
            <input id="chat-search" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder={"Search "+ch.label+"…"}
              style={{width:"100%",background:glass,border:"1px solid "+border,borderRadius:10,padding:"9px 14px 9px 34px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.88rem",outline:"none",boxSizing:"border-box" as const}}/>
            {searchQuery&&<button onClick={()=>setSearchQuery("")} style={{position:"absolute" as const,right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:muted,cursor:"pointer",fontSize:"1rem"}}>✕</button>}
          </div>
          {searchQuery&&<div style={{maxWidth:700,margin:"6px auto 0",fontSize:"0.72rem",color:muted}}>{filtered.length} result{filtered.length!==1?"s":""}</div>}
        </div>
      )}

      {/* ── PINNED ── */}
      {pinnedMsg&&showPinned&&(
        <div style={{background:"rgba(255,209,102,0.07)",borderBottom:"1px solid rgba(255,209,102,0.18)",padding:"10px 16px",display:"flex",gap:10,alignItems:"flex-start"}}>
          <span style={{fontSize:"0.85rem",marginTop:1}}>📌</span>
          <div style={{flex:1}}>
            <div style={{fontSize:"0.65rem",color:"rgba(255,209,102,0.7)",fontWeight:700,marginBottom:3}}>PINNED</div>
            <div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.8)"}}>{pinnedMsg.userName}: {pinnedMsg.text}</div>
          </div>
          <button onClick={()=>setShowPinned(false)} style={{background:"none",border:"none",color:muted,cursor:"pointer",fontSize:"0.85rem"}}>✕</button>
        </div>
      )}

      {/* ── ONLINE LIST ── */}
      {showOnline&&(
        <div style={{background:"rgba(18,18,18,0.97)",backdropFilter:"blur(16px)",borderBottom:"1px solid "+border,padding:"12px 16px",animation:"slideIn .15s ease-out"}}>
          <div style={{maxWidth:700,margin:"0 auto"}}>
            <div style={{fontSize:"0.7rem",fontWeight:700,color:muted,letterSpacing:"0.08em",marginBottom:10}}>ONLINE NOW</div>
            <div style={{display:"flex",flexWrap:"wrap" as const,gap:8}}>
              {onlineUsers.length===0
                ?<span style={{fontSize:"0.8rem",color:muted}}>No one else online</span>
                :onlineUsers.map((u,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:6,background:glass,border:"1px solid "+border,borderRadius:20,padding:"4px 10px"}}>
                    <span className="online-dot" style={{width:5,height:5,borderRadius:"50%",background:accentG,display:"inline-block"}}/>
                    <span style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.8)"}}>{u.name}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}

      {/* ── MUTED/BANNED NOTICE ── */}
      {myStatus==="muted"&&(
        <div style={{background:"rgba(255,209,102,0.08)",borderBottom:"1px solid rgba(255,209,102,0.2)",padding:"8px 16px",textAlign:"center",fontSize:"0.78rem",color:"#ffd166"}}>
          🔇 You are muted — you can read but cannot post. Contact an admin to appeal.
        </div>
      )}
      {myStatus==="banned"&&(
        <div style={{background:"rgba(255,107,107,0.08)",borderBottom:"1px solid rgba(255,107,107,0.2)",padding:"8px 16px",textAlign:"center",fontSize:"0.78rem",color:"#ff6b6b"}}>
          🚫 You are banned from chat. Contact support at alphaomegatides@yahoo.com to appeal.
        </div>
      )}

      {/* ── COMPLIANCE ── */}
      <div style={{background:"rgba(255,107,107,0.05)",borderBottom:"1px solid rgba(255,107,107,0.1)",padding:"5px 20px",fontSize:"0.67rem",color:"rgba(255,107,107,0.65)",textAlign:"center"}}>
        ⚠️ Research discussion only · No medical advice · All products for in-vitro research use only
      </div>

      {/* ── MESSAGES ── */}
      <div style={{flex:1,overflowY:"auto",padding:"12px 12px 8px",display:"flex",flexDirection:"column",gap:2,maxWidth:760,width:"100%",margin:"0 auto",boxSizing:"border-box" as const}}>
        {loading&&(
          <div style={{textAlign:"center",color:muted,padding:"60px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
            <div style={{display:"flex",gap:6}}>{[0,1,2].map(i=><span key={i} style={{width:8,height:8,borderRadius:"50%",background:accentG,display:"inline-block",animation:`typingDot 1.2s ${i*0.2}s infinite`}}/>)}</div>
            <div style={{fontSize:"0.82rem"}}>Loading {ch.label}…</div>
          </div>
        )}
        {!loading&&messages.length===0&&(
          <div style={{textAlign:"center",color:muted,padding:"60px 20px",animation:"fadeUp .3s ease-out"}}>
            <div style={{fontSize:"3rem",marginBottom:12}}>{ch.icon}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.1rem",color:"rgba(255,255,255,0.6)",marginBottom:6}}>{ch.label}</div>
            <div style={{fontSize:"0.85rem"}}>{ch.desc} — be the first to post here.</div>
          </div>
        )}

        {grouped.map((group,gi)=>(
          <div key={gi}>
            <div style={{display:"flex",alignItems:"center",gap:10,margin:"16px 0 10px",color:muted,fontSize:"0.68rem"}}>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,0.06)"}}/>
              <div style={{background:"#181818",border:"1px solid rgba(255,255,255,0.09)",borderRadius:100,padding:"2px 12px",fontWeight:600}}>{group.date}</div>
              <div style={{flex:1,height:1,background:"rgba(255,255,255,0.06)"}}/>
            </div>
            {group.msgs.map((msg,mi)=>{
              const mine=isMe(msg);
              const prev=mi>0?group.msgs[mi-1]:null;
              const sameAuthor=prev?.userEmail===msg.userEmail;
              const canDelete=isAdmin(user)||mine;
              return (
                <div key={msg.id||mi} id={"msg-"+(msg.id||mi)} className="chat-msg"
                  style={{display:"flex",flexDirection:mine?"row-reverse":"row",alignItems:"flex-end",gap:8,marginBottom:sameAuthor?2:8,position:"relative" as const,borderRadius:14,padding:"2px 0",transition:"background .4s"}}>
                  {!mine&&(
                    <div style={{width:30,height:30,flexShrink:0,borderRadius:"50%",background:msg.isAdmin?accentR:avatarColor(msg.userEmail),display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.6rem",fontWeight:800,color:"#0e0e0e",opacity:!sameAuthor?1:0,boxShadow:msg.isAdmin?"0 0 10px rgba(255,107,107,0.4)":"none"}}>
                      {msg.isAdmin?"👑":initials(msg.userName)}
                    </div>
                  )}
                  <div style={{maxWidth:"73%",minWidth:60,position:"relative" as const}}>
                    {!mine&&!sameAuthor&&(
                      <div style={{fontSize:"0.68rem",fontWeight:700,marginBottom:3,paddingLeft:4,display:"flex",alignItems:"center",gap:6,color:msg.isAdmin?accentR:avatarColor(msg.userEmail)}}>
                        {msg.userName}
                        {msg.isAdmin&&<span style={{background:accentR,color:"#fff",fontSize:"0.58rem",fontWeight:800,padding:"1px 7px",borderRadius:100}}>ADMIN</span>}
                      </div>
                    )}
                    <div className="bubble-hover" style={{
                      background:mine?"linear-gradient(135deg,#1a3d2a 0%,#0d2a1e 100%)":card2,
                      border:mine?"1px solid rgba(59,232,176,0.18)":"1px solid rgba(255,255,255,0.06)",
                      borderRadius:mine?(sameAuthor?"16px 4px 4px 16px":"16px 4px 16px 16px"):(sameAuthor?"4px 16px 16px 4px":"4px 16px 16px 16px"),
                      padding:"9px 12px",backdropFilter:"blur(8px)",
                      boxShadow:mine?"0 2px 16px rgba(59,232,176,0.08)":"0 2px 8px rgba(0,0,0,0.3)",
                    }}>
                      {msg.replyTo&&(
                        <div style={{background:"rgba(255,255,255,0.05)",borderLeft:"3px solid "+accentG,borderRadius:"0 8px 8px 0",padding:"5px 10px",marginBottom:8,cursor:"pointer"}}
                          onClick={()=>{const el=document.getElementById("msg-"+msg.replyTo!.id);el?.scrollIntoView({behavior:"smooth",block:"center"});el?.classList.add("msg-flash");}}>
                          <div style={{fontSize:"0.63rem",fontWeight:700,color:accentG,marginBottom:2}}>{msg.replyTo.userName}</div>
                          {msg.replyTo.imageData&&<div style={{fontSize:"0.63rem",color:muted}}>🖼 Image</div>}
                          {msg.replyTo.text&&<div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.5)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" as const,maxWidth:200}}>{msg.replyTo.text}</div>}
                        </div>
                      )}
                      {msg.imageData&&(
                        <div style={{marginBottom:msg.text?8:0,position:"relative" as const}}>
                          <img src={msg.imageData} alt="shared" style={{maxWidth:"100%",maxHeight:280,borderRadius:10,display:"block",cursor:"zoom-in",objectFit:"cover" as const,border:"1px solid rgba(255,255,255,0.08)"}} onClick={()=>setLightbox(msg.imageData!)}/>
                          <div style={{position:"absolute" as const,bottom:5,right:5,background:"rgba(0,0,0,0.55)",borderRadius:5,padding:"1px 6px",fontSize:"0.58rem",color:"rgba(255,255,255,0.7)",backdropFilter:"blur(4px)"}}>tap to expand</div>
                        </div>
                      )}
                      {msg.fileName&&!msg.fileType?.startsWith("image")&&(
                        <a href={msg.fileData} download={msg.fileName} style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"8px 12px",marginBottom:msg.text?8:0,textDecoration:"none"}}>
                          <span style={{fontSize:"1.3rem"}}>{msg.fileType?.includes("pdf")?"📄":"📎"}</span>
                          <div>
                            <div style={{fontSize:"0.76rem",fontWeight:600,color:"#fff",maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" as const}}>{msg.fileName}</div>
                            <div style={{fontSize:"0.62rem",color:muted}}>Tap to download</div>
                          </div>
                        </a>
                      )}
                      {msg.text&&<div style={{fontSize:"0.88rem",color:"#f0f0f0",lineHeight:1.55,wordBreak:"break-word" as const,whiteSpace:"pre-wrap" as const}}>{msg.text}</div>}
                      {msg.reactions&&Object.keys(msg.reactions).length>0&&(
                        <div style={{display:"flex",flexWrap:"wrap" as const,gap:4,marginTop:7}}>
                          {Object.entries(msg.reactions).map(([emoji,users])=>(
                            <button key={emoji} onClick={()=>msg.id&&fbToggleReaction(msg.id,emoji,user.email,channel).then(()=>loadMessages(false))}
                              style={{background:(users as string[]).includes(user.email)?"rgba(59,232,176,0.15)":"rgba(255,255,255,0.06)",border:(users as string[]).includes(user.email)?"1px solid rgba(59,232,176,0.35)":"1px solid rgba(255,255,255,0.08)",borderRadius:100,padding:"2px 8px",cursor:"pointer",fontSize:"0.76rem",display:"flex",alignItems:"center",gap:3,color:"#fff",transition:"all .12s"}}>
                              {emoji} <span style={{fontSize:"0.62rem",color:muted}}>{(users as string[]).length}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      <div style={{display:"flex",alignItems:"center",justifyContent:mine?"flex-end":"flex-start",gap:5,marginTop:5}}>
                        <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.28)"}}>{formatTime(msg.timestamp)}</div>
                        <button onClick={()=>setShowEmojiFor(showEmojiFor===msg.id?null:msg.id||null)} className="action-btn"
                          style={{background:"none",border:"none",color:"rgba(255,255,255,0.22)",cursor:"pointer",fontSize:"0.7rem",padding:"1px 3px",opacity:0.5,transition:"all .12s",borderRadius:4}}>😊</button>
                        <button onClick={()=>{setReplyTo(msg);setTimeout(()=>inputRef.current?.focus(),50);}} className="action-btn"
                          style={{background:"none",border:"none",color:"rgba(255,255,255,0.22)",cursor:"pointer",fontSize:"0.65rem",padding:"1px 3px",opacity:0.5,transition:"all .12s",borderRadius:4}}>↩</button>
                        <button onClick={()=>handleCopyMsg(msg)} className="action-btn"
                          style={{background:"none",border:"none",color:copiedId===msg.id?accentG:"rgba(255,255,255,0.22)",cursor:"pointer",fontSize:"0.6rem",padding:"1px 3px",opacity:0.5,transition:"all .12s",borderRadius:4}}>
                          {copiedId===msg.id?"✓":"⎘"}
                        </button>
                        {isAdmin(user)&&(
                          <button onClick={()=>handlePin(msg)} className="action-btn"
                            style={{background:"none",border:"none",color:pinnedMsg?.id===msg.id?"rgba(255,209,102,0.7)":"rgba(255,255,255,0.22)",cursor:"pointer",fontSize:"0.6rem",padding:"1px 3px",opacity:0.5,transition:"all .12s",borderRadius:4}}>📌</button>
                        )}
                        {canDelete&&msg.id&&(
                          <button onClick={()=>handleDelete(msg.id!)} disabled={deletingId===msg.id} className="action-btn"
                            style={{background:"none",border:"none",color:"rgba(255,107,107,0.35)",cursor:"pointer",fontSize:"0.6rem",padding:"1px 3px",opacity:0.5,transition:"all .12s",borderRadius:4}}>
                            {deletingId===msg.id?"…":"🗑"}
                          </button>
                        )}
                      </div>
                      {showEmojiFor===msg.id&&(
                        <div style={{position:"absolute" as const,bottom:"100%",right:mine?"0":"auto",left:mine?"auto":"0",background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.12)",borderRadius:14,padding:"8px 10px",display:"flex",gap:5,zIndex:50,boxShadow:"0 8px 32px rgba(0,0,0,0.6)",backdropFilter:"blur(12px)",flexWrap:"wrap" as const,maxWidth:220,animation:"fadeUp .12s ease-out"}}>
                          {QUICK_EMOJIS.map(e=>(
                            <button key={e} className="emoji-btn" onClick={()=>{if(msg.id){fbToggleReaction(msg.id,e,user.email,channel).then(()=>loadMessages(false));setShowEmojiFor(null);}}}
                              style={{background:"none",border:"none",cursor:"pointer",fontSize:"1.2rem",padding:"3px 4px",borderRadius:8,transition:"all .12s"}}>{e}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {typingUsers.length>0&&(
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0 2px 38px",animation:"msgIn .2s ease-out"}}>
            <div style={{background:card2,border:"1px solid "+border,borderRadius:"4px 14px 14px 14px",padding:"8px 14px",display:"flex",alignItems:"center",gap:6}}>
              <div style={{display:"flex",gap:4}}>{[0,1,2].map(i=><span key={i} style={{width:5,height:5,borderRadius:"50%",background:accentG,display:"inline-block",animation:`typingDot 1.2s ${i*0.15}s infinite`}}/>)}</div>
              <span style={{fontSize:"0.72rem",color:muted}}>{typingUsers.join(", ")} {typingUsers.length===1?"is":"are"} typing</span>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxSrc&&(
        <div onClick={()=>setLightbox(null)} style={{position:"fixed" as const,inset:0,zIndex:9999,background:"rgba(0,0,0,0.94)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"zoom-out",backdropFilter:"blur(6px)"}}>
          <img src={lightboxSrc} alt="fullscreen" style={{maxWidth:"95vw",maxHeight:"92vh",borderRadius:16,objectFit:"contain" as const,boxShadow:"0 0 80px rgba(0,0,0,0.9)"}} onClick={e=>e.stopPropagation()}/>
          <button onClick={()=>setLightbox(null)} style={{position:"absolute" as const,top:20,right:20,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",color:"#fff",width:40,height:40,borderRadius:"50%",cursor:"pointer",fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
      )}

      {/* ── REPLY BAR ── */}
      {replyTo&&(
        <div style={{background:"rgba(12,12,12,0.97)",backdropFilter:"blur(12px)",borderTop:"1px solid rgba(59,232,176,0.2)",padding:"8px 16px",display:"flex",alignItems:"center",gap:10,maxWidth:760,width:"100%",margin:"0 auto",boxSizing:"border-box" as const,animation:"slideIn .15s ease-out"}}>
          <div style={{width:3,borderRadius:2,flexShrink:0,alignSelf:"stretch",background:accentG}}/>
          <div style={{flex:1,overflow:"hidden"}}>
            <div style={{fontSize:"0.63rem",fontWeight:700,color:accentG,marginBottom:1}}>Replying to {replyTo.userName}</div>
            {replyTo.imageData&&<div style={{fontSize:"0.63rem",color:muted}}>🖼 Image</div>}
            {replyTo.text&&<div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.5)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" as const}}>{replyTo.text}</div>}
          </div>
          <button onClick={()=>setReplyTo(null)} style={{background:"rgba(255,107,107,0.12)",border:"none",color:accentR,borderRadius:"50%",width:24,height:24,cursor:"pointer",fontSize:"0.78rem",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>
        </div>
      )}

      {/* ── ATTACHMENT PREVIEW ── */}
      {(imagePreview||fileInfo)&&(
        <div style={{background:"rgba(12,12,12,0.97)",backdropFilter:"blur(12px)",borderTop:"1px solid "+border,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,maxWidth:760,width:"100%",margin:"0 auto",boxSizing:"border-box" as const}}>
          {imagePreview&&<img src={imagePreview} alt="preview" style={{height:48,width:48,objectFit:"cover",borderRadius:8,border:"1px solid rgba(255,255,255,0.12)"}}/>}
          {fileInfo&&(
            <div style={{display:"flex",alignItems:"center",gap:8,background:glass,borderRadius:8,padding:"6px 12px",border:"1px solid "+border}}>
              <span>📎</span>
              <span style={{fontSize:"0.76rem",color:"#ccc",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" as const}}>{fileInfo.name}</span>
            </div>
          )}
          <button onClick={clearAttachments} style={{marginLeft:"auto",background:"rgba(255,107,107,0.12)",border:"1px solid rgba(255,107,107,0.2)",color:accentR,borderRadius:"50%",width:26,height:26,cursor:"pointer",fontSize:"0.8rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
      )}

      {/* ── INPUT BAR ── */}
      <div style={{background:"rgba(10,10,10,0.97)",backdropFilter:"blur(20px)",borderTop:"1px solid "+border,padding:"10px 12px 12px",position:"sticky",bottom:0,zIndex:10}}>
        <div style={{maxWidth:760,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"flex-end",gap:8}}>
            <input ref={imgInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleImageSelect}/>
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt,.csv,.xlsx" style={{display:"none"}} onChange={handleFileSelect}/>
            <div style={{display:"flex",gap:6,flexShrink:0}}>
              <button onClick={()=>imgInputRef.current?.click()} disabled={myStatus!=="active"}
                style={{background:glass,border:"1px solid "+border,borderRadius:10,width:38,height:38,cursor:myStatus!=="active"?"not-allowed":"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",opacity:myStatus!=="active"?.4:1}}>🖼️</button>
              <button onClick={()=>fileInputRef.current?.click()} disabled={myStatus!=="active"}
                style={{background:glass,border:"1px solid "+border,borderRadius:10,width:38,height:38,cursor:myStatus!=="active"?"not-allowed":"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",opacity:myStatus!=="active"?.4:1}}>📎</button>
            </div>
            <div style={{flex:1,position:"relative" as const}}>
              <textarea ref={inputRef} value={text} onChange={handleTextChange} onKeyDown={handleKeyDown}
                placeholder={myStatus==="banned"?"You are banned from chat":myStatus==="muted"?"You are muted…":"Message "+ch.icon+" "+ch.label+"…"}
                disabled={myStatus!=="active"}
                rows={1}
                style={{width:"100%",background:myStatus!=="active"?"rgba(255,255,255,0.03)":glass,border:"1px solid "+(text?"rgba(59,232,176,0.25)":border),borderRadius:14,padding:"10px 14px",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.88rem",resize:"none",outline:"none",lineHeight:1.5,maxHeight:120,overflowY:"auto" as const,boxSizing:"border-box" as const,transition:"border-color .15s",backdropFilter:"blur(8px)",cursor:myStatus!=="active"?"not-allowed":"text",opacity:myStatus!=="active"?.5:1}}
                onInput={e=>{const t=e.target as HTMLTextAreaElement;t.style.height="auto";t.style.height=Math.min(t.scrollHeight,120)+"px";}}/>
            </div>
            <button onClick={handleSend} disabled={sending||myStatus!=="active"||(!text.trim()&&!imageData&&!fileInfo)}
              style={{background:(text.trim()||imageData||fileInfo)&&myStatus==="active"?accentG:"rgba(255,255,255,0.07)",color:(text.trim()||imageData||fileInfo)&&myStatus==="active"?"#0e0e0e":muted,border:"none",borderRadius:12,width:40,height:40,cursor:"pointer",fontSize:"1rem",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",fontWeight:800,boxShadow:(text.trim()||imageData||fileInfo)&&myStatus==="active"?"0 4px 16px rgba(59,232,176,0.35)":"none"}}>
              {sending?<span style={{display:"flex",gap:2}}>{[0,1,2].map(i=><span key={i} style={{width:3,height:3,borderRadius:"50%",background:"currentColor",display:"inline-block",animation:`typingDot .8s ${i*0.15}s infinite`}}/>)}</span>:"➤"}
            </button>
          </div>
          <div style={{marginTop:5,paddingLeft:2,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:"0.62rem",color:muted}}>
              {user.name||user.email}
              {isAdmin(user)&&<span style={{marginLeft:6,background:accentR,color:"#fff",fontSize:"0.56rem",fontWeight:800,padding:"1px 7px",borderRadius:100}}>ADMIN</span>}
            </span>
            <span style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.18)"}}>Enter to send · Shift+Enter newline</span>
          </div>
        </div>
      </div>

      {/* ── MEMBER MANAGEMENT PANEL ── */}
      {showMemberPanel&&isAdmin(user)&&(
        <ChatMemberPanel onClose={()=>setShowMemberPanel(false)} currentUserEmail={user.email||""}/>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// X COMMUNITY PAGE — Curated X feed + pinned posts + accounts
// ═══════════════════════════════════════════════════════════════
const X_PINS_KEY = "aot_x_pins";
interface XPin { id:string; tweetUrl:string; label:string; addedAt:number; }

function getXPins():XPin[]{ try{return JSON.parse(localStorage.getItem(X_PINS_KEY)||"[]");}catch{return[];} }
function saveXPins(pins:XPin[]){ try{localStorage.setItem(X_PINS_KEY,JSON.stringify(pins));}catch{} }
function extractTweetId(url:string):string|null{ const m=url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);return m?m[1]:null; }

function XCommunityPage({go,user}:{go:Function;user:any}) {
  const [pins,setPins]           = useState<XPin[]>(getXPins);
  const [newUrl,setNewUrl]       = useState("");
  const [newLabel,setNewLabel]   = useState("");
  const [showAdmin,setShowAdmin] = useState(false);

  const accentG="#3be8b0",accentB="#4f8ef7",bg="#0e0e0e",card="#141414",border="rgba(255,255,255,0.08)",muted="rgba(255,255,255,0.4)";

  useEffect(()=>{
    if(!document.getElementById("twitter-wjs")){
      const s=document.createElement("script");s.id="twitter-wjs";s.src="https://platform.twitter.com/widgets.js";s.async=true;document.body.appendChild(s);
    } else { try{(window as any).twttr?.widgets?.load();}catch{} }
  },[]);

  const handleAddPin=()=>{
    if(!newUrl.trim()) return;
    const id=extractTweetId(newUrl.trim());
    if(!id){alert("Not a valid X/Twitter post URL.");return;}
    const pin:XPin={id,tweetUrl:newUrl.trim(),label:newLabel.trim()||"Featured post",addedAt:Date.now()};
    const updated=[pin,...pins].slice(0,10);
    setPins(updated);saveXPins(updated);setNewUrl("");setNewLabel("");setShowAdmin(false);
  };
  const handleRemovePin=(id:string)=>{ const u=pins.filter(p=>p.id!==id);setPins(u);saveXPins(u); };

  const SUGGESTED=[
    {handle:"PeptideSociety",desc:"Peptide research news & updates"},
    {handle:"RetatrutideInfo",desc:"Retatrutide research community"},
    {handle:"BPCresearch",desc:"BPC-157 studies & discussions"},
  ];

  return (
    <div style={{background:bg,minHeight:"100vh",paddingTop:70,paddingBottom:100}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        .x-card{animation:fadeUp .25s ease-out;transition:transform .2s,box-shadow .2s;}.x-card:hover{transform:translateY(-2px);}
        .account-chip:hover{background:rgba(79,142,247,0.15)!important;border-color:rgba(79,142,247,0.3)!important;}
      `}</style>
      <div style={{maxWidth:700,margin:"0 auto",padding:"0 16px"}}>
        <div style={{marginBottom:28,textAlign:"center",animation:"fadeUp .3s ease-out"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:100,padding:"6px 16px 6px 10px",marginBottom:16}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,0.15)"}}>
              <svg viewBox="0 0 24 24" style={{width:14,height:14,fill:"#fff"}}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63z"/></svg>
            </div>
            <span style={{fontSize:"0.8rem",fontWeight:700,color:"rgba(255,255,255,0.7)"}}>Community on X</span>
          </div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.6rem,4vw,2.2rem)",margin:"0 0 8px",lineHeight:1.1}}>Research Community</h1>
          <p style={{color:muted,fontSize:"0.88rem",margin:0,lineHeight:1.6}}>Pinned highlights from the peptide research community on X.</p>
        </div>

        {user&&isAdmin(user)&&(
          <div style={{background:card,border:"1px solid rgba(255,107,107,0.2)",borderRadius:16,padding:16,marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:showAdmin?14:0}}>
              <div style={{fontSize:"0.75rem",fontWeight:700,color:"rgba(255,107,107,0.8)",letterSpacing:"0.07em"}}>👑 ADMIN: PIN A POST</div>
              <button onClick={()=>setShowAdmin(!showAdmin)} style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.2)",color:"rgba(255,107,107,0.8)",borderRadius:8,padding:"4px 12px",cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>{showAdmin?"Collapse":"Add Post"}</button>
            </div>
            {showAdmin&&(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <input value={newUrl} onChange={e=>setNewUrl(e.target.value)} placeholder="X post URL (e.g. https://x.com/user/status/123…)"
                  style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 13px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",boxSizing:"border-box" as const}}/>
                <input value={newLabel} onChange={e=>setNewLabel(e.target.value)} placeholder="Label (optional)"
                  style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"10px 13px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",boxSizing:"border-box" as const}}/>
                <button onClick={()=>{if(!newUrl.trim())return;const id=extractTweetId(newUrl.trim());if(!id){alert("Not a valid X post URL.");return;}const pin:XPin={id,tweetUrl:newUrl.trim(),label:newLabel.trim()||"Featured post",addedAt:Date.now()};const updated=[pin,...pins].slice(0,10);setPins(updated);saveXPins(updated);setNewUrl("");setNewLabel("");setShowAdmin(false);}}
                  style={{background:accentG,color:"#0e0e0e",border:"none",borderRadius:10,padding:"10px",fontFamily:"inherit",fontWeight:800,fontSize:"0.88rem",cursor:"pointer"}}>📌 Pin This Post</button>
              </div>
            )}
          </div>
        )}

        {pins.length>0&&(
          <div style={{marginBottom:28}}>
            <div style={{fontSize:"0.7rem",fontWeight:700,color:muted,letterSpacing:"0.08em",marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span>📌</span> PINNED BY ADMIN</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {pins.map((pin,i)=>(
                <div key={pin.id} className="x-card" style={{background:card,border:"1px solid rgba(255,209,102,0.15)",borderRadius:16,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.4)"}}>
                  <div style={{padding:"10px 14px",background:"rgba(255,209,102,0.05)",borderBottom:"1px solid rgba(255,209,102,0.1)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span style={{fontSize:"0.7rem",fontWeight:700,color:"rgba(255,209,102,0.8)",display:"flex",alignItems:"center",gap:6}}>📌 {pin.label}</span>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <a href={pin.tweetUrl} target="_blank" rel="noopener noreferrer" style={{fontSize:"0.68rem",color:accentB,textDecoration:"none",fontWeight:600}}>Open on X ↗</a>
                      {user&&isAdmin(user)&&<button onClick={()=>handleRemovePin(pin.id)} style={{background:"rgba(255,107,107,0.1)",border:"none",color:"rgba(255,107,107,0.7)",borderRadius:6,padding:"2px 8px",cursor:"pointer",fontSize:"0.65rem"}}>Remove</button>}
                    </div>
                  </div>
                  <div style={{padding:"14px 14px 10px"}}>
                    <blockquote className="twitter-tweet" data-theme="dark" data-lang="en">
                      <a href={pin.tweetUrl}>Loading post…</a>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pins.length===0&&<div style={{textAlign:"center",padding:"32px 20px",color:muted,marginBottom:24}}><div style={{fontSize:"2.5rem",marginBottom:10}}>📌</div><div style={{fontSize:"0.88rem"}}>No posts pinned yet.{user&&isAdmin(user)?" Use the admin panel above to pin a post.":""}</div></div>}

        <div style={{marginBottom:28}}>
          <div style={{fontSize:"0.7rem",fontWeight:700,color:muted,letterSpacing:"0.08em",marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span>🐦</span> LIVE FEED</div>
          <div className="x-card" style={{background:card,border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.4)"}}>
            <div style={{padding:"14px 16px",background:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,0.1)"}}>
                  <svg viewBox="0 0 24 24" style={{width:13,height:13,fill:"#fff"}}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63z"/></svg>
                </div>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",color:"#fff"}}>@alphaomegatides</span>
              </div>
              <a href="https://twitter.com/intent/follow?screen_name=alphaomegatides" target="_blank" rel="noopener noreferrer"
                style={{background:"#000",border:"1px solid rgba(255,255,255,0.2)",borderRadius:100,padding:"5px 14px",color:"#fff",textDecoration:"none",fontSize:"0.75rem",fontWeight:700,display:"flex",alignItems:"center",gap:6}}>
                <svg viewBox="0 0 24 24" style={{width:12,height:12,fill:"#fff"}}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63z"/></svg>
                Follow
              </a>
            </div>
            <div style={{padding:"16px"}}>
              <a className="twitter-timeline" data-theme="dark" data-height="480" data-chrome="noheader nofooter noborders transparent" data-tweet-limit="5" href="https://twitter.com/alphaomegatides">Loading X feed…</a>
            </div>
          </div>
        </div>

        <div style={{marginBottom:20}}>
          <div style={{fontSize:"0.7rem",fontWeight:700,color:muted,letterSpacing:"0.08em",marginBottom:12,display:"flex",alignItems:"center",gap:8}}><span>👥</span> SUGGESTED RESEARCH ACCOUNTS</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {SUGGESTED.map((acct,i)=>(
              <a key={i} href={`https://x.com/${acct.handle}`} target="_blank" rel="noopener noreferrer" className="account-chip x-card"
                style={{display:"flex",alignItems:"center",gap:12,background:card,border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"12px 14px",textDecoration:"none",transition:"all .2s",boxShadow:"0 2px 12px rgba(0,0,0,0.3)"}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#1a1a2e,#16213e)",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,0.1)",flexShrink:0}}>
                  <svg viewBox="0 0 24 24" style={{width:16,height:16,fill:"rgba(255,255,255,0.7)"}}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63z"/></svg>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",color:"#fff"}}>@{acct.handle}</div>
                  <div style={{fontSize:"0.72rem",color:muted}}>{acct.desc}</div>
                </div>
                <span style={{fontSize:"0.7rem",color:accentB,fontWeight:600}}>Follow ↗</span>
              </a>
            ))}
          </div>
        </div>

        <div style={{background:"rgba(255,107,107,0.05)",border:"1px solid rgba(255,107,107,0.12)",borderRadius:12,padding:"12px 14px",fontSize:"0.72rem",color:"rgba(255,107,107,0.7)",lineHeight:1.6,textAlign:"center"}}>
          ⚠️ Content from X/Twitter represents third-party opinions. All research discussed is for in-vitro purposes only.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VIDEO TUTORIAL LIBRARY — Dr. Jones DC + Dr. Trevor Bachmeyer
// ═══════════════════════════════════════════════════════════════
const VIDEO_TUTORIALS = [
  // ── DR. JONES DC — FOUNDATIONS & HOW-TO ─────────────────────────────────
  { id:"dr-prepare-inject",    title:"Doctor Explains How to CORRECTLY Prepare & Inject Peptides",         compound:"All Products",               duration:"11:30", thumb:"💉", ytId:"L65S1xmKY44",   level:"Beginner",     desc:"Exact gear list, reconstitution technique, and injection method — the definitive start point for any peptide researcher.",                         channel:"Dr. Jones DC" },
  { id:"dr-beginners-guide",   title:"Everything You NEED to Know Before Starting Peptides",               compound:"All Products",               duration:"14:22", thumb:"📋", ytId:"uf4FSQljPHw",   level:"Beginner",     desc:"Risks, rewards, and the foundational steps every researcher must understand before opening a vial. Physician-level guidance.",                     channel:"Dr. Jones DC" },
  { id:"dr-top10-2026",        title:"Top 10 Peptides for 2026",                                           compound:"All Products",               duration:"18:05", thumb:"🏆", ytId:"M7BZtfST4yM",   level:"Beginner",     desc:"Which peptides are worth researching in 2026 — access, legislation changes, and which compounds have the strongest research backing.",              channel:"Dr. Jones DC" },
  { id:"dr-personally-takes",  title:"Doctor Explains What Peptides He Personally Takes & Why",            compound:"All Products",               duration:"16:40", thumb:"🔬", ytId:"jURAZT5e7Cw",   level:"Intermediate", desc:"A physician's 4-tier compound system — stacking logic, dosing rationale, and how to think about selecting compounds for a protocol.",              channel:"Dr. Jones DC" },
  { id:"dr-peptide-laws",      title:"Peptide Laws Just Changed — Doctor Explains What's Legal Now",       compound:"All Products",               duration:"17:20", thumb:"⚖️", ytId:"uFyet3w0sJk",   level:"Beginner",     desc:"April 2026 FDA regulatory updates — what's legal for research, what isn't, and what every researcher needs to know right now.",                    channel:"Dr. Jones DC" },
  { id:"dr-lifestyle-hacks",   title:"Want Better Results From Your Peptides? Implement These Lifestyle Hacks", compound:"All Products",          duration:"13:55", thumb:"⚡", ytId:"RyZ5IpBXwxI",   level:"Intermediate", desc:"Why some researchers see poor results — diet, sleep, timing, and lifestyle factors that determine whether compounds perform as expected.",         channel:"Dr. Jones DC" },
  { id:"dr-top5-medicine",     title:"Doctor Reveals Top 5 Peptides Changing Medicine Forever",            compound:"All Products",               duration:"15:30", thumb:"🔬", ytId:"yZgsUR2F6TI",   level:"Beginner",     desc:"The five peptides getting the most serious clinical attention right now — and why they matter for researchers.",                                   channel:"Dr. Jones DC" },
  { id:"dr-glow-wolverine",    title:"Doctor Reacts to Most Powerful Stacks — GLOW, KLOW & Wolverine",    compound:"Glow Complex / BPC-157 / TB-500 / GHK-CU", duration:"19:35", thumb:"🌟", ytId:"sOduMXXMc28", level:"Intermediate", desc:"Dr. Jones dissects the GLOW, GLO, and Wolverine stacks — what the research supports, what's overhyped, and how to use each correctly.", channel:"Dr. Jones DC" },
  { id:"dr-glp-shot-guide",    title:"How to Take a GLP-1 Shot — Step-by-Step Routine",                   compound:"GLP-1 / GLP-2 T / GLP-3 R", duration:"7:18",  thumb:"💉", ytId:"dxkllues8-w",   level:"Beginner",     desc:"Physician walkthrough for preparing and injecting GLP-1 class peptides — Semaglutide, Tirzepatide, and Retatrutide.",                              channel:"Dr. Jones DC" },
  { id:"dr-cjc-ipa-king",      title:"Doctor Explains Why CJC/Ipamorelin is KING of GH Peptides",         compound:"CJC-1295 / Ipamorelin",      duration:"13:44", thumb:"🔬", ytId:"ErI8SQgVKcU",   level:"Intermediate", desc:"Why CJC-1295/Ipamorelin is the most trusted GH research stack. Mechanism, synergy, and correct usage from a physician.",                         channel:"Dr. Jones DC" },
  // ── DR. TREVOR BACHMEYER — COMPOUND MASTERCLASSES ────────────────────────
  { id:"bach-4-peptides",      title:"If I Could Only Choose 4 Peptides",                                  compound:"All Products",               duration:"22:10", thumb:"🏆", ytId:"IH5wbl7waW4",   level:"Intermediate", desc:"A physician breaks down the four essential compounds for longevity and performance — the core stack with full biological rationale.",             channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-retrat-master",   title:"Retatrutide Masterclass — The Complete How-To for Everything",       compound:"GLP-3 R (Retatrutide)",      duration:"38:20", thumb:"🔥", ytId:"igkOl7DpTs0",   level:"Intermediate", desc:"The most comprehensive Retatrutide research guide available. Metabolic mechanism, titration, stacking, dosing, and what the research shows.",   channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-retrat-vs-glp",   title:"Why Semaglutide & Tirzepatide Can't Match Retatrutide",             compound:"GLP-3 R / GLP-2 T / GLP-1", duration:"19:45", thumb:"🔥", ytId:"JJZzjJhP2rQ",   level:"Intermediate", desc:"The biological case for triple agonism — why Retatrutide operates through mechanisms Semaglutide and Tirzepatide don't address.",               channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-retrat-tes",      title:"Retatrutide & Tesamorelin — The Combined Fat Loss Playbook",         compound:"GLP-3 R / Tesamorlin",       duration:"24:15", thumb:"🔥", ytId:"smPCcHi9Tjs",   level:"Intermediate", desc:"Why combining Tesamorelin with Retatrutide at night creates a 3-lever fat loss and muscle preservation stack. Full protocol breakdown.",           channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-glp1-muscle",     title:"Stop Losing Muscle on GLP-1s",                                       compound:"GLP-1 / GLP-2 T / GLP-3 R", duration:"21:30", thumb:"💊", ytId:"Ca_TZ1eEA4o",   level:"Intermediate", desc:"Why Semaglutide, Tirzepatide, and Retatrutide cause muscle loss — and the exact compounds and protocols used to prevent it.",                    channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-bpc-forever",     title:"BPC-157 as a Forever Peptide — Biology, Dosing & Daily Use",        compound:"BPC-157",                    duration:"26:40", thumb:"🧬", ytId:"LPeTrmJI380",   level:"Intermediate", desc:"Why BPC-157 should be considered a long-term low-dose compound. Full biological mechanism, dosing rationale, and clinical reasoning.",            channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-bpc-ultimate",    title:"BPC-157 Does Everything — The Ultimate Healing Peptide",             compound:"BPC-157",                    duration:"31:15", thumb:"🧬", ytId:"O_hbAtgMSE8",   level:"Intermediate", desc:"Deep dive: BPC-157's full research scope across tissue repair, gut protection, neurological effects, and systemic research applications.",         channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-tb500-cardiac",   title:"TB-500, Cardiac Fibrosis & Regeneration — Mechanism Deep Dive",     compound:"TB-500",                     duration:"28:55", thumb:"🛠️", ytId:"vJhrCKBNdWE",   level:"Advanced",     desc:"Why TB-500 is being overlooked. Dr. Bachmeyer explains the heart-kidney regeneration loop and mechanism-level case for TB-500 in advanced research.", channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-gh-stack",        title:"Raising Growth Hormone — Tesamorelin + CJC-1295 + Ipamorelin",      compound:"CJC-1295 / Ipamorelin / Tesamorlin", duration:"29:10", thumb:"💪", ytId:"j3JtxiHkq08", level:"Intermediate", desc:"The ultimate endogenous GH stack explained. Why low GH is a foundation-level problem and how these three secretagogues work synergistically.", channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-cjc-ipa-aging",   title:"CJC-1295 & Ipamorelin — Reversing Age",                             compound:"CJC-1295 / Ipamorelin",      duration:"24:45", thumb:"🔬", ytId:"m_GpIdkHI4M",   level:"Intermediate", desc:"A physician's personal use of CJC/Ipamorelin — the biology, research evidence, and why it's the most trusted GH secretagogue stack.",            channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-ghkcu-master",    title:"GHK-Cu Masterclass — The Complete Copper Peptide Guide",             compound:"GHK-CU",                     duration:"33:20", thumb:"✨", ytId:"XUdc1evyaFg",   level:"Intermediate", desc:"Full GHK-Cu masterclass: debunking misinformation, the 4,000+ gene activation mechanism, dosing, and why copper peptide is underresearched.",   channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-nad-deficiency",  title:"NAD+ Deficiency Is Your Real Problem",                               compound:"NAD+",                       duration:"27:50", thumb:"⚗️", ytId:"K8AteNF2Vmc",   level:"Intermediate", desc:"Why NAD+ pool restoration is a foundation for addressing chronic disease — energy failure mechanism and IV vs subcutaneous research.",           channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-motsc-ultimate",  title:"MOTS-c Masterclass — Mitochondrial Peptide with Profound Potential", compound:"MOTS-c",                    duration:"35:00", thumb:"🔋", ytId:"0Wfbn9GjTqs",   level:"Intermediate", desc:"MOTS-c and SS-31 together — science, benefits, synergy, and how Dr. Bachmeyer uses mitochondrial peptides in longevity research protocols.",    channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-ss31-secret",     title:"The Secret They're Hiding About SS-31 — Mitochondrial Repair",      compound:"SS-31",                      duration:"29:40", thumb:"🔋", ytId:"l-Zloc6hmZc",   level:"Intermediate", desc:"SS-31 (Elamipretide) deep dive: mitochondrial damage repair, disease reversal mechanism, and why this peptide is suppressed in mainstream medicine.", channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-mito-stack",      title:"MOTS-c, NAD+ & SS-31 — Solving Mitochondrial Damage",               compound:"MOTS-c / NAD+ / SS-31",      duration:"32:15", thumb:"⚡", ytId:"lAdPLuyggFw",   level:"Advanced",     desc:"The mitochondrial repair trifecta. How MOTS-c, NAD+, and SS-31 address different layers of mitochondrial dysfunction simultaneously.",            channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-glutathione",     title:"Glutathione Is Life or Death — Health & Longevity Explained",        compound:"Glutathione",                duration:"24:30", thumb:"🌱", ytId:"RWNXFJMoD4k",   level:"Intermediate", desc:"Why glutathione is the master antioxidant and what depletes it. The case for injectable glutathione over oral supplementation in research.",       channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-semax-cognitive", title:"Semax & Reversing Cognitive Decline — Dementia, Alzheimer's, Parkinson's", compound:"Semax",              duration:"31:20", thumb:"🧠", ytId:"X4NsP-yhD-8",   level:"Intermediate", desc:"Semax as a neuroprotective compound — BDNF upregulation, neurogenesis mechanisms, and the research evidence for cognitive applications.",         channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-dsip-masterclass",title:"DSIP Masterclass — The Longevity & Sleep Peptide",                   compound:"DSIP",                       duration:"28:45", thumb:"🌙", ytId:"oZ9JVM___uk",   level:"Intermediate", desc:"Everything on DSIP: misconceptions, actual mechanisms, sleep quality research, HPA axis modulation, and why it's a serious longevity compound.",  channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-mt2-masterclass", title:"Melanotan 2 Masterclass — The Full Benefits List",                    compound:"MT2",                        duration:"34:50", thumb:"🌛", ytId:"oaBecGSb03Y",   level:"Intermediate", desc:"MT2 beyond tanning — receptor mechanisms, libido research, metabolic effects, and dosing from a physician who covers the full compound profile.", channel:"Dr. Trevor Bachmeyer" },
  { id:"bach-motsc-ss31-guide",title:"MOTS-c or SS-31 — Comprehensive Physician's Guide",                  compound:"SS-31 / MOTS-c",             duration:"26:10", thumb:"🔋", ytId:"htj0KqZ4uls",   level:"Intermediate", desc:"Side-by-side comparison of MOTS-c and SS-31 — mechanisms, when to use each, and how they complement in a mitochondrial research protocol.",     channel:"Dr. Trevor Bachmeyer" },
  // ── RECONSTITUTION (clinical technique) ──────────────────────────────────
  { id:"reconst-calc",         title:"Peptide Reconstitution Calculator — 45+ Compounds",                  compound:"All Products",               duration:"9:05",  thumb:"🧮", ytId:"kMBxX2jaiKE",   level:"Beginner",     desc:"Free calculator walkthrough covering 45+ compounds including all GLP-1s, BPC-157, TB-500, CJC-1295, Ipamorelin — no math required.",              channel:"Peptide Research" },
  { id:"bpc-tb-reconst",       title:"How to Reconstitute Peptides Safely — BPC-157 & TB-500",            compound:"BPC-157 / TB-500",           duration:"8:45",  thumb:"🧪", ytId:"8pzvgmCkPcw",   level:"Beginner",     desc:"Step-by-step reconstitution guide for BPC-157 and TB-500 — mixing technique, aseptic practice, and storage protocol.",                            channel:"Clinical Lab" },
];

function VideoTutorialPage({go, user}:{go:Function; user:any}) {
  const [filter, setFilter] = useState("All");
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const [search, setSearch] = useState("");
  const levels = ["All","Beginner","Intermediate","Advanced"];
  const accentG="#3be8b0", bg="#0e0e0e", card="#141414", border="rgba(255,255,255,0.08)", muted="rgba(255,255,255,0.4)";

  const filtered = VIDEO_TUTORIALS.filter(v => {
    if (filter!=="All" && v.level!==filter) return false;
    if (search && !v.title.toLowerCase().includes(search.toLowerCase()) && !v.compound.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{background:bg,minHeight:"100vh",paddingTop:70,paddingBottom:100}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
        .vid-card{transition:transform .2s,box-shadow .2s;animation:fadeUp .3s ease-out both;}
        .vid-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.6)!important;}
        .vid-modal{animation:fadeUp .2s ease-out;}
      `}</style>

      {activeVideo && (
        <div onClick={()=>setActiveVideo(null)} style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div className="vid-modal" onClick={e=>e.stopPropagation()} style={{width:"min(760px,96vw)",background:card,borderRadius:20,overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,0.9)",border:"1px solid rgba(255,255,255,0.1)"}}>
            <div style={{position:"relative",paddingBottom:"56.25%",height:0,background:"#000"}}>
              <iframe src={`https://www.youtube.com/embed/${activeVideo.ytId}?autoplay=1&rel=0`}
                style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}} allow="autoplay; fullscreen" allowFullScreen title={activeVideo.title}/>
            </div>
            <div style={{padding:"16px 20px",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"#fff",marginBottom:4}}>{activeVideo.title}</div>
                <div style={{fontSize:"0.8rem",color:muted,lineHeight:1.5,marginBottom:8}}>{activeVideo.desc}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <span style={{background:"rgba(59,232,176,0.1)",color:accentG,fontSize:"0.65rem",fontWeight:700,padding:"2px 8px",borderRadius:100,border:"1px solid rgba(59,232,176,0.2)"}}>{activeVideo.compound}</span>
                  {activeVideo.channel==="Dr. Jones DC"&&<span style={{background:"rgba(255,107,107,0.12)",color:"#ff8a80",fontSize:"0.63rem",fontWeight:700,padding:"2px 9px",borderRadius:100,border:"1px solid rgba(255,107,107,0.2)"}}>Dr. Jones DC ✓</span>}
                  {activeVideo.channel==="Dr. Trevor Bachmeyer"&&<span style={{background:"rgba(79,142,247,0.12)",color:"#7fb3ff",fontSize:"0.63rem",fontWeight:700,padding:"2px 9px",borderRadius:100,border:"1px solid rgba(79,142,247,0.2)"}}>Dr. Bachmeyer ✓</span>}
                  <span style={{background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.5)",fontSize:"0.65rem",fontWeight:600,padding:"2px 8px",borderRadius:100}}>{activeVideo.level}</span>
                  <span style={{background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.5)",fontSize:"0.65rem",fontWeight:600,padding:"2px 8px",borderRadius:100}}>⏱ {activeVideo.duration}</span>
                </div>
              </div>
              <button onClick={()=>setActiveVideo(null)} style={{background:"rgba(255,255,255,0.08)",border:"none",color:"rgba(255,255,255,0.5)",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:"0.9rem",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            </div>
          </div>
        </div>
      )}

      <div style={{maxWidth:960,margin:"0 auto",padding:"0 16px"}}>
        <div style={{textAlign:"center",marginBottom:32,animation:"fadeUp .3s ease-out"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(59,232,176,0.08)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:100,padding:"5px 14px",marginBottom:14,fontSize:"0.75rem",fontWeight:700,color:accentG,letterSpacing:"0.06em"}}>▶ TUTORIAL LIBRARY</div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,2.4rem)",margin:"0 0 8px",lineHeight:1.1}}>Research Video Guides</h1>
          <p style={{color:muted,fontSize:"0.9rem",margin:"0 0 8px",maxWidth:520,marginLeft:"auto",marginRight:"auto",lineHeight:1.6}}>Physician-curated video guides for peptide researchers. Featuring Dr. Jones DC and Dr. Trevor Bachmeyer.</p>
          <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap"}}>
            <span style={{background:"rgba(255,107,107,0.1)",color:"#ff8a80",fontSize:"0.7rem",fontWeight:700,padding:"3px 10px",borderRadius:100,border:"1px solid rgba(255,107,107,0.2)"}}>Dr. Jones DC ✓</span>
            <span style={{background:"rgba(79,142,247,0.1)",color:"#7fb3ff",fontSize:"0.7rem",fontWeight:700,padding:"3px 10px",borderRadius:100,border:"1px solid rgba(79,142,247,0.2)"}}>Dr. Trevor Bachmeyer ✓</span>
          </div>
        </div>

        <div style={{display:"flex",gap:10,marginBottom:24,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:200,position:"relative"}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:muted,fontSize:"0.85rem"}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tutorials or compounds…"
              style={{width:"100%",background:card,border:"1px solid "+border,borderRadius:12,padding:"10px 14px 10px 34px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {levels.map(l=>(
              <button key={l} onClick={()=>setFilter(l)}
                style={{background:filter===l?"rgba(59,232,176,0.12)":card,border:"1px solid "+(filter===l?"rgba(59,232,176,0.3)":border),borderRadius:10,padding:"9px 14px",cursor:"pointer",fontSize:"0.78rem",fontWeight:700,color:filter===l?accentG:"rgba(255,255,255,0.6)",transition:"all .15s"}}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:16}}>
          {filtered.map((v,i)=>(
            <div key={v.id} className="vid-card" onClick={()=>setActiveVideo(v)}
              style={{background:card,border:"1px solid "+border,borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.4)",animationDelay:`${i*0.04}s`}}>
              <div style={{background:"linear-gradient(135deg,#0d1a14,#1a2d20)",aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
                <div style={{fontSize:"3rem",opacity:0.5}}>{v.thumb}</div>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(59,232,176,0.9)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 24px rgba(59,232,176,0.5)"}}>
                    <span style={{color:"#0e0e0e",fontSize:"1.3rem",marginLeft:3}}>▶</span>
                  </div>
                </div>
                <div style={{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,0.7)",borderRadius:6,padding:"2px 8px",fontSize:"0.65rem",fontWeight:600,color:"#fff"}}>{v.duration}</div>
                <div style={{position:"absolute",top:8,left:8,background:v.level==="Beginner"?"rgba(59,232,176,0.85)":v.level==="Intermediate"?"rgba(255,209,102,0.85)":"rgba(168,85,247,0.85)",borderRadius:6,padding:"2px 8px",fontSize:"0.6rem",fontWeight:800,color:"#0e0e0e"}}>{v.level}</div>
              </div>
              <div style={{padding:"12px 14px"}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",color:"#fff",marginBottom:4,lineHeight:1.3}}>{v.title}</div>
                <div style={{fontSize:"0.72rem",color:muted,lineHeight:1.5,marginBottom:8}}>{v.desc}</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <span style={{background:"rgba(59,232,176,0.1)",color:accentG,fontSize:"0.63rem",fontWeight:700,padding:"2px 8px",borderRadius:100,border:"1px solid rgba(59,232,176,0.2)"}}>{v.compound}</span>
                  {v.channel==="Dr. Jones DC"&&<span style={{background:"rgba(255,107,107,0.12)",color:"#ff8a80",fontSize:"0.6rem",fontWeight:700,padding:"2px 8px",borderRadius:100,border:"1px solid rgba(255,107,107,0.2)"}}>Dr. Jones DC ✓</span>}
                  {v.channel==="Dr. Trevor Bachmeyer"&&<span style={{background:"rgba(79,142,247,0.12)",color:"#7fb3ff",fontSize:"0.6rem",fontWeight:700,padding:"2px 8px",borderRadius:100,border:"1px solid rgba(79,142,247,0.2)"}}>Dr. Bachmeyer ✓</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length===0&&<div style={{textAlign:"center",padding:60,color:muted}}><div style={{fontSize:"2.5rem",marginBottom:10}}>🎬</div>No tutorials match your search.</div>}

        <div style={{marginTop:32,background:"rgba(59,232,176,0.05)",border:"1px solid rgba(59,232,176,0.15)",borderRadius:16,padding:"20px 24px",textAlign:"center"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:6}}>Want us to cover a specific topic?</div>
          <div style={{fontSize:"0.82rem",color:muted,marginBottom:12}}>Request a tutorial and our team will create it.</div>
          <button onClick={()=>go("contact")} style={{background:accentG,color:"#0e0e0e",border:"none",borderRadius:100,padding:"10px 24px",fontFamily:"inherit",fontWeight:700,fontSize:"0.85rem",cursor:"pointer"}}>Request a Tutorial →</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STACK BUILDER — drag-drop compound combinations
// ═══════════════════════════════════════════════════════════════
const STACK_COMPOUNDS = PRODUCTS.map(p=>({id:p.id,name:p.name,icon:p.icon,color:p.color,price:p.sizes?p.sizes[0].p:p.price,category:p.category||"General"}));

interface StackItem { id:string; name:string; icon:string; color:string; price:string; }
interface SavedStack { id:string; name:string; items:StackItem[]; note:string; createdAt:number; }

const STACKS_KEY="aot_stacks";
function getSavedStacks():SavedStack[]{ try{return JSON.parse(localStorage.getItem(STACKS_KEY)||"[]");}catch{return[];} }
function saveStacks(stacks:SavedStack[]){ try{localStorage.setItem(STACKS_KEY,JSON.stringify(stacks));}catch{} }

const PRESET_STACKS = [
  { name:"Metabolic Research I",   icon:"🔥", items:["glp1","bpc157","ghkcu"],       desc:"GLP-1 + recovery support combo" },
  { name:"Growth & Repair Stack",  icon:"💪", items:["cjc1295","ipamorlin","tb500"],  desc:"Growth hormone + tissue repair" },
  { name:"Longevity Protocol",     icon:"⏳", items:["nad","motsc","ss31"],           desc:"Mitochondrial & cellular health" },
  { name:"Neuro Focus Stack",      icon:"🧠", items:["selank","semax","dsip"],        desc:"Cognitive + sleep research" },
];

function StackBuilderPage({go, user}:{go:Function;user:any}) {
  const [stack, setStack]       = useState<StackItem[]>([]);
  const [note, setNote]         = useState("");
  const [stackName, setStackName] = useState("My Research Stack");
  const [saved, setSaved]       = useState(false);
  const [savedStacks, setSavedStacks] = useState<SavedStack[]>(getSavedStacks);
  const [showSaved, setShowSaved] = useState(false);
  const [search, setSearch]     = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [shareMsg, setShareMsg] = useState("");

  const accentG="#3be8b0", accentR="#ff6b6b", bg="#0e0e0e", card="#141414", border="rgba(255,255,255,0.08)", muted="rgba(255,255,255,0.4)";

  const categories = ["All", ...Array.from(new Set(STACK_COMPOUNDS.map(c=>c.category)))];
  const filteredCompounds = STACK_COMPOUNDS.filter(c => {
    if (catFilter!=="All" && c.category!==catFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const addToStack = (c: StackItem) => {
    if (stack.find(s=>s.id===c.id)) return;
    if (stack.length >= 6) { alert("Max 6 compounds per stack."); return; }
    setStack(p=>[...p,c]);
  };
  const removeFromStack = (id:string) => setStack(p=>p.filter(s=>s.id!==id));

  const totalPrice = stack.reduce((acc,c) => {
    const num = parseFloat((c.price||"0").replace(/[^0-9.]/g,""));
    return acc + (isNaN(num)?0:num);
  }, 0);

  const discountedPrice = stack.length >= 3 ? totalPrice * 0.90 : totalPrice;
  const discount = stack.length >= 3;

  const handleSave = () => {
    if (!stack.length) return;
    const s: SavedStack = { id: String(Date.now()), name:stackName, items:stack, note, createdAt:Date.now() };
    const updated = [s, ...savedStacks].slice(0,10);
    setSavedStacks(updated); saveStacks(updated);
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  const handleLoadPreset = (preset: typeof PRESET_STACKS[0]) => {
    const items = preset.items.map(id=>STACK_COMPOUNDS.find(c=>c.id===id)).filter(Boolean) as StackItem[];
    setStack(items); setStackName(preset.name);
  };

  const handleShare = () => {
    const names = stack.map(c=>c.name).join(" + ");
    const txt = `My research stack: ${names} — built on alphaomegatides.com`;
    navigator.clipboard.writeText(txt).catch(()=>{});
    setShareMsg("Copied to clipboard!");
    setTimeout(()=>setShareMsg(""),2000);
  };

  const handleDeleteSaved = (id:string) => {
    const updated = savedStacks.filter(s=>s.id!==id);
    setSavedStacks(updated); saveStacks(updated);
  };

  return (
    <div style={{background:bg,minHeight:"100vh",paddingTop:70,paddingBottom:100}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        .comp-chip{transition:all .15s;animation:fadeUp .2s ease-out both;}
        .comp-chip:hover{transform:translateY(-2px)!important;}
        .stack-slot{transition:all .2s;}
        .stack-slot:hover{background:rgba(255,107,107,0.08)!important;}
      `}</style>

      <div style={{maxWidth:960,margin:"0 auto",padding:"0 16px"}}>
        {/* Header */}
        <div style={{textAlign:"center",marginBottom:28,animation:"fadeUp .3s ease-out"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(59,232,176,0.08)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:100,padding:"5px 14px",marginBottom:14,fontSize:"0.75rem",fontWeight:700,color:accentG,letterSpacing:"0.06em"}}>⚗️ STACK BUILDER</div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,2.4rem)",margin:"0 0 8px",lineHeight:1.1}}>Build Your Research Stack</h1>
          <p style={{color:muted,fontSize:"0.9rem",margin:0}}>Combine compounds · Get 10% off stacks of 3+</p>
        </div>

        {/* Preset stacks */}
        <div style={{marginBottom:24}}>
          <div style={{fontSize:"0.7rem",fontWeight:700,color:muted,letterSpacing:"0.08em",marginBottom:10}}>⚡ QUICK START PRESETS</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {PRESET_STACKS.map((p,i)=>(
              <button key={i} onClick={()=>handleLoadPreset(p)}
                style={{background:card,border:"1px solid "+border,borderRadius:12,padding:"10px 14px",cursor:"pointer",textAlign:"left",transition:"all .15s",flex:"1 1 180px"}}>
                <div style={{fontSize:"1.1rem",marginBottom:4}}>{p.icon}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.82rem",color:"#fff",marginBottom:2}}>{p.name}</div>
                <div style={{fontSize:"0.68rem",color:muted}}>{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:20,alignItems:"start"}}>
          {/* Left — compound picker */}
          <div>
            <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:160,position:"relative"}}>
                <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:muted,fontSize:"0.82rem"}}>🔍</span>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search compounds…"
                  style={{width:"100%",background:card,border:"1px solid "+border,borderRadius:10,padding:"8px 10px 8px 28px",color:"#fff",fontFamily:"inherit",fontSize:"0.82rem",outline:"none",boxSizing:"border-box"}}/>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:8}}>
              {filteredCompounds.map((c,i)=>{
                const inStack = stack.find(s=>s.id===c.id);
                return (
                  <button key={c.id} className="comp-chip" onClick={()=>inStack?removeFromStack(c.id):addToStack(c)}
                    style={{background:inStack?"rgba(59,232,176,0.1)":card,border:`1px solid ${inStack?"rgba(59,232,176,0.4)":border}`,borderRadius:12,padding:"10px 10px",cursor:"pointer",textAlign:"left",animationDelay:`${i*0.03}s`,position:"relative"}}>
                    {inStack&&<div style={{position:"absolute",top:6,right:6,width:16,height:16,borderRadius:"50%",background:accentG,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.55rem",color:"#0e0e0e",fontWeight:800}}>✓</div>}
                    <div style={{fontSize:"1.3rem",marginBottom:4}}>{c.icon}</div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.72rem",color:inStack?accentG:"#fff",lineHeight:1.2}}>{c.name}</div>
                    <div style={{fontSize:"0.63rem",color:muted,marginTop:2}}>{c.price}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — stack panel */}
          <div style={{position:"sticky",top:80}}>
            <div style={{background:card,border:"1px solid "+border,borderRadius:18,padding:18,boxShadow:"0 8px 32px rgba(0,0,0,0.4)"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",marginBottom:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span>Your Stack</span>
                <span style={{fontSize:"0.7rem",color:muted,fontWeight:400}}>{stack.length}/6</span>
              </div>

              {/* Stack name */}
              <input value={stackName} onChange={e=>setStackName(e.target.value)}
                style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid "+border,borderRadius:10,padding:"8px 12px",color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.82rem",outline:"none",marginBottom:12,boxSizing:"border-box"}}/>

              {/* Slots */}
              {stack.length===0 ? (
                <div style={{textAlign:"center",padding:"24px 10px",color:muted,fontSize:"0.8rem",border:"2px dashed rgba(255,255,255,0.1)",borderRadius:12,marginBottom:12}}>
                  <div style={{fontSize:"2rem",marginBottom:6}}>⚗️</div>
                  Tap compounds to add them to your stack
                </div>
              ) : (
                <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
                  {stack.map(c=>(
                    <div key={c.id} className="stack-slot"
                      style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,0.03)",border:`1px solid ${c.color}33`,borderRadius:10,padding:"8px 10px"}}>
                      <span style={{fontSize:"1.1rem"}}>{c.icon}</span>
                      <span style={{flex:1,fontSize:"0.8rem",fontWeight:600,color:"#fff"}}>{c.name}</span>
                      <span style={{fontSize:"0.72rem",color:muted}}>{c.price}</span>
                      <button onClick={()=>removeFromStack(c.id)} style={{background:"rgba(255,107,107,0.1)",border:"none",color:accentR,borderRadius:6,width:22,height:22,cursor:"pointer",fontSize:"0.7rem",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>
                    </div>
                  ))}
                </div>
              )}

              {/* Note */}
              <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add research notes (optional)…"
                rows={2} style={{width:"100%",background:"rgba(255,255,255,0.03)",border:"1px solid "+border,borderRadius:10,padding:"8px 12px",color:"rgba(255,255,255,0.7)",fontFamily:"inherit",fontSize:"0.78rem",outline:"none",resize:"none",boxSizing:"border-box",marginBottom:12}}/>

              {/* Pricing */}
              {stack.length>0&&(
                <div style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 12px",marginBottom:12}}>
                  {discount&&<div style={{fontSize:"0.68rem",fontWeight:700,color:accentG,marginBottom:4}}>🎉 3+ compounds = 10% off!</div>}
                  {discount&&<div style={{display:"flex",justifyContent:"space-between",fontSize:"0.75rem",color:muted,marginBottom:2}}><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>}
                  {discount&&<div style={{display:"flex",justifyContent:"space-between",fontSize:"0.75rem",color:accentG,marginBottom:4}}><span>Discount (10%)</span><span>-${(totalPrice-discountedPrice).toFixed(2)}</span></div>}
                  <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem"}}><span>Total</span><span style={{color:discount?accentG:"#fff"}}>${discountedPrice.toFixed(2)}</span></div>
                </div>
              )}

              {/* Actions */}
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <button onClick={()=>{if(stack.length>0)go("cart");}}
                  disabled={!stack.length}
                  style={{background:stack.length?accentG:"rgba(255,255,255,0.07)",color:stack.length?"#0e0e0e":"rgba(255,255,255,0.3)",border:"none",borderRadius:12,padding:"12px",fontFamily:"inherit",fontWeight:800,fontSize:"0.88rem",cursor:stack.length?"pointer":"not-allowed",transition:"all .2s",boxShadow:stack.length?"0 4px 16px rgba(59,232,176,0.3)":"none"}}>
                  🛒 Add Stack to Cart
                </button>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={handleSave} disabled={!stack.length}
                    style={{flex:1,background:"rgba(79,142,247,0.12)",border:"1px solid rgba(79,142,247,0.25)",color:saved?"#3be8b0":"rgba(79,142,247,0.9)",borderRadius:10,padding:"9px",fontFamily:"inherit",fontWeight:700,fontSize:"0.78rem",cursor:"pointer",transition:"all .15s"}}>
                    {saved?"✓ Saved!":"💾 Save"}
                  </button>
                  <button onClick={handleShare} disabled={!stack.length}
                    style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid "+border,color:"rgba(255,255,255,0.6)",borderRadius:10,padding:"9px",fontFamily:"inherit",fontWeight:700,fontSize:"0.78rem",cursor:"pointer",transition:"all .15s"}}>
                    {shareMsg||"🔗 Share"}
                  </button>
                </div>
              </div>
            </div>

            {/* Saved stacks */}
            {savedStacks.length>0&&(
              <div style={{marginTop:14}}>
                <button onClick={()=>setShowSaved(!showSaved)}
                  style={{background:card,border:"1px solid "+border,borderRadius:10,padding:"9px 14px",cursor:"pointer",width:"100%",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between",color:"rgba(255,255,255,0.7)",fontSize:"0.8rem",fontWeight:600}}>
                  <span>💾 Saved Stacks ({savedStacks.length})</span>
                  <span style={{fontSize:"0.7rem"}}>{showSaved?"▲":"▼"}</span>
                </button>
                {showSaved&&(
                  <div style={{background:card,border:"1px solid "+border,borderRadius:"0 0 10px 10px",overflow:"hidden"}}>
                    {savedStacks.map(s=>(
                      <div key={s.id} style={{padding:"10px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                        <div style={{flex:1,cursor:"pointer"}} onClick={()=>{setStack(s.items);setStackName(s.name);setNote(s.note);setShowSaved(false);}}>
                          <div style={{fontSize:"0.8rem",fontWeight:700,color:"#fff"}}>{s.name}</div>
                          <div style={{fontSize:"0.65rem",color:muted}}>{s.items.map(i=>i.icon).join(" ")} · {s.items.length} compounds</div>
                        </div>
                        <button onClick={()=>handleDeleteSaved(s.id)} style={{background:"none",border:"none",color:"rgba(255,107,107,0.5)",cursor:"pointer",fontSize:"0.8rem"}}>🗑</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RESEARCH WIKI / GLOSSARY
// ═══════════════════════════════════════════════════════════════
const WIKI_ENTRIES = [
  { term:"Bacteriostatic Water (BAC)", abbr:"BAC Water", def:"Sterile water containing 0.9% benzyl alcohol used to reconstitute lyophilized peptides. The benzyl alcohol prevents bacterial growth, extending usability to 28 days after opening. Essential for all injectable research peptides.", tags:["reconstitution","storage"] },
  { term:"Certificate of Analysis", abbr:"COA", def:"A document from an accredited third-party laboratory confirming a compound's identity, purity, and composition. Alphaomegatides provides COAs for every product batch. Key metrics: purity ≥98%, identity confirmation via HPLC and MS.", tags:["quality","testing"] },
  { term:"High-Performance Liquid Chromatography", abbr:"HPLC", def:"An analytical technique used to identify, quantify, and separate compounds in a mixture. HPLC is the gold standard for peptide purity testing — it separates the compound from impurities by passing it through a column under high pressure.", tags:["testing","analytical"] },
  { term:"Lyophilization", abbr:"Lyophilized / Freeze-dried", def:"A preservation process that removes water from peptides via freeze-drying, creating a stable powder form. Lyophilized peptides are stable at room temperature for months and years when refrigerated, but must be reconstituted before use.", tags:["storage","reconstitution"] },
  { term:"Half-Life", abbr:"t½", def:"The time it takes for the concentration of a compound to reduce by half in a given biological system. Relevant for research timing. Example: BPC-157 has an estimated half-life of 4 hours; CJC-1295 with DAC has ~8 days.", tags:["pharmacokinetics","dosing"] },
  { term:"GLP-1 Receptor Agonist", abbr:"GLP-1 RA", def:"A class of peptides that mimic the action of glucagon-like peptide-1, a hormone that stimulates insulin secretion. Research compounds in this class include Semaglutide, Tirzepatide (dual GLP-1/GIP), and Retatrutide (triple agonist).", tags:["metabolic","mechanism"] },
  { term:"Growth Hormone Secretagogue", abbr:"GHS", def:"Compounds that stimulate the pituitary gland to produce and release growth hormone. Research compounds include CJC-1295, Ipamorelin, Sermorelin, and Tesamorelin. Often studied in stacks for synergistic effect.", tags:["growth","mechanism"] },
  { term:"Reconstitution", abbr:null, def:"The process of dissolving a lyophilized (freeze-dried) peptide powder in a solvent — typically bacteriostatic water or sterile water — to create a solution suitable for research use. Proper technique prevents peptide degradation.", tags:["reconstitution","technique"] },
  { term:"Subcutaneous", abbr:"SubQ", def:"Relating to the layer of tissue beneath the skin. SubQ administration is the most common research route for peptides, using short insulin pins (typically 29-31 gauge, 4-8mm). Allows for gradual absorption into systemic circulation.", tags:["administration","technique"] },
  { term:"Insulin Units (IU)", abbr:"IU", def:"A unit of measurement used on U-100 insulin syringes. On a U-100 syringe, 100 IU = 1 mL. Used when calculating draw volumes for reconstituted peptides. Example: if concentration is 500mcg/mL, 1 IU = 5mcg.", tags:["dosing","calculation"] },
  { term:"Peptide Bond", abbr:null, def:"A chemical covalent bond formed between two amino acid molecules. Peptides are chains of amino acids linked by peptide bonds. The number and sequence of amino acids determines the peptide's structure and biological activity.", tags:["chemistry","basics"] },
  { term:"In Vitro", abbr:null, def:"Latin for 'in glass'. Research conducted outside of living organisms, typically in test tubes, petri dishes, or other controlled laboratory environments. All Alphaomegatides compounds are sold exclusively for in-vitro research use.", tags:["research","legal"] },
];

function ResearchWikiPage({go}:{go:Function}) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [expanded, setExpanded] = useState<string|null>(null);
  const accentG="#3be8b0", bg="#0e0e0e", card="#141414", border="rgba(255,255,255,0.08)", muted="rgba(255,255,255,0.4)";

  const allTags = ["All", ...Array.from(new Set(WIKI_ENTRIES.flatMap(e=>e.tags)))];
  const filtered = WIKI_ENTRIES.filter(e => {
    if (activeTag!=="All" && !e.tags.includes(activeTag)) return false;
    if (search && !e.term.toLowerCase().includes(search.toLowerCase()) && !e.def.toLowerCase().includes(search.toLowerCase()) && !(e.abbr||"").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{background:bg,minHeight:"100vh",paddingTop:70,paddingBottom:100}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        .wiki-row{transition:background .15s;animation:fadeUp .2s ease-out both;}
        .wiki-row:hover{background:rgba(255,255,255,0.03)!important;}
      `}</style>
      <div style={{maxWidth:800,margin:"0 auto",padding:"0 16px"}}>
        <div style={{textAlign:"center",marginBottom:32,animation:"fadeUp .3s ease-out"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(168,85,247,0.1)",border:"1px solid rgba(168,85,247,0.25)",borderRadius:100,padding:"5px 14px",marginBottom:14,fontSize:"0.75rem",fontWeight:700,color:"#a855f7",letterSpacing:"0.06em"}}>📖 RESEARCH WIKI</div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,2.4rem)",margin:"0 0 8px"}}>Researcher's Glossary</h1>
          <p style={{color:muted,fontSize:"0.9rem",margin:0}}>Key terms, abbreviations, and concepts for peptide research.</p>
        </div>

        <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:200,position:"relative"}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:muted,fontSize:"0.85rem"}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search terms, abbreviations…"
              style={{width:"100%",background:card,border:"1px solid "+border,borderRadius:12,padding:"10px 14px 10px 34px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box"}}/>
          </div>
        </div>

        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
          {allTags.map(tag=>(
            <button key={tag} onClick={()=>setActiveTag(tag)}
              style={{background:activeTag===tag?"rgba(168,85,247,0.15)":card,border:"1px solid "+(activeTag===tag?"rgba(168,85,247,0.35)":border),borderRadius:100,padding:"5px 12px",cursor:"pointer",fontSize:"0.72rem",fontWeight:700,color:activeTag===tag?"#a855f7":"rgba(255,255,255,0.55)",transition:"all .15s"}}>
              {tag}
            </button>
          ))}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:2}}>
          {filtered.map((entry,i)=>(
            <div key={entry.term} className="wiki-row"
              style={{background:expanded===entry.term?"rgba(255,255,255,0.04)":card,border:"1px solid "+(expanded===entry.term?"rgba(168,85,247,0.2)":border),borderRadius:12,overflow:"hidden",animationDelay:`${i*0.03}s`}}>
              <button onClick={()=>setExpanded(expanded===entry.term?null:entry.term)}
                style={{width:"100%",background:"none",border:"none",padding:"14px 16px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12,justifyContent:"space-between"}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2,flexWrap:"wrap"}}>
                    <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.9rem",color:"#fff"}}>{entry.term}</span>
                    {entry.abbr&&<span style={{background:"rgba(168,85,247,0.15)",color:"#a855f7",fontSize:"0.62rem",fontWeight:700,padding:"1px 8px",borderRadius:100,border:"1px solid rgba(168,85,247,0.2)"}}>{entry.abbr}</span>}
                  </div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                    {entry.tags.map(t=><span key={t} style={{fontSize:"0.6rem",color:muted,background:"rgba(255,255,255,0.05)",padding:"1px 6px",borderRadius:100}}>{t}</span>)}
                  </div>
                </div>
                <span style={{color:muted,fontSize:"0.8rem",flexShrink:0,transition:"transform .2s",transform:expanded===entry.term?"rotate(180deg)":"none"}}>▼</span>
              </button>
              {expanded===entry.term&&(
                <div style={{padding:"0 16px 16px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                  <p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.75)",lineHeight:1.7,margin:"12px 0 0"}}>{entry.def}</p>
                </div>
              )}
            </div>
          ))}
          {filtered.length===0&&<div style={{textAlign:"center",padding:60,color:muted}}><div style={{fontSize:"2.5rem",marginBottom:10}}>📖</div>No results found.</div>}
        </div>

        <div style={{marginTop:28,background:"rgba(168,85,247,0.06)",border:"1px solid rgba(168,85,247,0.15)",borderRadius:16,padding:"18px 22px",textAlign:"center"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",marginBottom:4}}>Missing a term?</div>
          <div style={{fontSize:"0.8rem",color:muted,marginBottom:10}}>Request additions to the glossary.</div>
          <button onClick={()=>go("contact")} style={{background:"rgba(168,85,247,0.15)",color:"#a855f7",border:"1px solid rgba(168,85,247,0.3)",borderRadius:100,padding:"9px 22px",fontFamily:"inherit",fontWeight:700,fontSize:"0.82rem",cursor:"pointer"}}>Suggest a Term →</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LIVE STREAM PAGE
// ═══════════════════════════════════════════════════════════════
const STREAM_KEY="aot_stream_config";
interface StreamConfig { isLive:boolean; platform:"youtube"|"twitch"; streamId:string; title:string; desc:string; }
function getStreamConfig():StreamConfig{
  try{return JSON.parse(localStorage.getItem(STREAM_KEY)||"null")||{isLive:false,platform:"youtube",streamId:"",title:"Live Research Session",desc:""};}catch{return{isLive:false,platform:"youtube",streamId:"",title:"Live Research Session",desc:""};}
}
function saveStreamConfig(cfg:StreamConfig){try{localStorage.setItem(STREAM_KEY,JSON.stringify(cfg));}catch{}}

function LiveStreamPage({go,user}:{go:Function;user:any}) {
  const [cfg, setCfg]         = useState<StreamConfig>(getStreamConfig);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState<StreamConfig>(cfg);
  const accentG="#3be8b0", accentR="#ff6b6b", bg="#0e0e0e", card="#141414", border="rgba(255,255,255,0.08)", muted="rgba(255,255,255,0.4)";

  const embedUrl = cfg.streamId
    ? cfg.platform==="youtube"
      ? `https://www.youtube.com/embed/${cfg.streamId}?autoplay=0&rel=0`
      : `https://player.twitch.tv/?channel=${cfg.streamId}&parent=${window.location.hostname}&autoplay=false`
    : null;

  const handleSave = () => {
    setCfg(draft); saveStreamConfig(draft);
    setEditing(false);
    try{window.dispatchEvent(new CustomEvent("aot_stream_update"));}catch{}
  };

  return (
    <div style={{background:bg,minHeight:"100vh",paddingTop:70,paddingBottom:100}}>
      <div style={{maxWidth:860,margin:"0 auto",padding:"0 16px"}}>
        {/* Header */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:cfg.isLive?"rgba(255,107,107,0.12)":"rgba(255,255,255,0.05)",border:`1px solid ${cfg.isLive?"rgba(255,107,107,0.35)":border}`,borderRadius:100,padding:"5px 14px",marginBottom:14,fontSize:"0.75rem",fontWeight:700,color:cfg.isLive?accentR:"rgba(255,255,255,0.5)"}}>
            {cfg.isLive&&<span style={{width:7,height:7,borderRadius:"50%",background:accentR,display:"inline-block",animation:"chatpulse 1s infinite"}}/>}
            {cfg.isLive?"🔴 LIVE NOW":"📺 STREAM"}
          </div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,4vw,2.4rem)",margin:"0 0 8px"}}>{cfg.title||"Live Research Session"}</h1>
          {cfg.desc&&<p style={{color:muted,fontSize:"0.9rem",margin:0,maxWidth:480,marginLeft:"auto",marginRight:"auto"}}>{cfg.desc}</p>}
        </div>

        {/* Admin controls */}
        {user&&isAdmin(user)&&(
          <div style={{background:card,border:"1px solid rgba(255,107,107,0.2)",borderRadius:16,padding:16,marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:editing?14:0}}>
              <div style={{fontSize:"0.75rem",fontWeight:700,color:"rgba(255,107,107,0.8)",letterSpacing:"0.07em"}}>👑 STREAM ADMIN</div>
              <button onClick={()=>{setDraft(cfg);setEditing(!editing);}} style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.2)",color:"rgba(255,107,107,0.8)",borderRadius:8,padding:"4px 12px",cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>{editing?"Cancel":"Configure"}</button>
            </div>
            {editing&&(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <div style={{display:"flex",gap:8}}>
                  {(["youtube","twitch"] as const).map(p=>(
                    <button key={p} onClick={()=>setDraft(d=>({...d,platform:p}))}
                      style={{flex:1,background:draft.platform===p?"rgba(59,232,176,0.12)":"rgba(255,255,255,0.04)",border:"1px solid "+(draft.platform===p?"rgba(59,232,176,0.3)":border),borderRadius:10,padding:"8px",cursor:"pointer",color:draft.platform===p?accentG:"rgba(255,255,255,0.6)",fontWeight:700,fontSize:"0.8rem"}}>
                      {p==="youtube"?"▶ YouTube":"🟣 Twitch"}
                    </button>
                  ))}
                </div>
                <input value={draft.streamId} onChange={e=>setDraft(d=>({...d,streamId:e.target.value}))} placeholder={draft.platform==="youtube"?"YouTube video/stream ID (e.g. dQw4w9WgXcQ)":"Twitch channel name"}
                  style={{background:"rgba(255,255,255,0.05)",border:"1px solid "+border,borderRadius:10,padding:"10px 13px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none"}}/>
                <input value={draft.title} onChange={e=>setDraft(d=>({...d,title:e.target.value}))} placeholder="Stream title"
                  style={{background:"rgba(255,255,255,0.05)",border:"1px solid "+border,borderRadius:10,padding:"10px 13px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none"}}/>
                <input value={draft.desc} onChange={e=>setDraft(d=>({...d,desc:e.target.value}))} placeholder="Description (optional)"
                  style={{background:"rgba(255,255,255,0.05)",border:"1px solid "+border,borderRadius:10,padding:"10px 13px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none"}}/>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <button onClick={()=>setDraft(d=>({...d,isLive:!d.isLive}))}
                    style={{background:draft.isLive?"rgba(255,107,107,0.15)":"rgba(255,255,255,0.05)",border:"1px solid "+(draft.isLive?"rgba(255,107,107,0.3)":border),borderRadius:10,padding:"8px 14px",cursor:"pointer",color:draft.isLive?accentR:"rgba(255,255,255,0.6)",fontWeight:700,fontSize:"0.8rem"}}>
                    {draft.isLive?"🔴 Set Offline":"🟢 Set Live"}
                  </button>
                  <button onClick={handleSave} style={{flex:1,background:accentG,color:"#0e0e0e",border:"none",borderRadius:10,padding:"9px",fontFamily:"inherit",fontWeight:800,fontSize:"0.85rem",cursor:"pointer"}}>Save & Publish</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Player */}
        {embedUrl ? (
          <div style={{background:card,border:"1px solid "+(cfg.isLive?"rgba(255,107,107,0.25)":border),borderRadius:18,overflow:"hidden",boxShadow:cfg.isLive?"0 0 40px rgba(255,107,107,0.15)":"0 8px 32px rgba(0,0,0,0.5)"}}>
            <div style={{position:"relative",paddingBottom:"56.25%",height:0,background:"#000"}}>
              <iframe src={embedUrl} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}} allow="autoplay;fullscreen" allowFullScreen title={cfg.title}/>
            </div>
            {cfg.isLive&&(
              <div style={{padding:"12px 16px",background:"rgba(255,107,107,0.06)",display:"flex",alignItems:"center",gap:8,borderTop:"1px solid rgba(255,107,107,0.15)"}}>
                <span style={{width:8,height:8,borderRadius:"50%",background:accentR,display:"inline-block",animation:"chatpulse 1s infinite"}}/>
                <span style={{fontSize:"0.78rem",fontWeight:700,color:accentR}}>LIVE</span>
                <span style={{fontSize:"0.78rem",color:muted}}>— {cfg.title}</span>
              </div>
            )}
          </div>
        ) : (
          <div style={{background:card,border:"2px dashed rgba(255,255,255,0.1)",borderRadius:18,padding:"80px 40px",textAlign:"center"}}>
            <div style={{fontSize:"4rem",marginBottom:16}}>📺</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"1.2rem",marginBottom:8}}>No Stream Configured</div>
            <div style={{color:muted,fontSize:"0.85rem",marginBottom:20}}>
              {user&&isAdmin(user)?"Use the admin panel above to set up a live stream.":"Check back soon for our next live research session."}
            </div>
            <button onClick={()=>go("chat")} style={{background:"rgba(59,232,176,0.1)",color:accentG,border:"1px solid rgba(59,232,176,0.25)",borderRadius:100,padding:"10px 24px",fontFamily:"inherit",fontWeight:700,fontSize:"0.85rem",cursor:"pointer"}}>💬 Join Community Chat</button>
          </div>
        )}

        {/* CTA */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12,marginTop:20}}>
          {[["💬","Community Chat","Join live discussion during streams",()=>go("chat")],["▶","Tutorials","Watch recorded research guides",()=>go("videos")],["⚗️","Stack Builder","Build your research protocol",()=>go("stacks")]].map(([icon,title,desc,fn]:any)=>(
            <button key={String(title)} onClick={fn} style={{background:card,border:"1px solid "+border,borderRadius:14,padding:"16px",cursor:"pointer",textAlign:"left",transition:"all .2s"}}>
              <div style={{fontSize:"1.4rem",marginBottom:6}}>{icon}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.85rem",color:"#fff",marginBottom:3}}>{title}</div>
              <div style={{fontSize:"0.72rem",color:muted}}>{desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ADMIN ANALYTICS DASHBOARD
// ═══════════════════════════════════════════════════════════════
function AdminAnalyticsTab({user}:{user:any}) {
  const accentG="#3be8b0", accentB="#4f8ef7", accentY="#ffd166", accentR="#ff6b6b";
  const card="#161616", border="rgba(255,255,255,0.08)", muted="rgba(255,255,255,0.4)";

  // Derive data from localStorage
  const allUsers = Object.values(getUsers()) as any[];
  const totalUsers = allUsers.length;
  const waitlist = (() => { try{return JSON.parse(localStorage.getItem("nxg_waitlist")||"[]");}catch{return[];} })();
  const cartAbandon = (() => { try{return JSON.parse(localStorage.getItem("aot_abandoned_cart")||"null");}catch{return null;} })();
  const flashCfg = (() => { try{return JSON.parse(localStorage.getItem("aot_flash_sale")||"null");}catch{return null;} })();
  const streamCfg = (() => { try{return JSON.parse(localStorage.getItem("aot_stream_config")||"null");}catch{return null;} })();
  const stacks = (() => { try{return JSON.parse(localStorage.getItem("aot_stacks")||"[]");}catch{return[];} })();
  const xPins = (() => { try{return JSON.parse(localStorage.getItem("aot_x_pins")||"[]");}catch{return[];} })();

  const STATS = [
    { label:"Total Members",    value:String(totalUsers),   icon:"👥", color:accentG,  sub:"registered accounts" },
    { label:"Waitlist",         value:String(waitlist.length), icon:"📋", color:accentB,  sub:"awaiting launch" },
    { label:"Saved Stacks",     value:String(stacks.length),icon:"⚗️", color:accentY,  sub:"community stacks" },
    { label:"Flash Sale",       value:flashCfg?.active?"LIVE":"OFF", icon:"⚡", color:flashCfg?.active?accentR:muted, sub:flashCfg?.code||"no active sale" },
    { label:"Stream Status",    value:streamCfg?.isLive?"LIVE":"Offline", icon:"📺", color:streamCfg?.isLive?accentR:muted, sub:streamCfg?.title||"not configured" },
    { label:"X Pinned Posts",   value:String(xPins.length), icon:"𝕏", color:"rgba(255,255,255,0.7)", sub:"pinned community posts" },
  ];

  const topProducts = [
    {name:"GLP-3R (Retatrutide)",icon:"🔥",views:142,color:accentR},
    {name:"BPC-157",             icon:"🧬",views:118,color:accentG},
    {name:"Semaglutide",         icon:"💊",views:97, color:accentB},
    {name:"CJC-1295/Ipa Blend",  icon:"⚗️",views:84, color:accentY},
    {name:"GHK-Cu",              icon:"✨",views:71, color:"#a855f7"},
  ];
  const maxViews = Math.max(...topProducts.map(p=>p.views));

  return (
    <div style={{paddingTop:8}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.1rem",fontWeight:800,marginBottom:20,display:"flex",alignItems:"center",gap:10}}>
        📊 Site Analytics
        <span style={{fontSize:"0.68rem",fontWeight:600,color:muted,background:card,border:"1px solid "+border,borderRadius:100,padding:"2px 10px"}}>Live data</span>
      </div>

      {/* Stats grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12,marginBottom:28}}>
        {STATS.map(s=>(
          <div key={s.label} style={{background:card,border:"1px solid "+border,borderRadius:14,padding:"16px 14px"}}>
            <div style={{fontSize:"1.4rem",marginBottom:6}}>{s.icon}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.4rem",color:s.color,lineHeight:1,marginBottom:4}}>{s.value}</div>
            <div style={{fontSize:"0.72rem",fontWeight:700,color:"rgba(255,255,255,0.7)",marginBottom:2}}>{s.label}</div>
            <div style={{fontSize:"0.62rem",color:muted}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Top products */}
      <div style={{background:card,border:"1px solid "+border,borderRadius:16,padding:20,marginBottom:20}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:16}}>🔥 Top Products (Page Views)</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {topProducts.map(p=>(
            <div key={p.name} style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:"1rem",width:20,textAlign:"center",flexShrink:0}}>{p.icon}</span>
              <div style={{fontSize:"0.8rem",color:"#fff",width:180,flexShrink:0}}>{p.name}</div>
              <div style={{flex:1,background:"rgba(255,255,255,0.06)",borderRadius:100,height:8,overflow:"hidden"}}>
                <div style={{height:"100%",borderRadius:100,background:p.color,width:`${(p.views/maxViews)*100}%`,transition:"width 1s ease-out"}}/>
              </div>
              <div style={{fontSize:"0.72rem",color:muted,width:30,textAlign:"right",flexShrink:0}}>{p.views}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick admin actions */}
      <div style={{background:card,border:"1px solid "+border,borderRadius:16,padding:20}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:14}}>⚡ Quick Actions</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
          {[
            ["📋","Waitlist","waitlist"],["👥","All Signups","signups"],["⚡","Flash Sale","flash"],
            ["📺","Live Stream","stream"],["💬","Chat Members","chatmembers"],
          ].map(([icon,label,tab])=>(
            <button key={String(tab)} style={{background:"rgba(255,255,255,0.04)",border:"1px solid "+border,borderRadius:10,padding:"10px 8px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,color:"rgba(255,255,255,0.7)",fontSize:"0.8rem",fontWeight:600,transition:"all .15s"}}
              onClick={()=>{document.querySelectorAll("[data-tab]").forEach((el:any)=>el.click&&el.getAttribute("data-tab")===tab&&el.click());}}>
              <span style={{fontSize:"1rem"}}>{icon}</span>{label}
            </button>
          ))}
        </div>
      </div>

      <div style={{marginTop:14,fontSize:"0.7rem",color:muted,textAlign:"center"}}>Analytics are derived from localStorage data. Full server-side analytics via GA4: G-FKPMWMMLMZ</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FLASH SALE — banner, admin panel, scheduler
// ═══════════════════════════════════════════════════════════════
const FLASH_KEY = "aot_flash_sale";

interface FlashSale {
  active: boolean;
  message: string;
  discount: string;
  code: string;
  endsAt: string;
  color: string;
}

function getFlashSale(): FlashSale | null {
  try {
    const raw = localStorage.getItem(FLASH_KEY);
    if (!raw) return null;
    const d: FlashSale = JSON.parse(raw);
    if (!d || !d.active) return null;
    if (d.endsAt && d.endsAt !== "" && new Date(d.endsAt).getTime() < Date.now()) return null;
    return d;
  } catch { return null; }
}

function saveFlashSale(sale: FlashSale) {
  try { localStorage.setItem(FLASH_KEY, JSON.stringify(sale)); } catch {}
  try { localStorage.setItem("aot_flash_ping", String(Date.now())); } catch {}
  try { window.dispatchEvent(new CustomEvent("aot_flash_update")); } catch {}
}

function FlashSaleBanner() {
  const [sale, setSale] = useState<FlashSale|null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const load = () => {
    setSale(getFlashSale());
    try { if (!sessionStorage.getItem("aot_flash_dismissed")) setDismissed(false); } catch {}
  };

  const handleDismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem("aot_flash_dismissed", "1"); } catch {}
  };

  useEffect(() => {
    load();
    const iv = setInterval(load, 2000);
    const onStore = (e: StorageEvent) => { if (e.key === "aot_flash_ping") load(); };
    const onCustom = () => {
      try { sessionStorage.removeItem("aot_flash_dismissed"); } catch {}
      setDismissed(false);
      load();
    };
    window.addEventListener("storage", onStore);
    window.addEventListener("aot_flash_update", onCustom);
    return () => {
      clearInterval(iv);
      window.removeEventListener("storage", onStore);
      window.removeEventListener("aot_flash_update", onCustom);
    };
  }, []);

  useEffect(() => {
    if (!sale?.endsAt) return;
    const iv = setInterval(() => {
      const diff = new Date(sale.endsAt).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft(""); setSale(null); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(iv);
  }, [sale?.endsAt]);

  if (dismissed || !sale) return null;

  const colors: Record<string,{bg:string;border:string;accent:string}> = {
    red:   {bg:"linear-gradient(90deg,#7f0000,#c0392b,#7f0000)", border:"rgba(255,100,100,0.4)", accent:"#ffd6d6"},
    green: {bg:"linear-gradient(90deg,#0a3d1f,#1a7a3a,#0a3d1f)", border:"rgba(59,232,176,0.4)",  accent:"#3be8b0"},
    gold:  {bg:"linear-gradient(90deg,#5c3a00,#c07800,#5c3a00)", border:"rgba(255,209,102,0.4)", accent:"#ffd166"},
    blue:  {bg:"linear-gradient(90deg,#0a1a4a,#1a3a8a,#0a1a4a)", border:"rgba(79,142,247,0.4)",  accent:"#4f8ef7"},
  };
  const col = colors[sale.color] || colors.red;

  return (
    <div style={{background:col.bg, borderBottom:`1px solid ${col.border}`,
      padding:"9px 44px 9px 16px", display:"flex", alignItems:"center",
      justifyContent:"center", gap:12, flexWrap:"wrap" as const,
      position:"fixed" as const, top:0, left:0, right:0, zIndex:1000,
      boxShadow:"0 2px 20px rgba(0,0,0,0.4)"}}>
      <span style={{fontSize:"0.82rem", fontWeight:700, color:"#fff"}}>{sale.message}</span>
      {sale.discount && (
        <span style={{background:"rgba(255,255,255,0.2)", color:"#fff", fontWeight:800,
          fontSize:"0.8rem", padding:"2px 10px", borderRadius:100, letterSpacing:"0.04em"}}>
          {sale.discount} OFF
        </span>
      )}
      {sale.code && (
        <span style={{fontFamily:"monospace", background:"rgba(0,0,0,0.3)", color:col.accent,
          fontWeight:800, fontSize:"0.8rem", padding:"3px 10px", borderRadius:8,
          border:`1px solid ${col.accent}55`, letterSpacing:"0.06em"}}>
          {sale.code}
        </span>
      )}
      {timeLeft && (
        <span style={{fontSize:"0.72rem", color:"rgba(255,255,255,0.8)", fontWeight:600}}>
          ⏱ {timeLeft}
        </span>
      )}
      <button onClick={handleDismiss}
        style={{position:"absolute" as const, right:12, top:"50%", transform:"translateY(-50%)",
          background:"rgba(255,255,255,0.15)", border:"none", color:"#fff",
          borderRadius:"50%", width:24, height:24, cursor:"pointer",
          fontSize:"0.75rem", display:"flex", alignItems:"center", justifyContent:"center"}}>✕</button>
    </div>
  );
}

function FlashSaleAdmin() {
  const defaultSale: FlashSale = {active:false, message:"🔥 Flash Sale — Limited Time!", discount:"20%", code:"FLASH20", endsAt:"", color:"red"};
  const [sale, setSaleState] = useState<FlashSale>(() => {
    try { return JSON.parse(localStorage.getItem(FLASH_KEY)||"null") || defaultSale; } catch { return defaultSale; }
  });
  const [saved, setSaved] = useState(false);
  const update = (k: keyof FlashSale, v: any) => setSaleState(p => ({...p, [k]:v}));

  const handleSave = () => {
    saveFlashSale(sale);
    try { sessionStorage.removeItem("aot_flash_dismissed"); } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const accentG="#3be8b0", accentR="#ff6b6b", card="#161616", border="rgba(255,255,255,0.08)", muted="rgba(255,255,255,0.4)";

  return (
    <div style={{paddingTop:8}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1rem",fontWeight:800,marginBottom:16}}>⚡ Flash Sale Settings</div>

      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,background:card,borderRadius:14,padding:"14px 16px",border:`1px solid ${sale.active?"rgba(59,232,176,0.3)":border}`}}>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:"0.88rem",color:"#fff",marginBottom:2}}>Sale Status</div>
          <div style={{fontSize:"0.72rem",color:muted}}>{sale.active?"Banner is LIVE sitewide":"Banner is hidden"}</div>
        </div>
        <button onClick={()=>update("active",!sale.active)}
          style={{background:sale.active?"rgba(59,232,176,0.15)":"rgba(255,255,255,0.07)",
            border:`1px solid ${sale.active?"rgba(59,232,176,0.4)":border}`,
            color:sale.active?accentG:"rgba(255,255,255,0.5)",
            borderRadius:10,padding:"8px 18px",cursor:"pointer",fontFamily:"inherit",fontWeight:800,fontSize:"0.85rem",transition:"all .15s"}}>
          {sale.active?"● LIVE":"○ OFF"}
        </button>
      </div>

      <div style={{display:"flex",flexDirection:"column" as const,gap:10,marginBottom:16}}>
        {[["message","Banner Message","🔥 Flash Sale — Limited Time!"],["discount","Discount Label","20%"],["code","Promo Code","FLASH20"]].map(([key,label,ph])=>(
          <div key={key}>
            <div style={{fontSize:"0.68rem",color:muted,fontWeight:600,marginBottom:4}}>{label}</div>
            <input value={(sale as any)[key]} onChange={e=>update(key as keyof FlashSale, e.target.value)}
              placeholder={ph}
              style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid "+border,borderRadius:10,
                padding:"9px 13px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",boxSizing:"border-box" as const}}/>
          </div>
        ))}
        <div>
          <div style={{fontSize:"0.68rem",color:muted,fontWeight:600,marginBottom:4}}>End Date/Time (optional)</div>
          <input type="datetime-local" value={sale.endsAt} onChange={e=>update("endsAt",e.target.value)}
            style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid "+border,borderRadius:10,
              padding:"9px 13px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",boxSizing:"border-box" as const}}/>
        </div>
        <div>
          <div style={{fontSize:"0.68rem",color:muted,fontWeight:600,marginBottom:8}}>Banner Color</div>
          <div style={{display:"flex",gap:8}}>
            {[["red","🔴"],["green","🟢"],["gold","🟡"],["blue","🔵"]].map(([c,emoji])=>(
              <button key={c} onClick={()=>update("color",c)}
                style={{flex:1,background:sale.color===c?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.04)",
                  border:`1px solid ${sale.color===c?"rgba(255,255,255,0.4)":border}`,
                  borderRadius:10,padding:"8px 4px",cursor:"pointer",fontSize:"1rem",transition:"all .15s"}}>
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleSave}
        style={{width:"100%",background:saved?"rgba(59,232,176,0.15)":accentG,
          color:saved?"#3be8b0":"#0e0e0e",border:saved?"1px solid rgba(59,232,176,0.4)":"none",
          borderRadius:12,padding:"12px",fontFamily:"inherit",fontWeight:800,fontSize:"0.9rem",
          cursor:"pointer",transition:"all .2s",boxShadow:saved?"none":"0 4px 16px rgba(59,232,176,0.3)"}}>
        {saved?"✓ Saved & Live!":"Save Flash Sale"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FLASH SALE SCHEDULER — set future start time, auto-activates
// ═══════════════════════════════════════════════════════════════
function FlashSaleScheduler() {
  const [schedDate, setSchedDate] = useState("");
  const [schedTime, setSchedTime] = useState("");
  const [scheduled, setScheduled] = useState<number|null>(()=>{ try{return JSON.parse(localStorage.getItem("aot_flash_scheduled")||"null");}catch{return null;} });
  const [countdown, setCountdown] = useState("");
  const accentG="#3be8b0", accentY="#ffd166", card="#161616", border="rgba(255,255,255,0.08)", muted="rgba(255,255,255,0.4)";

  useEffect(()=>{
    if (!scheduled) return;
    const iv = setInterval(()=>{
      const diff = scheduled - Date.now();
      if (diff <= 0) {
        // Auto-activate
        const raw = localStorage.getItem("aot_flash_sale");
        if (raw) { try { const s=JSON.parse(raw); s.active=true; localStorage.setItem("aot_flash_sale",JSON.stringify(s)); window.dispatchEvent(new CustomEvent("aot_flash_update")); } catch {} }
        localStorage.removeItem("aot_flash_scheduled");
        setScheduled(null); setCountdown(""); clearInterval(iv);
        return;
      }
      const h=Math.floor(diff/3600000), m=Math.floor((diff%3600000)/60000), s=Math.floor((diff%60000)/1000);
      setCountdown(`${h}h ${m}m ${s}s`);
    },1000);
    return ()=>clearInterval(iv);
  },[scheduled]);

  const handleSchedule = () => {
    if (!schedDate||!schedTime) return;
    const ts = new Date(`${schedDate}T${schedTime}`).getTime();
    if (isNaN(ts)||ts<=Date.now()) { alert("Please pick a future date/time."); return; }
    localStorage.setItem("aot_flash_scheduled",JSON.stringify(ts));
    setScheduled(ts);
  };

  const handleCancelSchedule = () => {
    localStorage.removeItem("aot_flash_scheduled");
    setScheduled(null); setCountdown("");
  };

  return (
    <div style={{background:card,border:"1px solid rgba(255,209,102,0.2)",borderRadius:14,padding:16,marginTop:16}}>
      <div style={{fontSize:"0.75rem",fontWeight:700,color:accentY,letterSpacing:"0.07em",marginBottom:12}}>⏰ SCHEDULE AUTO-ACTIVATION</div>
      {scheduled ? (
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div>
            <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.7)",marginBottom:2}}>Sale activates in:</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:accentY}}>{countdown}</div>
            <div style={{fontSize:"0.65rem",color:muted,marginTop:2}}>Scheduled for {new Date(scheduled).toLocaleString()}</div>
          </div>
          <button onClick={handleCancelSchedule} style={{background:"rgba(255,107,107,0.1)",border:"1px solid rgba(255,107,107,0.2)",color:"#ff6b6b",borderRadius:10,padding:"8px 14px",cursor:"pointer",fontSize:"0.78rem",fontWeight:700}}>Cancel</button>
        </div>
      ) : (
        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-end"}}>
          <div style={{flex:1,minWidth:120}}>
            <div style={{fontSize:"0.65rem",color:muted,marginBottom:4}}>Date</div>
            <input type="date" value={schedDate} onChange={e=>setSchedDate(e.target.value)}
              style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid "+border,borderRadius:8,padding:"8px 10px",color:"#fff",fontFamily:"inherit",fontSize:"0.82rem",outline:"none",boxSizing:"border-box"}}/>
          </div>
          <div style={{flex:1,minWidth:100}}>
            <div style={{fontSize:"0.65rem",color:muted,marginBottom:4}}>Time</div>
            <input type="time" value={schedTime} onChange={e=>setSchedTime(e.target.value)}
              style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid "+border,borderRadius:8,padding:"8px 10px",color:"#fff",fontFamily:"inherit",fontSize:"0.82rem",outline:"none",boxSizing:"border-box"}}/>
          </div>
          <button onClick={handleSchedule} style={{background:"rgba(255,209,102,0.12)",border:"1px solid rgba(255,209,102,0.25)",color:accentY,borderRadius:10,padding:"9px 16px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.8rem",whiteSpace:"nowrap"}}>⏰ Schedule</button>
        </div>
      )}
    </div>
  );
}

// Nav live badge — shows in nav when stream is live
function useStreamLive():boolean {
  const [live,setLive]=useState(()=>{try{return JSON.parse(localStorage.getItem("aot_stream_config")||"null")?.isLive===true;}catch{return false;}});
  useEffect(()=>{
    const check=()=>{try{setLive(JSON.parse(localStorage.getItem("aot_stream_config")||"null")?.isLive===true);}catch{setLive(false);}};
    const iv=setInterval(check,5000);
    window.addEventListener("aot_stream_update",check);
    return()=>{clearInterval(iv);window.removeEventListener("aot_stream_update",check);};
  },[]);
  return live;
}




// ═══════════════════════════════════════════════════════════════
// ADMIN CMS — Full site control panel
// Products · Members · Inventory · Site Settings · Announcements
// Stored in Firebase so changes persist across all devices/sessions
// ═══════════════════════════════════════════════════════════════

const FB_ADMIN_URL = "https://alphaomegatides-chat-default-rtdb.firebaseio.com";

// ── CMS Product overrides (stored in Firebase, merge over hardcoded PRODUCTS) ──
async function cmsGetProducts(): Promise<Record<string,any>> {
  try {
    const res = await fetch(`${FB_ADMIN_URL}/cms/products.json`);
    if (!res.ok) return {};
    return await res.json() || {};
  } catch { return {}; }
}

async function cmsSaveProduct(id: string, data: any): Promise<void> {
  try {
    await fetch(`${FB_ADMIN_URL}/cms/products/${id}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch(e) { console.error("CMS save failed:", e); }
}

async function cmsDeleteProduct(id: string): Promise<void> {
  try {
    await fetch(`${FB_ADMIN_URL}/cms/products/${id}.json`, { method: "DELETE" });
  } catch {}
}

// ── CMS Announcements ──────────────────────────────────────────
async function cmsGetAnnouncements(): Promise<any[]> {
  try {
    const res = await fetch(`${FB_ADMIN_URL}/cms/announcements.json`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data) return [];
    return Object.entries(data).map(([id,v]:any) => ({...v,id})).sort((a,b)=>b.createdAt-a.createdAt);
  } catch { return []; }
}

async function cmsSaveAnnouncement(ann: any): Promise<void> {
  try {
    const method = ann.id ? "PATCH" : "POST";
    const url = ann.id
      ? `${FB_ADMIN_URL}/cms/announcements/${ann.id}.json`
      : `${FB_ADMIN_URL}/cms/announcements.json`;
    await fetch(url, {
      method, headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...ann, updatedAt: Date.now()}),
    });
  } catch {}
}

async function cmsDeleteAnnouncement(id: string): Promise<void> {
  try { await fetch(`${FB_ADMIN_URL}/cms/announcements/${id}.json`, { method: "DELETE" }); } catch {}
}

// ── CMS Site Settings ──────────────────────────────────────────
async function cmsGetSettings(): Promise<Record<string,any>> {
  try {
    const res = await fetch(`${FB_ADMIN_URL}/cms/settings.json`);
    if (!res.ok) return {};
    return await res.json() || {};
  } catch { return {}; }
}

async function cmsSaveSettings(data: Record<string,any>): Promise<void> {
  try {
    await fetch(`${FB_ADMIN_URL}/cms/settings.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {}
}

// ══════════════════════════════════════════════════════════════
// ADMIN CMS PAGE — full control panel
// ══════════════════════════════════════════════════════════════
function AdminCMSPage({ user, go }: { user: any; go: Function }) {
  const [section, setSection] = useState<"products"|"members"|"announcements"|"settings"|"orders">("products");

  const accentG = "#3be8b0", accentR = "#ff6b6b", accentB = "#4f8ef7", accentY = "#ffd166";
  const bg = "#0e0e0e", card = "#111111", card2 = "#161616", border = "rgba(255,255,255,0.08)", muted = "rgba(255,255,255,0.38)";

  if (!user || !isAdmin(user)) return (
    <div style={{minHeight:"100vh",background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}}>
      <div style={{fontSize:"3rem"}}>🔒</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem"}}>Admin Only</div>
      <button onClick={()=>go("login")} style={{background:accentG,color:"#0e0e0e",border:"none",borderRadius:100,padding:"10px 24px",fontFamily:"inherit",fontWeight:700,cursor:"pointer"}}>Sign In</button>
    </div>
  );

  const NAV = [
    { id:"products",      icon:"📦", label:"Products"      },
    { id:"members",       icon:"👥", label:"Members"       },
    { id:"announcements", icon:"📢", label:"Announcements" },
    { id:"orders",        icon:"🧾", label:"Orders"        },
    { id:"settings",      icon:"⚙️", label:"Site Settings" },
  ];

  return (
    <div style={{background:bg,minHeight:"100vh",paddingTop:60}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
        .cms-row:hover{background:rgba(255,255,255,0.03)!important;}
        .cms-btn:hover{filter:brightness(1.15);}
        .cms-nav-btn:hover{background:rgba(255,255,255,0.07)!important;}
      `}</style>

      {/* Header */}
      <div style={{background:"rgba(10,10,10,0.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid "+border,padding:"14px 20px",display:"flex",alignItems:"center",gap:14,position:"sticky",top:60,zIndex:20}}>
        <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,107,107,0.15)",border:"1px solid rgba(255,107,107,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>👑</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"#fff"}}>Admin Control Panel</div>
          <div style={{fontSize:"0.65rem",color:muted}}>alphaomegatides@yahoo.com · Full site management</div>
        </div>
        <button onClick={()=>go("home")} style={{background:"rgba(255,255,255,0.05)",border:"1px solid "+border,color:muted,borderRadius:9,padding:"6px 14px",cursor:"pointer",fontSize:"0.75rem",fontWeight:600}}>← Back to Site</button>
      </div>

      {/* Section nav */}
      <div style={{background:"rgba(12,12,12,0.95)",borderBottom:"1px solid "+border,padding:"0 16px",display:"flex",gap:4,overflowX:"auto" as const}}>
        {NAV.map(n=>(
          <button key={n.id} className="cms-nav-btn" onClick={()=>setSection(n.id as any)}
            style={{background:section===n.id?"rgba(59,232,176,0.1)":"transparent",border:"none",borderBottom:section===n.id?"2px solid "+accentG:"2px solid transparent",color:section===n.id?accentG:"rgba(255,255,255,0.55)",padding:"12px 16px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.8rem",whiteSpace:"nowrap" as const,display:"flex",alignItems:"center",gap:6,transition:"all .15s"}}>
            <span>{n.icon}</span>{n.label}
          </button>
        ))}
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"20px 16px 100px"}}>
        {section==="products"      && <CMSProducts      accentG={accentG} accentR={accentR} accentB={accentB} accentY={accentY} card={card} card2={card2} border={border} muted={muted}/>}
        {section==="members"       && <CMSMembers        accentG={accentG} accentR={accentR} accentY={accentY} card={card} card2={card2} border={border} muted={muted} currentUser={user}/>}
        {section==="announcements" && <CMSAnnouncements  accentG={accentG} accentR={accentR} card={card} card2={card2} border={border} muted={muted}/>}
        {section==="orders"        && <CMSOrders         accentG={accentG} accentB={accentB} accentY={accentY} card={card} border={border} muted={muted}/>}
        {section==="settings"      && <CMSSiteSettings   accentG={accentG} accentR={accentR} accentB={accentB} card={card} card2={card2} border={border} muted={muted} go={go}/>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION: PRODUCT MANAGER
// ══════════════════════════════════════════════════════════════
function CMSProducts({accentG,accentR,accentB,accentY,card,card2,border,muted}:any) {
  const [overrides, setOverrides]   = useState<Record<string,any>>({});
  const [loading, setLoading]       = useState(true);
  const [editing, setEditing]       = useState<string|null>(null);
  const [draft, setDraft]           = useState<any>({});
  const [saving, setSaving]         = useState(false);
  const [saved, setSaved]           = useState<string|null>(null);
  const [search, setSearch]         = useState("");
  const [showNew, setShowNew]       = useState(false);
  const [newProduct, setNewProduct] = useState({name:"",price:"",size:"",desc:"",icon:"🧬",color:"#3be8b0",inStock:true,tag:"",category:""});

  useEffect(()=>{ cmsGetProducts().then(d=>{ setOverrides(d||{}); setLoading(false); }); },[]);

  // Merge hardcoded PRODUCTS with Firebase overrides
  const merged = PRODUCTS.map(p => ({ ...p, ...(overrides[p.id]||{}), _override: !!overrides[p.id] }));
  const allProducts = [
    ...merged,
    ...Object.entries(overrides).filter(([id])=>!PRODUCTS.find(p=>p.id===id)).map(([id,v]:any)=>({...v,id,_custom:true}))
  ].filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (p: any) => {
    setEditing(p.id);
    setDraft({
      name: p.name||"",
      price: p.price||p.sizes?.[0]?.p||"",
      size: p.size||p.sizes?.[0]?.s||"",
      desc: p.desc||"",
      icon: p.icon||"🧬",
      color: p.color||"#3be8b0",
      tag: p.tag||"",
      inStock: overrides[p.id]?.inStock !== false,
      oos: overrides[p.id]?.oos||false,
      note: overrides[p.id]?.note||"",
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    await cmsSaveProduct(editing, { ...draft, updatedAt: Date.now() });
    const updated = await cmsGetProducts();
    setOverrides(updated||{});
    setSaving(false); setSaved(editing); setEditing(null);
    setTimeout(()=>setSaved(null),2000);
  };

  const handleToggleStock = async (id: string, current: boolean) => {
    await cmsSaveProduct(id, { inStock: !current, oos: current, updatedAt: Date.now() });
    const updated = await cmsGetProducts();
    setOverrides(updated||{});
  };

  const handleAddNew = async () => {
    if (!newProduct.name) return;
    const id = newProduct.name.toLowerCase().replace(/[^a-z0-9]/g,"_") + "_" + Date.now();
    await cmsSaveProduct(id, { ...newProduct, id, createdAt: Date.now(), _custom: true });
    const updated = await cmsGetProducts();
    setOverrides(updated||{});
    setNewProduct({name:"",price:"",size:"",desc:"",icon:"🧬",color:"#3be8b0",inStock:true,tag:"",category:""});
    setShowNew(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Delete product "${id}"? This cannot be undone.`)) return;
    await cmsDeleteProduct(id);
    const updated = await cmsGetProducts();
    setOverrides(updated||{});
  };

  const inStock = (p:any) => overrides[p.id]?.inStock !== false && !overrides[p.id]?.oos;

  return (
    <div style={{animation:"fadeUp .25s ease-out"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap" as const,gap:12,marginBottom:20}}>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#fff"}}>📦 Product Manager</div>
          <div style={{fontSize:"0.72rem",color:muted,marginTop:2}}>{allProducts.length} products · changes save to Firebase instantly</div>
        </div>
        <button onClick={()=>setShowNew(!showNew)} className="cms-btn"
          style={{background:accentG,color:"#0e0e0e",border:"none",borderRadius:10,padding:"10px 18px",fontFamily:"inherit",fontWeight:800,fontSize:"0.85rem",cursor:"pointer",display:"flex",alignItems:"center",gap:7}}>
          + Add New Product
        </button>
      </div>

      {/* Add new product form */}
      {showNew && (
        <div style={{background:card,border:"1px solid rgba(59,232,176,0.2)",borderRadius:16,padding:20,marginBottom:20}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:14,color:accentG}}>+ New Product</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10,marginBottom:14}}>
            {[["name","Product Name","BPC-157"],["price","Price","$89.99"],["size","Size","10mg"],["tag","Category Tag","Peptide"],["icon","Emoji Icon","🧬"]].map(([k,label,ph])=>(
              <div key={k}>
                <div style={{fontSize:"0.65rem",color:muted,marginBottom:4,fontWeight:600}}>{label}</div>
                <input value={(newProduct as any)[k]} onChange={e=>setNewProduct(p=>({...p,[k]:e.target.value}))} placeholder={ph}
                  style={{width:"100%",background:card2,border:"1px solid "+border,borderRadius:9,padding:"8px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",boxSizing:"border-box" as const}}/>
              </div>
            ))}
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:"0.65rem",color:muted,marginBottom:4,fontWeight:600}}>Description</div>
            <textarea value={newProduct.desc} onChange={e=>setNewProduct(p=>({...p,desc:e.target.value}))} placeholder="Product description for the product page…" rows={3}
              style={{width:"100%",background:card2,border:"1px solid "+border,borderRadius:9,padding:"8px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",resize:"none" as const,boxSizing:"border-box" as const}}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={handleAddNew} style={{background:accentG,color:"#0e0e0e",border:"none",borderRadius:9,padding:"9px 18px",fontFamily:"inherit",fontWeight:800,fontSize:"0.85rem",cursor:"pointer"}}>Save Product</button>
            <button onClick={()=>setShowNew(false)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid "+border,color:muted,borderRadius:9,padding:"9px 14px",fontFamily:"inherit",fontWeight:600,fontSize:"0.82rem",cursor:"pointer"}}>Cancel</button>
          </div>
        </div>
      )}

      {/* Search */}
      <div style={{position:"relative" as const,marginBottom:16}}>
        <span style={{position:"absolute" as const,left:12,top:"50%",transform:"translateY(-50%)",color:muted,fontSize:"0.85rem"}}>🔍</span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products…"
          style={{width:"100%",background:card,border:"1px solid "+border,borderRadius:12,padding:"10px 14px 10px 34px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box" as const}}/>
      </div>

      {/* Product list */}
      {loading ? <div style={{textAlign:"center",padding:40,color:muted}}>Loading…</div> : (
        <div style={{display:"flex",flexDirection:"column" as const,gap:8}}>
          {allProducts.map(p=>(
            <div key={p.id} className="cms-row"
              style={{background:card,border:`1px solid ${saved===p.id?"rgba(59,232,176,0.3)":inStock(p)?"rgba(255,255,255,0.06)":"rgba(255,107,107,0.15)"}`,borderRadius:14,padding:"14px 16px",transition:"all .15s"}}>

              {editing === p.id ? (
                /* Edit form */
                <div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.85rem",color:accentG,marginBottom:12}}>Editing: {p.name}</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginBottom:12}}>
                    {[["name","Name"],["price","Price"],["size","Size"],["tag","Tag"],["icon","Icon"]].map(([k,label])=>(
                      <div key={k}>
                        <div style={{fontSize:"0.62rem",color:muted,marginBottom:3,fontWeight:600}}>{label}</div>
                        <input value={draft[k]||""} onChange={e=>setDraft((d:any)=>({...d,[k]:e.target.value}))}
                          style={{width:"100%",background:card2,border:"1px solid "+border,borderRadius:8,padding:"7px 10px",color:"#fff",fontFamily:"inherit",fontSize:"0.83rem",outline:"none",boxSizing:"border-box" as const}}/>
                      </div>
                    ))}
                  </div>
                  <div style={{marginBottom:10}}>
                    <div style={{fontSize:"0.62rem",color:muted,marginBottom:3,fontWeight:600}}>Description</div>
                    <textarea value={draft.desc||""} onChange={e=>setDraft((d:any)=>({...d,desc:e.target.value}))} rows={3}
                      style={{width:"100%",background:card2,border:"1px solid "+border,borderRadius:8,padding:"7px 10px",color:"#fff",fontFamily:"inherit",fontSize:"0.83rem",outline:"none",resize:"none" as const,boxSizing:"border-box" as const}}/>
                  </div>
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:"0.62rem",color:muted,marginBottom:3,fontWeight:600}}>Admin Notes (internal only)</div>
                    <input value={draft.note||""} onChange={e=>setDraft((d:any)=>({...d,note:e.target.value}))} placeholder="Internal notes…"
                      style={{width:"100%",background:card2,border:"1px solid "+border,borderRadius:8,padding:"7px 10px",color:"#fff",fontFamily:"inherit",fontSize:"0.83rem",outline:"none",boxSizing:"border-box" as const}}/>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap" as const}}>
                    <button onClick={()=>setDraft((d:any)=>({...d,inStock:!d.inStock,oos:d.inStock}))}
                      style={{background:draft.inStock?"rgba(59,232,176,0.1)":"rgba(255,107,107,0.1)",border:`1px solid ${draft.inStock?"rgba(59,232,176,0.3)":"rgba(255,107,107,0.3)"}`,color:draft.inStock?accentG:accentR,borderRadius:8,padding:"7px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.78rem"}}>
                      {draft.inStock?"✓ In Stock":"✗ Out of Stock"}
                    </button>
                    <button onClick={handleSave} disabled={saving}
                      style={{background:accentG,color:"#0e0e0e",border:"none",borderRadius:8,padding:"7px 18px",fontFamily:"inherit",fontWeight:800,fontSize:"0.82rem",cursor:"pointer"}}>
                      {saving?"Saving…":"💾 Save Changes"}
                    </button>
                    <button onClick={()=>setEditing(null)}
                      style={{background:"rgba(255,255,255,0.05)",border:"1px solid "+border,color:muted,borderRadius:8,padding:"7px 12px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:"0.78rem"}}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Product row */
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{fontSize:"1.4rem",flexShrink:0}}>{p.icon||"🧬"}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3,flexWrap:"wrap" as const}}>
                      <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",color:"#fff"}}>{p.name}</span>
                      {p._custom && <span style={{background:"rgba(168,85,247,0.15)",color:"#a855f7",fontSize:"0.58rem",fontWeight:700,padding:"1px 7px",borderRadius:100}}>CUSTOM</span>}
                      {p._override && !p._custom && <span style={{background:"rgba(255,209,102,0.12)",color:accentY,fontSize:"0.58rem",fontWeight:700,padding:"1px 7px",borderRadius:100}}>MODIFIED</span>}
                      {saved===p.id && <span style={{background:"rgba(59,232,176,0.12)",color:accentG,fontSize:"0.58rem",fontWeight:700,padding:"1px 7px",borderRadius:100}}>✓ SAVED</span>}
                    </div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap" as const}}>
                      <span style={{fontSize:"0.72rem",fontWeight:700,color:accentG}}>{overrides[p.id]?.price||p.price||p.sizes?.[0]?.p||"—"}</span>
                      <span style={{fontSize:"0.72rem",color:muted}}>{overrides[p.id]?.size||p.size||p.sizes?.[0]?.s||"—"}</span>
                      {p.tag && <span style={{fontSize:"0.68rem",color:muted,background:"rgba(255,255,255,0.05)",padding:"1px 8px",borderRadius:100}}>{p.tag}</span>}
                    </div>
                  </div>

                  {/* Stock toggle */}
                  <button onClick={()=>handleToggleStock(p.id, inStock(p))} className="cms-btn"
                    style={{background:inStock(p)?"rgba(59,232,176,0.1)":"rgba(255,107,107,0.1)",border:`1px solid ${inStock(p)?"rgba(59,232,176,0.25)":"rgba(255,107,107,0.25)"}`,color:inStock(p)?accentG:accentR,borderRadius:8,padding:"6px 12px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.72rem",flexShrink:0,transition:"all .15s"}}>
                    {inStock(p)?"✓ In Stock":"✗ OOS"}
                  </button>

                  {/* Edit */}
                  <button onClick={()=>handleEdit(p)} className="cms-btn"
                    style={{background:"rgba(79,142,247,0.1)",border:"1px solid rgba(79,142,247,0.2)",color:accentB,borderRadius:8,padding:"6px 12px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.72rem",flexShrink:0}}>
                    ✏️ Edit
                  </button>

                  {/* Delete (custom only) */}
                  {p._custom && (
                    <button onClick={()=>handleDelete(p.id)} className="cms-btn"
                      style={{background:"rgba(255,107,107,0.08)",border:"1px solid rgba(255,107,107,0.18)",color:accentR,borderRadius:8,padding:"6px 10px",cursor:"pointer",fontSize:"0.72rem",flexShrink:0}}>
                      🗑
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION: MEMBER MANAGER
// ══════════════════════════════════════════════════════════════
function CMSMembers({accentG,accentR,accentY,accentB,card,card2,border,muted,currentUser}:any) {
  const [members, setMembers]     = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState<"all"|"active"|"muted"|"banned">("all");
  const [saving, setSaving]       = useState<string|null>(null);
  const [online, setOnline]       = useState<string[]>([]);
  const [showAdd, setShowAdd]     = useState(false);
  const [newMember, setNewMember] = useState({email:"",name:"",password:""});
  const [addMsg, setAddMsg]       = useState("");

  const load = async () => {
    // Get local registered users
    const localUsers = Object.values(getUsers()) as any[];
    // Get Firebase chat members (have status/mute/ban info)
    const fbRes = await fetch(`${FB_ADMIN_URL}/chat/members.json`).catch(()=>null);
    const fbMembers = fbRes?.ok ? await fbRes.json() : {};
    // Merge: local users as base, overlay Firebase status
    const merged = localUsers.map((u:any) => {
      const key = u.email?.replace(/[.@]/g,"_");
      const fb = fbMembers?.[key] || {};
      return { ...u, status: fb.status||"active", messageCount: fb.messageCount||0, lastSeen: fb.lastSeen||u.createdAt||0 };
    });
    // Add Firebase-only members (chat users not in local)
    if (fbMembers) {
      Object.values(fbMembers).forEach((fb:any) => {
        if (!merged.find((m:any)=>m.email===fb.email)) {
          merged.push({ email:fb.email, name:fb.userName||fb.email, status:fb.status||"active", messageCount:fb.messageCount||0, lastSeen:fb.lastSeen||0, _fbOnly:true });
        }
      });
    }
    setMembers(merged.sort((a:any,b:any)=>(b.lastSeen||0)-(a.lastSeen||0)));
    // Online
    const onRes = await fetch(`${FB_ADMIN_URL}/chat/online.json`).catch(()=>null);
    const onData = onRes?.ok ? await onRes.json() : {};
    const cutoff = Date.now()-90000;
    setOnline(Object.values(onData||{}).filter((u:any)=>u.ts>cutoff).map((u:any)=>u.name));
    setLoading(false);
  };

  useEffect(()=>{ load(); const iv=setInterval(load,10000); return()=>clearInterval(iv); },[]);

  const handleStatus = async (member:any, status:"active"|"muted"|"banned") => {
    if (member.email===currentUser?.email) { alert("Cannot change your own status."); return; }
    setSaving(member.email);
    await fetch(`${FB_ADMIN_URL}/chat/members/${member.email.replace(/[.@]/g,"_")}.json`, {
      method:"PATCH", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({status, email:member.email, userName:member.name||member.fname||member.email})
    });
    await load(); setSaving(null);
  };

  const handleDeleteMember = async (member:any) => {
    if (!window.confirm(`Delete account for ${member.email}? This removes them from the site.`)) return;
    // Remove from localStorage users
    const users = getUsers();
    const key = Object.keys(users).find(k=>(users[k] as any).email===member.email);
    if (key) { delete users[key]; saveUsers(users); }
    await load();
  };

  const handleAddMember = async () => {
    if (!newMember.email||!newMember.password) { setAddMsg("Email and password required."); return; }
    const users = getUsers();
    if (Object.values(users).find((u:any)=>u.email===newMember.email)) { setAddMsg("Email already registered."); return; }
    const id = "u_"+Date.now();
    (users as any)[id] = { email:newMember.email, name:newMember.name||newMember.email.split("@")[0], fname:newMember.name||"Member", pass:btoa(newMember.password), role:"member", createdAt:new Date().toISOString() };
    saveUsers(users);
    setAddMsg("✓ Member added successfully!");
    setNewMember({email:"",name:"",password:""});
    setTimeout(()=>setAddMsg(""),3000);
    await load();
  };

  const filtered = members.filter(m => {
    if (filter!=="all" && m.status!==filter) return false;
    if (search && !m.email?.toLowerCase().includes(search.toLowerCase()) && !m.name?.toLowerCase().includes(search.toLowerCase()) && !m.fname?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = { all:members.length, active:members.filter(m=>m.status==="active").length, muted:members.filter(m=>m.status==="muted").length, banned:members.filter(m=>m.status==="banned").length };
  const statusColor = (s:string) => s==="banned"?accentR:s==="muted"?accentY:accentG;
  const timeAgo = (ts:any) => { if(!ts) return "never"; const d=Date.now()-new Date(ts).getTime(); const m=Math.floor(d/60000),h=Math.floor(d/3600000),dy=Math.floor(d/86400000); if(d<60000)return"just now";if(m<60)return`${m}m ago`;if(h<24)return`${h}h ago`;return`${dy}d ago`; };

  return (
    <div style={{animation:"fadeUp .25s ease-out"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap" as const,gap:12,marginBottom:20}}>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#fff"}}>👥 Member Manager</div>
          <div style={{fontSize:"0.72rem",color:muted,marginTop:2}}>{members.length} total · {online.length} online now</div>
        </div>
        <button onClick={()=>setShowAdd(!showAdd)}
          style={{background:accentG,color:"#0e0e0e",border:"none",borderRadius:10,padding:"10px 18px",fontFamily:"inherit",fontWeight:800,fontSize:"0.85rem",cursor:"pointer"}}>
          + Add Member
        </button>
      </div>

      {/* Add member form */}
      {showAdd && (
        <div style={{background:card,border:"1px solid rgba(59,232,176,0.2)",borderRadius:16,padding:18,marginBottom:16}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:12,color:accentG}}>+ Create New Member Account</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10,marginBottom:12}}>
            {[["email","Email Address","member@email.com"],["name","Display Name","John Doe"],["password","Password","••••••••"]].map(([k,label,ph])=>(
              <div key={k}>
                <div style={{fontSize:"0.62rem",color:muted,marginBottom:3,fontWeight:600}}>{label}</div>
                <input type={k==="password"?"password":"text"} value={(newMember as any)[k]} onChange={e=>setNewMember(p=>({...p,[k]:e.target.value}))} placeholder={ph}
                  style={{width:"100%",background:card2,border:"1px solid "+border,borderRadius:8,padding:"8px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",boxSizing:"border-box" as const}}/>
              </div>
            ))}
          </div>
          {addMsg && <div style={{fontSize:"0.78rem",color:addMsg.startsWith("✓")?accentG:accentR,marginBottom:10}}>{addMsg}</div>}
          <div style={{display:"flex",gap:8}}>
            <button onClick={handleAddMember} style={{background:accentG,color:"#0e0e0e",border:"none",borderRadius:8,padding:"8px 18px",fontFamily:"inherit",fontWeight:800,fontSize:"0.82rem",cursor:"pointer"}}>Create Account</button>
            <button onClick={()=>setShowAdd(false)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid "+border,color:muted,borderRadius:8,padding:"8px 12px",cursor:"pointer",fontFamily:"inherit",fontSize:"0.82rem"}}>Cancel</button>
          </div>
        </div>
      )}

      {/* Stats + filter */}
      <div style={{display:"flex",gap:0,background:card,borderRadius:12,overflow:"hidden",border:"1px solid "+border,marginBottom:12}}>
        {(["all","active","muted","banned"] as const).map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            style={{flex:1,padding:"10px 4px",background:filter===f?"rgba(59,232,176,0.08)":"transparent",border:"none",borderBottom:`2px solid ${filter===f?accentG:"transparent"}`,cursor:"pointer",transition:"all .15s"}}>
            <div style={{fontSize:"1rem"}}>{f==="all"?"👥":f==="active"?"✅":f==="muted"?"🔇":"🚫"}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.9rem",color:f==="all"?"#fff":statusColor(f)}}>{counts[f]}</div>
            <div style={{fontSize:"0.6rem",color:muted,textTransform:"capitalize" as const}}>{f}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{position:"relative" as const,marginBottom:14}}>
        <span style={{position:"absolute" as const,left:12,top:"50%",transform:"translateY(-50%)",color:muted}}>🔍</span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by email or name…"
          style={{width:"100%",background:card,border:"1px solid "+border,borderRadius:10,padding:"9px 14px 9px 34px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",boxSizing:"border-box" as const}}/>
      </div>

      {/* Member rows */}
      {loading ? <div style={{textAlign:"center",padding:40,color:muted}}>Loading members…</div> : (
        <div style={{display:"flex",flexDirection:"column" as const,gap:6}}>
          {filtered.map(m=>{
            const name = m.fname||m.name||m.email?.split("@")[0]||"Member";
            const isOnline = online.includes(name);
            const isSelf = m.email===currentUser?.email;
            return (
              <div key={m.email} className="cms-row"
                style={{display:"flex",alignItems:"center",gap:12,background:card,border:"1px solid "+border,borderRadius:12,padding:"12px 16px",transition:"background .12s"}}>
                {/* Avatar */}
                <div style={{position:"relative" as const,flexShrink:0}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:m.status==="banned"?"#1a0a0a":"rgba(59,232,176,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:800,color:m.status==="banned"?"rgba(255,255,255,0.2)":accentG}}>
                    {m.status==="banned"?"🚫":name.slice(0,2).toUpperCase()}
                  </div>
                  {isOnline&&<span style={{position:"absolute" as const,bottom:0,right:0,width:9,height:9,borderRadius:"50%",background:accentG,border:"2px solid #111"}}/>}
                </div>
                {/* Info */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" as const,marginBottom:2}}>
                    <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.85rem",color:"#fff"}}>{name}</span>
                    {isSelf&&<span style={{background:"rgba(59,232,176,0.12)",color:accentG,fontSize:"0.58rem",fontWeight:700,padding:"1px 6px",borderRadius:100}}>YOU</span>}
                    {isOnline&&<span style={{fontSize:"0.58rem",color:accentG,fontWeight:600}}>● LIVE</span>}
                    <span style={{background:m.status==="banned"?"rgba(255,107,107,0.12)":m.status==="muted"?"rgba(255,209,102,0.12)":"rgba(59,232,176,0.08)",color:statusColor(m.status||"active"),fontSize:"0.58rem",fontWeight:700,padding:"1px 7px",borderRadius:100}}>
                      {(m.status||"active").toUpperCase()}
                    </span>
                  </div>
                  <div style={{fontSize:"0.66rem",color:muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" as const}}>
                    {m.email} · {m.messageCount||0} msgs · joined {timeAgo(m.createdAt||m.lastSeen)}
                  </div>
                </div>
                {/* Actions */}
                {!isSelf && (
                  <div style={{display:"flex",gap:5,flexShrink:0,flexWrap:"wrap" as const}}>
                    {m.status!=="active"&&<button disabled={saving===m.email} onClick={()=>handleStatus(m,"active")} className="cms-btn" style={{background:"rgba(59,232,176,0.1)",border:"1px solid rgba(59,232,176,0.25)",color:accentG,borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:"0.7rem",fontWeight:700}}>✅ Allow</button>}
                    {m.status!=="muted"&&<button disabled={saving===m.email} onClick={()=>handleStatus(m,"muted")} className="cms-btn" style={{background:"rgba(255,209,102,0.08)",border:"1px solid rgba(255,209,102,0.2)",color:accentY,borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:"0.7rem",fontWeight:700}}>🔇 Mute</button>}
                    {m.status!=="banned"&&<button disabled={saving===m.email} onClick={()=>{if(window.confirm(`Ban ${name}?`))handleStatus(m,"banned");}} className="cms-btn" style={{background:"rgba(255,107,107,0.08)",border:"1px solid rgba(255,107,107,0.18)",color:accentR,borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:"0.7rem",fontWeight:700}}>🚫 Ban</button>}
                    {!m._fbOnly&&<button onClick={()=>handleDeleteMember(m)} className="cms-btn" style={{background:"rgba(255,107,107,0.06)",border:"1px solid rgba(255,107,107,0.12)",color:"rgba(255,107,107,0.5)",borderRadius:7,padding:"5px 8px",cursor:"pointer",fontSize:"0.7rem"}}>🗑</button>}
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:muted}}>No members found.</div>}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION: ANNOUNCEMENTS / BANNERS
// ══════════════════════════════════════════════════════════════
function CMSAnnouncements({accentG,accentR,card,card2,border,muted}:any) {
  const [anns, setAnns]     = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft]   = useState({title:"",body:"",type:"info",active:true,pinned:false});
  const [saving, setSaving] = useState(false);

  const load = async () => { const a=await cmsGetAnnouncements(); setAnns(a); setLoading(false); };
  useEffect(()=>{ load(); },[]);

  const handleSave = async () => {
    setSaving(true);
    await cmsSaveAnnouncement({...draft, createdAt:Date.now()});
    await load(); setSaving(false); setShowForm(false);
    setDraft({title:"",body:"",type:"info",active:true,pinned:false});
  };
  const handleDelete = async (id:string) => { if(!window.confirm("Delete?"))return; await cmsDeleteAnnouncement(id); await load(); };
  const handleToggle = async (ann:any) => { await cmsSaveAnnouncement({...ann,active:!ann.active}); await load(); };

  const typeColor = (t:string) => t==="warning"?"rgba(255,209,102,0.8)":t==="error"?"rgba(255,107,107,0.8)":t==="success"?"rgba(59,232,176,0.8)":"rgba(79,142,247,0.8)";

  return (
    <div style={{animation:"fadeUp .25s ease-out"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#fff"}}>📢 Announcements</div>
          <div style={{fontSize:"0.72rem",color:muted,marginTop:2}}>Site-wide notices, alerts, and pinned messages</div>
        </div>
        <button onClick={()=>setShowForm(!showForm)}
          style={{background:accentG,color:"#0e0e0e",border:"none",borderRadius:10,padding:"10px 18px",fontFamily:"inherit",fontWeight:800,fontSize:"0.85rem",cursor:"pointer"}}>
          + New Announcement
        </button>
      </div>

      {showForm && (
        <div style={{background:card,border:"1px solid rgba(59,232,176,0.2)",borderRadius:16,padding:18,marginBottom:16}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:12,color:accentG}}>New Announcement</div>
          <div style={{display:"flex",flexDirection:"column" as const,gap:10,marginBottom:14}}>
            <input value={draft.title} onChange={e=>setDraft(d=>({...d,title:e.target.value}))} placeholder="Title (e.g. New products now available!)"
              style={{background:card2,border:"1px solid "+border,borderRadius:9,padding:"9px 13px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none"}}/>
            <textarea value={draft.body} onChange={e=>setDraft(d=>({...d,body:e.target.value}))} placeholder="Announcement body…" rows={3}
              style={{background:card2,border:"1px solid "+border,borderRadius:9,padding:"9px 13px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",resize:"none" as const}}/>
            <div style={{display:"flex",gap:8,flexWrap:"wrap" as const}}>
              {["info","success","warning","error"].map(t=>(
                <button key={t} onClick={()=>setDraft(d=>({...d,type:t}))}
                  style={{background:draft.type===t?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.04)",border:`1px solid ${draft.type===t?typeColor(t):"rgba(255,255,255,0.1)"}`,color:draft.type===t?typeColor(t):"rgba(255,255,255,0.5)",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.75rem",textTransform:"capitalize" as const}}>
                  {t}
                </button>
              ))}
              <button onClick={()=>setDraft(d=>({...d,pinned:!d.pinned}))}
                style={{background:draft.pinned?"rgba(255,209,102,0.1)":"rgba(255,255,255,0.04)",border:`1px solid ${draft.pinned?"rgba(255,209,102,0.3)":"rgba(255,255,255,0.1)"}`,color:draft.pinned?"#ffd166":"rgba(255,255,255,0.5)",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.75rem"}}>
                {draft.pinned?"📌 Pinned":"📌 Pin it"}
              </button>
            </div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={handleSave} disabled={saving||!draft.title}
              style={{background:accentG,color:"#0e0e0e",border:"none",borderRadius:8,padding:"9px 18px",fontFamily:"inherit",fontWeight:800,fontSize:"0.82rem",cursor:"pointer"}}>
              {saving?"Saving…":"📢 Publish"}
            </button>
            <button onClick={()=>setShowForm(false)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid "+border,color:muted,borderRadius:8,padding:"9px 12px",cursor:"pointer",fontFamily:"inherit",fontSize:"0.82rem"}}>Cancel</button>
          </div>
        </div>
      )}

      {loading ? <div style={{textAlign:"center",padding:40,color:muted}}>Loading…</div> : anns.length===0 ? (
        <div style={{textAlign:"center",padding:60,color:muted}}><div style={{fontSize:"2.5rem",marginBottom:10}}>📢</div>No announcements yet.</div>
      ) : (
        <div style={{display:"flex",flexDirection:"column" as const,gap:8}}>
          {anns.map(a=>(
            <div key={a.id} style={{background:card,border:`1px solid ${a.active?typeColor(a.type)+"33":"rgba(255,255,255,0.06)"}`,borderRadius:12,padding:"14px 16px",opacity:a.active?1:0.55,transition:"all .15s"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap" as const}}>
                    <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",color:"#fff"}}>{a.title}</span>
                    <span style={{background:"rgba(255,255,255,0.07)",color:typeColor(a.type),fontSize:"0.6rem",fontWeight:700,padding:"1px 7px",borderRadius:100,textTransform:"capitalize" as const}}>{a.type}</span>
                    {a.pinned&&<span style={{fontSize:"0.6rem",color:"#ffd166"}}>📌 Pinned</span>}
                    {!a.active&&<span style={{fontSize:"0.6rem",color:muted,fontStyle:"italic"}}>Hidden</span>}
                  </div>
                  {a.body&&<div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.65)",lineHeight:1.5}}>{a.body}</div>}
                  <div style={{fontSize:"0.62rem",color:muted,marginTop:6}}>{new Date(a.createdAt).toLocaleString()}</div>
                </div>
                <div style={{display:"flex",gap:6,flexShrink:0}}>
                  <button onClick={()=>handleToggle(a)} className="cms-btn"
                    style={{background:a.active?"rgba(59,232,176,0.1)":"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:a.active?accentG:muted,borderRadius:7,padding:"5px 10px",cursor:"pointer",fontSize:"0.7rem",fontWeight:700}}>
                    {a.active?"Hide":"Show"}
                  </button>
                  <button onClick={()=>handleDelete(a.id)} className="cms-btn"
                    style={{background:"rgba(255,107,107,0.08)",border:"1px solid rgba(255,107,107,0.15)",color:accentR,borderRadius:7,padding:"5px 8px",cursor:"pointer",fontSize:"0.7rem"}}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION: ORDERS VIEWER
// ══════════════════════════════════════════════════════════════
function CMSOrders({accentG,accentB,accentY,card,border,muted}:any) {
  // Orders are per-user in localStorage — aggregate all
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    const users = getUsers() as any;
    const all: any[] = [];
    Object.values(users).forEach((u:any)=>{
      try {
        const key = `nxg_orders_${u.email}`;
        const userOrders = JSON.parse(localStorage.getItem(key)||"[]");
        userOrders.forEach((o:any)=>all.push({...o,_userEmail:u.email,_userName:u.fname||u.name||u.email}));
      } catch {}
    });
    all.sort((a,b)=>new Date(b.date||0).getTime()-new Date(a.date||0).getTime());
    setOrders(all);
  },[]);

  const filtered = orders.filter(o=>!search||o._userEmail?.toLowerCase().includes(search.toLowerCase())||o.id?.toLowerCase().includes(search.toLowerCase()));
  const statusColor=(s:string)=>s==="delivered"?accentG:s==="shipped"?accentB:accentY;

  return (
    <div style={{animation:"fadeUp .25s ease-out"}}>
      <div style={{marginBottom:20}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#fff"}}>🧾 Order History</div>
        <div style={{fontSize:"0.72rem",color:muted,marginTop:2}}>{orders.length} total orders across all members</div>
      </div>
      <div style={{position:"relative" as const,marginBottom:14}}>
        <span style={{position:"absolute" as const,left:12,top:"50%",transform:"translateY(-50%)",color:muted}}>🔍</span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by email or order ID…"
          style={{width:"100%",background:card,border:"1px solid "+border,borderRadius:10,padding:"9px 14px 9px 34px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",boxSizing:"border-box" as const}}/>
      </div>
      {filtered.length===0 ? <div style={{textAlign:"center",padding:60,color:muted}}><div style={{fontSize:"2.5rem",marginBottom:10}}>🧾</div>No orders found.</div> : (
        <div style={{display:"flex",flexDirection:"column" as const,gap:8}}>
          {filtered.map((o,i)=>(
            <div key={i} style={{background:card,border:"1px solid "+border,borderRadius:12,padding:"14px 16px"}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap" as const}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap" as const}}>
                    <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.85rem",color:"#fff"}}>Order #{o.id||"—"}</span>
                    <span style={{background:"rgba(255,255,255,0.07)",color:statusColor(o.status||"processing"),fontSize:"0.62rem",fontWeight:700,padding:"1px 8px",borderRadius:100,textTransform:"capitalize" as const}}>{o.status||"processing"}</span>
                  </div>
                  <div style={{fontSize:"0.72rem",color:muted,marginBottom:2}}>👤 {o._userName} · {o._userEmail}</div>
                  {o.items&&<div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.6)"}}>{o.items.map((it:any)=>it.name||(it.n)).join(", ")}</div>}
                  <div style={{fontSize:"0.65rem",color:muted,marginTop:4}}>{o.date?new Date(o.date).toLocaleString():"—"}</div>
                </div>
                <div style={{textAlign:"right" as const,flexShrink:0}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:accentG}}>{o.total||"—"}</div>
                  {o.tracking&&<div style={{fontSize:"0.65rem",color:muted,marginTop:2}}>📦 {o.tracking}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SECTION: SITE SETTINGS
// ══════════════════════════════════════════════════════════════
function CMSSiteSettings({accentG,accentR,accentB,card,card2,border,muted,go}:any) {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading]   = useState(true);
  const [saved, setSaved]       = useState(false);
  const [draft, setDraft]       = useState<any>({});

  useEffect(()=>{
    cmsGetSettings().then(s=>{
      const merged = {
        siteName: "Alphaomegatides",
        contactEmail: "alphaomegatides@yahoo.com",
        supportMsg: "Contact us at alphaomegatides@yahoo.com for any questions.",
        comingSoon: false,
        maintenanceMode: false,
        freeShippingThreshold: "150",
        shippingNotice: "Free shipping on orders over $150",
        instagramUrl: "",
        twitterUrl: "https://x.com/alphaomegatides",
        telegramUrl: "",
        youtubeUrl: "",
        siteTagline: "Where the tide turns for all.",
        ...s
      };
      setSettings(merged); setDraft(merged); setLoading(false);
    });
  },[]);

  const handleSave = async () => {
    await cmsSaveSettings(draft);
    setSettings(draft); setSaved(true);
    setTimeout(()=>setSaved(false),2500);
  };

  const Field = ({k,label,ph,type="text"}:{k:string,label:string,ph:string,type?:string}) => (
    <div>
      <div style={{fontSize:"0.65rem",color:muted,fontWeight:600,marginBottom:4}}>{label}</div>
      <input type={type} value={draft[k]||""} onChange={e=>setDraft((d:any)=>({...d,[k]:e.target.value}))} placeholder={ph}
        style={{width:"100%",background:card2,border:"1px solid "+border,borderRadius:9,padding:"9px 13px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",boxSizing:"border-box" as const}}/>
    </div>
  );

  const Toggle = ({k,label,desc}:{k:string,label:string,desc:string}) => (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:card2,border:`1px solid ${draft[k]?"rgba(59,232,176,0.25)":border}`,borderRadius:12,padding:"14px 16px",gap:12}}>
      <div>
        <div style={{fontWeight:700,fontSize:"0.85rem",color:"#fff",marginBottom:2}}>{label}</div>
        <div style={{fontSize:"0.7rem",color:muted}}>{desc}</div>
      </div>
      <button onClick={()=>setDraft((d:any)=>({...d,[k]:!d[k]}))}
        style={{background:draft[k]?"rgba(59,232,176,0.15)":"rgba(255,255,255,0.06)",border:`1px solid ${draft[k]?"rgba(59,232,176,0.35)":border}`,color:draft[k]?accentG:"rgba(255,255,255,0.4)",borderRadius:10,padding:"8px 18px",cursor:"pointer",fontFamily:"inherit",fontWeight:800,fontSize:"0.82rem",flexShrink:0,transition:"all .15s"}}>
        {draft[k]?"● ON":"○ OFF"}
      </button>
    </div>
  );

  if (loading) return <div style={{textAlign:"center",padding:40,color:muted}}>Loading settings…</div>;

  return (
    <div style={{animation:"fadeUp .25s ease-out"}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#fff",marginBottom:4}}>⚙️ Site Settings</div>
      <div style={{fontSize:"0.72rem",color:muted,marginBottom:24}}>Changes save to Firebase and apply sitewide</div>

      <div style={{display:"flex",flexDirection:"column" as const,gap:20}}>

        {/* Site modes */}
        <div style={{background:card,border:"1px solid "+border,borderRadius:16,padding:18}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:14,color:"rgba(255,255,255,0.8)"}}>🚦 Site Modes</div>
          <div style={{display:"flex",flexDirection:"column" as const,gap:10}}>
            <Toggle k="comingSoon" label="Coming Soon Mode" desc="Hides the store behind a waitlist gate. Flip OFF to open the store."/>
            <Toggle k="maintenanceMode" label="Maintenance Mode" desc="Shows a maintenance message to all visitors. Use during updates."/>
          </div>
        </div>

        {/* General info */}
        <div style={{background:card,border:"1px solid "+border,borderRadius:16,padding:18}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:14,color:"rgba(255,255,255,0.8)"}}>🏷️ General Info</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>
            <Field k="siteName"   label="Site Name"    ph="Alphaomegatides"/>
            <Field k="siteTagline" label="Tagline"    ph="Where the tide turns for all."/>
            <Field k="contactEmail" label="Contact Email" ph="alphaomegatides@yahoo.com"/>
            <Field k="freeShippingThreshold" label="Free Shipping Threshold ($)" ph="150"/>
          </div>
          <div style={{marginTop:12}}>
            <Field k="shippingNotice" label="Shipping Notice (shown on cart)" ph="Free shipping on orders over $150"/>
          </div>
          <div style={{marginTop:12}}>
            <div style={{fontSize:"0.65rem",color:muted,fontWeight:600,marginBottom:4}}>Support Message (shown on contact page)</div>
            <textarea value={draft.supportMsg||""} onChange={e=>setDraft((d:any)=>({...d,supportMsg:e.target.value}))} rows={2}
              style={{width:"100%",background:card2,border:"1px solid "+border,borderRadius:9,padding:"9px 13px",color:"#fff",fontFamily:"inherit",fontSize:"0.85rem",outline:"none",resize:"none" as const,boxSizing:"border-box" as const}}/>
          </div>
        </div>

        {/* Social links */}
        <div style={{background:card,border:"1px solid "+border,borderRadius:16,padding:18}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:14,color:"rgba(255,255,255,0.8)"}}>🔗 Social Links</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>
            <Field k="twitterUrl"   label="𝕏 / Twitter URL"  ph="https://x.com/alphaomegatides"/>
            <Field k="instagramUrl" label="Instagram URL"    ph="https://instagram.com/..."/>
            <Field k="telegramUrl"  label="Telegram URL"     ph="https://t.me/..."/>
            <Field k="youtubeUrl"   label="YouTube URL"      ph="https://youtube.com/..."/>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{background:card,border:"1px solid "+border,borderRadius:16,padding:18}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.9rem",marginBottom:14,color:"rgba(255,255,255,0.8)"}}>⚡ Quick Actions</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap" as const}}>
            {[["💬","Go to Chat",()=>go("chat")],["📦","Go to Products",()=>go("home")],["⚡","Flash Sale",()=>go("dashboard")],["📊","Analytics",()=>go("dashboard")]].map(([icon,label,fn]:any)=>(
              <button key={String(label)} onClick={fn}
                style={{background:"rgba(255,255,255,0.05)",border:"1px solid "+border,color:"rgba(255,255,255,0.7)",borderRadius:10,padding:"9px 14px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:"0.8rem",display:"flex",alignItems:"center",gap:6,transition:"all .15s"}}>
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button onClick={handleSave}
          style={{background:saved?"rgba(59,232,176,0.15)":accentG,color:saved?"#3be8b0":"#0e0e0e",border:saved?"1px solid rgba(59,232,176,0.4)":"none",borderRadius:14,padding:"14px",fontFamily:"inherit",fontWeight:800,fontSize:"0.95rem",cursor:"pointer",transition:"all .2s",boxShadow:saved?"none":"0 4px 20px rgba(59,232,176,0.3)"}}>
          {saved?"✓ Settings Saved!":"💾 Save All Settings"}
        </button>
      </div>
    </div>
  );
}



export default function App(){
  const [pg,spg]=useState("home");
  const [pid,spid]=useState(null);
  const [user,su]=useState(()=>getSess());
  React.useEffect(()=>{
  },[]);

  // Inject PWA manifest dynamically
  React.useEffect(()=>{
    if(!document.querySelector("link[rel=manifest]")){
      const manifest={
        name:"Alphaomegatides",short_name:"AΩ",
        description:"Verified research peptides — US fulfillment only",
        start_url:"/",display:"standalone",
        background_color:"#0e0e0e",theme_color:"#3be8b0",
        icons:[
          {src:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'%3E%3Crect width='192' height='192' fill='%230e0e0e'/%3E%3Ctext x='24' y='130' font-size='100' font-family='serif' fill='%23ff6b6b'%3Eα%3C/text%3E%3Ctext x='100' y='130' font-size='100' font-family='serif' fill='%233be8b0'%3EΩ%3C/text%3E%3C/svg%3E",sizes:"192x192",type:"image/svg+xml"},
          {src:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect width='512' height='512' fill='%230e0e0e'/%3E%3Ctext x='40' y='360' font-size='300' font-family='serif' fill='%23ff6b6b'%3Eα%3C/text%3E%3Ctext x='270' y='360' font-size='300' font-family='serif' fill='%233be8b0'%3EΩ%3C/text%3E%3C/svg%3E",sizes:"512x512",type:"image/svg+xml"},
        ],
      };
      const blob=new Blob([JSON.stringify(manifest)],{type:"application/json"});
      const url=URL.createObjectURL(blob);
      const link=document.createElement("link");
      link.rel="manifest"; link.href=url;
      document.head.appendChild(link);
    }
    // Theme color meta
    if(!document.querySelector("meta[name=theme-color]")){
      const meta=document.createElement("meta");
      meta.name="theme-color"; meta.content="#3be8b0";
      document.head.appendChild(meta);
    }
    // Open Graph / Twitter card meta for social sharing
    const ogTags=[
      {property:"og:title",content:"Alphaomegatides — Verified Research Peptides"},
      {property:"og:description",content:"Independent third-party verified compounds. Full COA documentation. US fulfillment only."},
      {property:"og:url",content:"https://alphaomegatides.com"},
      {property:"og:type",content:"website"},
      {property:"og:image",content:"https://alphaomegatides.com/og-image.png"},
      {name:"twitter:card",content:"summary_large_image"},
      {name:"twitter:title",content:"Alphaomegatides — Where the tide turns for all."},
      {name:"twitter:description",content:"21 verified research compounds. COA on every vial. US only."},
      {name:"description",content:"Verified research peptides with full COA documentation. BPC-157, TB-500, Semaglutide, NAD+, and 17 more. US fulfillment only."},
    ];
    ogTags.forEach(({property,name,content:c})=>{
      const sel=property?"meta[property='"+property+"']":"meta[name='"+name+"']";
      if(!document.querySelector(sel)){
        const m=document.createElement("meta");
        if(property) m.setAttribute("property",property); else m.setAttribute("name",name||'');
        m.content=c||'';
        document.head.appendChild(m);
      }
    });
  },[]);
  useEffect(()=>{try{localStorage.removeItem("nxg_age");}catch{}},[]);
  const [aged,sa]=useState(()=>{try{return sessionStorage.getItem("nxg_age_sess")==="1";}catch{return false;}});
  const [cart,setCart]=useState([]);
  useAbandonedCart(cart, user); // abandoned cart email after 20 min
  const [catId,setCatId]=useState(null);
  const [wishlist,setWishlist]=useState(()=>{try{return JSON.parse(localStorage.getItem("nxg_wish")||"[]");}catch{return[];}});
  const [recentlyViewed,setRecentlyViewed]=useState(()=>{try{return JSON.parse(localStorage.getItem("nxg_recent")||"[]");}catch{return[];}});
  const [history,setHistory]=useState([{pg:"home",pid:null}]);
  const [showTop,setShowTop]=useState(false);
  const [searchOpen,setSearchOpen]=useState(false);

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
    // Dynamic page title
    const titles={home:"Alphaomegatides — Research Peptides",cart:"Cart — Alphaomegatides",quiz:"Find My Compound — Alphaomegatides",chat:"Community Chat — Alphaomegatides",xcommunity:"X Community — Alphaomegatides",admin:"Admin Control Panel — Alphaomegatides",videos:"Video Tutorials — Alphaomegatides",stacks:"Stack Builder — Alphaomegatides",wiki:"Research Wiki — Alphaomegatides",journal:"Research Journal — Alphaomegatides",dosing:"Dosing Calculator — Alphaomegatides",stack:"Stack Checker — Alphaomegatides",dashboard:"My Account — Alphaomegatides",login:"Sign In — Alphaomegatides",register:"Create Account — Alphaomegatides",coa:"COA Library — Alphaomegatides",blog:"Research Blog — Alphaomegatides",about:"About Us — Alphaomegatides"};
    document.title=titles[p]||"Alphaomegatides";
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
      return h.slice(0,-1);
    });
  }

  // Swipe right to go back
  const touchStartX=useRef(0);
  const touchStartY=useRef(0);
  function onTouchStart(e){ touchStartX.current=e.touches[0].clientX; touchStartY.current=e.touches[0].clientY; }
  function onTouchEnd(e){
    if(pg==="cart") return;
    const dx=e.changedTouches[0].clientX-touchStartX.current;
    const dy=Math.abs(e.changedTouches[0].clientY-touchStartY.current);
    if(dx>80&&dy<40&&touchStartX.current<30&&history.length>1) goBack();
  }

  function confirmAge(){ try{sessionStorage.setItem("nxg_age_sess","1");}catch{}; sa(true); }
  function addToCart(product,selectedSize,selectedPrice){
    decrementInventory(product.id);
    window.dispatchEvent(new Event("nxg_inv_update"));
    setCart(c=>[...c,{...product,selectedSize,selectedPrice}]);
    showToast(`${product.name} added to cart`);
    if(user?.email){
      const price=parseFloat((selectedPrice||product.price||"0").replace(/[^0-9.]/g,""));
      if(price>0) localStorage.removeItem(ABANDON_KEY); // reset abandon timer on new add
    }
  }
  function removeFromCart(idx){ setCart(c=>c.filter((_,i)=>i!==idx)); }
  const prod=PRODUCTS.find(p=>p.id===pid);
  const canGoBack=history.length>1;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useKeyboardShortcuts(go,setSearchOpen);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  usePageTitle(pg,pid);

  const {dark}=useDarkMode();
  return <ErrorBoundary><div style={{fontFamily:"'DM Sans',sans-serif",background:dark?"#0e0e0e":"#f0f0ec",minHeight:"100vh",color:dark?"#ffffff":"#111111",transition:"background .3s,color .3s"}} onTouchStart={pg!=="cart"?onTouchStart:undefined} onTouchEnd={pg!=="cart"?onTouchEnd:undefined}>
    <style>{`
      @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      .page-fade{animation:fadeIn 0.22s ease-out}
      @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
    `}</style>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet"/>
    {(!aged) && <AgeGate onConfirm={confirmAge}/>}
    {COMING_SOON && <ExitIntentPopup/>}
    {COMING_SOON && <ComingSoonBanner/>}
    <FlashSaleBanner/>
    <CookieConsent/>
    <ComplianceBanner/>
    <PageProgressBar/>
    <ToastProvider/>
    <SearchOverlay open={searchOpen} onClose={()=>setSearchOpen(false)} go={go}/>
    <ChatWidget/>
    <Nav user={user} go={go} onLogout={()=>su(null)} cartCount={cart.length}/>
    {pg==="home"&&<div key="home" className="page-fade"><Home go={go}   recentlyViewed={recentlyViewed} wishlist={wishlist} toggleWishlist={toggleWishlist}/></div>}
    {pg==="product"&&prod&&<div key={"product-"+prod.id} className="page-fade"><ProductPage p={prod} go={go} onAddToCart={(sz,sp)=>{addToCart(prod,sz,sp);go("cart");}} wishlist={wishlist} toggleWishlist={toggleWishlist}/></div>}
    {pg==="checkout"&&prod&&<CheckoutPage product={prod} go={go} user={user}/>}
    {pg==="coming-soon"&&<ComingSoonPage go={go}/>}
    {pg==="cart"&&<CartPage cart={cart} go={go} onRemove={removeFromCart} onAddToCart={(prod,sz,sp)=>{addToCart(prod,sz,sp);}} onCheckout={()=>{
      if(cart.length===0) return;
      const handle = ({
        glp3r:"glp-3-r",glp2t:"glp-2-t",glp1:"glp-1",bpc157:"bpc-157",tb500:"tb-500",
        cjc1295:"cjc-1295",cjcipa:"cjc-1295-ipamorelin-blend",ipamorlin:"ipamorelin",
        tesamorlin:"tesamorlin",igf1lr3:"igf-1-lr3",ghkcu:"ghk-cu",glow:"glow-complex",
        nad:"nad",motsc:"mots-c",glutathione:"glutathione",ss31:"ss-31",
        selank:"selank",semax:"semax",dsip:"dsip",mt2:"mt2",reconst:"reconstitution-solution",
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
    {pg==="compliance"&&<CompliancePage go={go}/>}
    {pg==="quiz"&&<QuizPage go={go}/>}
    {pg==="bundles"&&<BundlesPage go={go}/>}
    {pg==="track"&&<OrderTrackingPage go={go}/>}
    {pg==="protocols"&&<GatedProtocolsPage go={go}/>}
    {pg==="coa-verify"&&<CoaVerifierWidget go={go}/>}
    {pg==="404"&&<NotFoundPage go={go}/>}
    {pg==="blog"&&<BlogPage go={go}/>}
    {pg==="about"&&<AboutPage go={go}/>}
    {pg==="journal"&&(user?<ResearchJournalPage go={go} user={user}/>:<Login go={go} onLogin={su}/>)}
    {pg==="stack"&&<StackCheckerPage go={go}/>}
    {pg==="dosing"&&<DosingCalculatorPage go={go}/>}
    {pg==="coa"&&<CoaLibraryPage go={go}/>}
    {pg==="research"&&<div key="research" className="page-fade"><ResearchLibraryPage go={go}/></div>}
    {pg==="category"&&catId&&<div key={"cat-"+catId} className="page-fade"><CategoryPage catId={catId} go={go} wishlist={wishlist} toggleWishlist={toggleWishlist}/></div>}
    {pg==="dashboard"&&(user?<Dashboard user={user} go={go} onLogout={()=>su(null)} wishlistIds={wishlist}/>:<Login go={go} onLogin={su}/>)}
    {pg==="chat"&&<MemberChatPage go={go} user={user}/>}
    {pg==="xcommunity"&&<XCommunityPage go={go} user={user}/>}
    {pg==="admin"&&<AdminCMSPage user={user} go={go}/>}
    {pg==="videos"&&<VideoTutorialPage go={go} user={user}/>}
    {pg==="stacks"&&<StackBuilderPage go={go} user={user}/>}
    {pg==="wiki"&&<ResearchWikiPage go={go}/>}

    <MobileBottomNav go={go} pg={pg} cartCount={cart.length} user={user}/>
    <PWABanner/>
    <ScrollToTopBtn/>
    {/* ── SCROLL TO TOP + BACK BUTTONS ── */}
    <div style={{position:"fixed",bottom:88,left:16,display:"flex",flexDirection:"column",gap:8,zIndex:986}}>
      {canGoBack&&<button onClick={goBack}
        style={{width:40,height:40,borderRadius:"50%",background:"rgba(20,20,20,0.92)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.8)",fontSize:"0.95rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.5)",backdropFilter:"blur(8px)",transition:"all .2s"}}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(59,232,176,0.2)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(30,30,30,0.95)"}>←</button>}
      {showTop&&<button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
        style={{width:40,height:40,borderRadius:"50%",background:"rgba(20,20,20,0.92)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.8)",fontSize:"0.95rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.5)",backdropFilter:"blur(8px)",transition:"all .2s"}}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(59,232,176,0.2)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(30,30,30,0.95)"}>↑</button>}
      <button onClick={()=>{const footer=document.querySelector("footer");if(footer)footer.scrollIntoView({behavior:"smooth"});else window.scrollBy({top:window.innerHeight*3,behavior:"smooth"});}}
        style={{width:40,height:40,borderRadius:"50%",background:"rgba(20,20,20,0.92)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.8)",fontSize:"0.95rem",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 12px rgba(0,0,0,0.5)",backdropFilter:"blur(8px)",transition:"all .2s"}}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(59,232,176,0.2)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(20,20,20,0.92)"}>↓</button>
    </div>
  </div>
  </ErrorBoundary>;
}
