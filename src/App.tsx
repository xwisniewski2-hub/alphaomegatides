// ╔═══════════════════════════════════════════════════════════════╗
// ║  ALPHAOMEGATIDES — App.tsx (Logically split, single deploy)  ║
// ║                                                               ║
// ║  SECTIONS (Ctrl+F to jump):                                  ║
// ║  §1 DATA        lines ~10    — products, bot QA, guides      ║
// ║  §2 UTILS       lines ~600   — auth, email, inventory        ║
// ║  §3 UI          lines ~870   — primitive components          ║
// ║  §4 COMPONENTS  lines ~1100  — Nav, Chat, Modals, Cards      ║
// ║  §5 PAGES       lines ~2600  — all route-level pages         ║
// ║  §6 APP         lines ~5450  — router & entry point          ║
// ╚═══════════════════════════════════════════════════════════════╝
import { useState, useRef, useEffect } from "react";
import React from "react";

// ════════════════════════════════════════════════════════════════
// §1 DATA — Edit here to change products, prices, content
// ════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// data.ts — ALL site data: products, bot QA, guides, bundles
// EDIT THIS FILE to update products, prices, content
// No React imports — pure data, fully tree-shakable
// ═══════════════════════════════════════════════════════════════

const COMING_SOON = true;
// ── SECURE: Add these to Vercel Dashboard → Settings → Environment Variables
// Then they are NOT in your bundle. Keys below are fallbacks for local dev only.
const RESEND_API_KEY = (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_RESEND_KEY) || "re_gNzYdNZU_4Yx2Y916iJb6dSiBniGRchZF";
const NOTIFY_EMAIL   = (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_NOTIFY_EMAIL) || "xwisniewski2@icloud.com";
const SITE_EMAIL     = "alphaomegatides@yahoo.com";

// ── LEGAL CONSTANTS ─────────────────────────────────────────────
const DISCLAIMER_SHORT = "⚠️ For research use only · Not for human consumption · Not FDA approved";
const DISCLAIMER_FULL  = "All products are sold exclusively for in-vitro laboratory and scientific research purposes only. These products are not intended for human or veterinary use, are not for food, drug, medical device, or cosmetic purposes, and have not been evaluated by the U.S. Food and Drug Administration. They are not intended to diagnose, treat, cure, mitigate, or prevent any disease or medical condition. All purchases are made under express agreement that the buyer is a qualified research professional and will comply with all applicable laws and regulations. US fulfillment only.";


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
     {n:"Reconstitution",text:"Add BAC water. Inject along inner vial wall. Store 2-8C.",chip:"Store 2-8C · Use within 4 weeks"},
     {n:"Dosing Reference",rows:[["Weeks 1-4","2mg weekly"],["Weeks 5-8","4mg weekly"],["Weeks 9-12","8mg weekly"],["Maintenance","Per protocol"]]},
     {n:"Timing",grid:[["Frequency","Once weekly"],["Half-life","~6 days"],["Fasting","Not required"],["Route","SubQ"]]},
     {n:"Sites",chip:"Abdomen · Upper thigh · Upper arm — rotate weekly"},
     {n:"Cycle",cycle:["12-24 Wks","4-8 Wks Off","Reassess"]},
   ],note:"For research use only. Not for human consumption.",
   chips:["GLP-1 · Appetite","GIP · Insulin","GCG · Metabolism"]},

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
     {n:"Reconstitution",text:"Add BAC water. Inject along inner vial wall. Store 2-8C.",chip:"Store 2-8C · Use within 4 weeks"},
     {n:"Dosing Reference",rows:[["Start","Low, titrate slowly"],["Frequency","Once weekly"],["Titration","Every 4 weeks"],["Maintenance","Per protocol"]]},
     {n:"Timing",grid:[["Frequency","Once weekly"],["Fasting","Not required"],["Route","SubQ"],["Titrate","Every 4 weeks"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate weekly"},
     {n:"Cycle",cycle:["12-20 Wks","4-8 Wks Off","Reassess"]},
   ],note:"For research use only. Not for human consumption.",
   chips:["GLP-1 · Satiety","GIP · Glucose"]},

  {id:"glp1",name:"GLP-1",tag:"Receptor Agonist",icon:"💊",color:"#f59e0b",
   sizes:[{s:"10mg",p:"$69.99"}],price:"$69.99",size:"10mg",
   desc:"GLP-1 receptor agonist peptide for metabolic and receptor signaling research. Studied for glucose-dependent insulin secretion and appetite regulation pathways.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-11-1778646578019-d95sw88ZNhz2wescn5y1WTXEz0bBB0.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-11-1778646587192-yTRhGn1HU1OA6uJl5fttiDd8dMvGPx.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"GLP-1 receptor agonist. Lyophilized powder for metabolic research."},
     {n:"Reconstitution",text:"Add BAC water. Store 2-8C.",chip:"Store 2-8C"},
     {n:"Dosing Reference",rows:[["Frequency","Weekly per protocol"],["Route","SubQ"],["Titration","Start low"],["Duration","Per protocol"]]},
     {n:"Timing",grid:[["Fasting","Optional"],["Route","SubQ"],["Frequency","Per protocol"],["Storage","2-8C"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate"},
     {n:"Cycle",cycle:["12-24 Wks","4-8 Wks Off","Reassess"]},
   ],note:"For research use only. Not for human consumption.",
   chips:["GLP-1 · Appetite","Incretin · Insulin"]},

  // Healing / Recovery
  {id:"bpc157",name:"BPC-157",tag:"Healing & Recovery",icon:"🧬",color:"#3be8b0",
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
     {n:"Dosing Reference",rows:[["Low","250mcg daily"],["Standard","500mcg daily"],["Split","250mcg AM + PM"],["Frequency","Daily or 5/2"]]},
     {n:"Timing",grid:[["Frequency","Daily"],["Fasting","Not required"],["Timing","Any time"],["Route","SubQ"]]},
     {n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
     {n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
   ],note:"For research use only. Not for human consumption.",
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
     {n:"Dosing Reference",rows:[["Loading","2-2.5mg 2x weekly (4 wks)"],["Maintenance","2mg once weekly"],["Pair with","BPC-157"],["Route","SubQ"]]},
     {n:"Timing",grid:[["Route","SubQ"],["Fasting","Not required"],["Pair with","BPC-157"],["Loading","4 weeks"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate"},
     {n:"Cycle",cycle:["4 Wks Loading","Monthly Maint.","Reassess"]},
   ],note:"For research use only. Not for human consumption.",
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
     {n:"Dosing Reference",rows:[["Solo","100-300mcg daily"],["With Ipamorlin","100-200mcg + Ipa"],["Frequency","Daily pre-sleep"],["On/Off","5 on/2 off"]]},
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
     {n:"Dosing Reference",rows:[["CJC","100-200mcg"],["Ipamorlin","100-200mcg"],["Frequency","Daily pre-sleep"],["On/Off","5 on/2 off"]]},
     {n:"Timing",grid:[["Timing","Pre-sleep"],["Fast Prior","2-3 hours"],["Frequency","Daily"],["Route","SubQ"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate daily"},
     {n:"Cycle",cycle:["8-16 Wks","8 Wks Off","Repeat"]},
   ],note:"For research use only. Not for human consumption.",
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
     {n:"Dosing Reference",rows:[["Standard","200-300mcg daily"],["With CJC","Pair for synergy"],["Frequency","Daily pre-sleep"],["Route","SubQ"]]},
     {n:"Timing",grid:[["Timing","Pre-sleep"],["Fast Prior","2-3 hours"],["Frequency","Daily"],["Pair with","CJC-1295"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate"},
     {n:"Cycle",cycle:["8-16 Wks","8 Wks Off","Repeat"]},
   ],note:"For research use only. Not for human consumption.",
   chips:["Ghrelin · Mimetic","GH · Selective","Pituitary · GHS"]},

  {id:"tesamorlin",name:"Tesamorlin",tag:"Peptide Research",icon:"💪",color:"#3be8b0",
   sizes:[{s:"10mg",p:"$104.99",oos:true}],price:"$104.99",size:"10mg",
   desc:"44-amino-acid GHRH analogue. FDA-approved as Egrifta for a specific indication. Phase 3 trials (800+ subjects) showed 15-20% visceral adipose tissue reduction over 26 weeks.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-6-1763749486044-8WiJdGIYz0W4MP72nRu188hyaxBkpL.pdf"},
     {name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-6-1773187459634-llmEIzOCoe319hv6HGjdTaiIaD28WG.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"10mg Tesamorlin. 2mg daily abdomen-only protocol from Phase 3 trials."},
     {n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C, 14 days.",chip:"10mg + 2.0mL = 5mg/mL · 40 units = 2mg"},
     {n:"Dosing Reference",rows:[["Standard","2mg daily"],["Units","40 units U-100"],["Frequency","Daily or 5/2"],["Site","Abdomen only"]]},
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
     {n:"Dosing Reference",rows:[["Range","20-100mcg per session"],["Frequency","Post-protocol or daily"],["Duration","4-6 week cycles"],["Route","SubQ or IM"]]},
     {n:"Timing",grid:[["Timing","Post-workout or AM"],["Fasting","Optional"],["Route","SubQ or IM"],["Storage","2-8C"]]},
     {n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
     {n:"Cycle",cycle:["4-6 Wks","Equal Off","Repeat"]},
   ],note:"For research use only. Not for human consumption.",
   chips:["IGF-1 · Receptor","Cell · Proliferation","Long-Acting"]},

  // Skin / Longevity
  {id:"ghkcu",name:"GHK-CU",tag:"Research Compound",icon:"✨",color:"#ffd166",
   sizes:[{s:"50mg",p:"$69.99"},{s:"100mg",p:"$89.99"}],price:"$69.99",size:"50mg",
   desc:"Copper-binding tripeptide for matrix-signaling, extracellular matrix remodeling, wound healing, and tissue-response research. 4,000+ gene activations documented. Blue solution upon reconstitution is normal.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-ghk-cu-1773293121756-gwxac3G4JMVWf83ipvr4iC0pd7NZKN.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-ghk-cu-1773338108928-EmBZDHNLos5rzgQrXxmCqym1b65zXk.pdf"},
     {name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-ghk-cu-ghkcu-50mg-PL-GHK5-01-1779160636565-BU0zi5qhqk0PiduSBQsdl1DycDdWKa.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"50mg or 100mg GHK-Cu. Blue solution upon reconstitution is normal — confirms copper binding."},
     {n:"Reconstitution",text:"50mg + 2.5mL BAC water = 20mg/mL. Roll gently.",chip:"50mg + 2.5mL = 20mg/mL"},
     {n:"Dosing Reference",rows:[["Start","1mg (5 units) daily"],["Standard","2mg (10 units) daily"],["Maintenance","2mg 3x/week"],["Cycle","30 days on/off"]]},
     {n:"Timing",grid:[["Timing","Any / Evening"],["Fasting","Not required"],["Frequency","Daily or 3x/wk"],["Blue tint","Normal"]]},
     {n:"Sites",chip:"Abdomen · Thigh · Upper arm — rotate each session"},
     {n:"Cycle",cycle:["30 Days","30 Days Off","Repeat"]},
   ],note:"For research use only. Cycle to avoid copper accumulation.",
   chips:["Copper · Matrix","ECM · Remodeling","4000+ Genes"]},

  {id:"glow",name:"Glow Complex",tag:"Skin Research",icon:"🌟",color:"#ec4899",
   sizes:[{s:"70mg",p:"$129.99"}],price:"$129.99",size:"70mg",
   desc:"Skin health research blend: GHK-Cu + BPC-157 + Thymosin Beta-4. Three peptides studied for matrix modulation, tissue repair, and cellular regeneration.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-5-1763749124814-sKOrPtpAmv6YYGhQd4k5qR0Aze5IFf.pdf"},
     {name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-5-1774671600788-cWtxxEzNxCjiM76KwwMXEzY5Kr2hMU.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"GHK-Cu + BPC-157 + Thymosin Beta-4. Blue tint from GHK-Cu is normal."},
     {n:"Reconstitution",text:"Add 2.0mL BAC water = 5mg/mL. Store 2-8C.",chip:"10mg + 2.0mL = 5mg/mL"},
     {n:"Dosing Reference",rows:[["Standard","0.5mL (2.5mg) daily"],["Frequency","Daily or 3x/week"],["Duration","30-day cycles"],["Route","SubQ"]]},
     {n:"Timing",grid:[["Timing","Any / Evening"],["Fasting","Not required"],["Frequency","Daily or 3x/wk"],["Blue tint","Normal"]]},
     {n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
     {n:"Cycle",cycle:["30 Days","30 Days Off","Repeat"]},
   ],note:"For research use only. Not for human consumption.",
   chips:["GHK-Cu · Matrix","BPC-157 · Repair","TB4 · Regen"]},

  // Metabolic / Anti-aging
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
     {n:"Dosing Reference",rows:[["IV","250-500mg per session"],["SubQ","25-100mg per session"],["Frequency","Per protocol"],["Duration","Ongoing or cyclical"]]},
     {n:"Timing",grid:[["Form","Powder"],["Route","Per protocol"],["Storage","2-8C"],["Purity","99%+"]]},
     {n:"Sites",chip:"Per protocol — IV or SubQ"},
     {n:"Cycle",text:"Ongoing or per institutional research protocol."},
   ],note:"For research use only. Not for human consumption.",
   chips:["Mitochondria · ATP","Sirtuin · Activation","DNA · Repair"]},

  {id:"motsc",name:"MOTS-c",tag:"Metabolic Research",icon:"🔋",color:"#059669",
   sizes:[{s:"10mg",p:"$69.99"},{s:"40mg",p:"$148.99"}],price:"$69.99",size:"10mg",
   desc:"Mitochondria-derived peptide for metabolic regulation, insulin sensitivity, and cellular signaling research. Studied for exercise performance pathway modulation.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-10-1763749465086-YKTFziseRwSO6ol6o1BuLt4SiyxdxV.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-10-1777405411289-W9wxODokhtbt0SbNogqus7tcsgGHiV.pdf"},
     {name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-10-1778855517228-zp8dNMT5n5qL3G7uoQdZJdD7JJUQO7.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"5mg MOTS-c. Mitochondria-derived peptide for metabolic signaling research."},
     {n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C, 14 days.",chip:"5mg + 1.0mL = 5mg/mL"},
     {n:"Dosing Reference",rows:[["Standard","5-10mg per session"],["Frequency","Daily or 3x/week"],["Duration","4-8 week cycles"],["Route","SubQ or IV"]]},
     {n:"Timing",grid:[["Timing","AM or pre-exercise"],["Fasting","Optional"],["Route","SubQ or IV"],["Frequency","Daily or 3x/wk"]]},
     {n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
     {n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
   ],note:"For research use only. Not for human consumption.",
   chips:["Mitochondrial","Insulin · Sensitivity","Metabolism"]},

  {id:"glutathione",name:"Glutathione",tag:"Antioxidant Research",icon:"🌱",color:"#3be8b0",
   sizes:[{s:"600mg",p:"$60.00",oos:true},{s:"1500mg",p:"$94.99"}],price:"$60.00",size:"600mg",
   desc:"Master antioxidant tripeptide for oxidative stress modulation, immune system support, and detoxification pathway research.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-4-1763749430103-ZyqU1Q36RqIuoXwk0Wm1rsc1xj1HOZ.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"600mg Glutathione. Master antioxidant for oxidative stress and cellular research."},
     {n:"Reconstitution",text:"Dissolve in sterile saline. Store 2-8C.",chip:"600mg · Per research protocol"},
     {n:"Dosing Reference",rows:[["IV","600-1200mg per session"],["SubQ","100-200mg daily"],["Frequency","Per protocol"],["Duration","Ongoing or cyclical"]]},
     {n:"Timing",grid:[["Route","IV or SubQ"],["Storage","2-8C"],["Purity","99%+"],["Quantity","600mg"]]},
     {n:"Sites",chip:"Per protocol — IV or SubQ"},
     {n:"Cycle",text:"Ongoing or per institutional research protocol."},
   ],note:"For research use only. Not for human consumption.",
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
     {n:"Dosing Reference",rows:[["Standard","1-3mg per session"],["Frequency","Daily or 3x/week"],["Route","SubQ or IV"],["Duration","4-8 week cycles"]]},
     {n:"Timing",grid:[["Route","SubQ or IV"],["Fasting","Optional"],["Frequency","Daily or 3x/wk"],["Storage","2-8C"]]},
     {n:"Sites",chip:"Abdomen · Thigh — rotate sites"},
     {n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
   ],note:"For research use only. Not for human consumption.",
   chips:["Mito · Shield","Cardiolipin · Bind","ROS · Reduction"]},

  // Cognitive / Neuro
  {id:"selank",name:"Selank",tag:"Cognitive Research",icon:"🧠",color:"#7c3aed",
   sizes:[{s:"10mg",p:"$55.00"}],price:"$55.00",size:"10mg",
   desc:"Heptapeptide for anxiolytic and cognitive research. Studied for GABA-modulation, neuroprotective, and anti-anxiety pathway investigations.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-18-1774490082637-IgnunVen9CUQIcDK2N5u5TpNgbFLgs.pdf"},
     {name:"COA #2",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-18-1777405595859-jAcpOTFKwlbWvUdUxokJmZpMCOTyoh.pdf"},
     {name:"COA #3 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-18-1778891198541-i07pVVqRkdpGaqdzSG613v1yv2wh1K.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"5mg Selank. Anxiolytic and cognitive research. SubQ or nasal."},
     {n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C.",chip:"5mg + 1.0mL = 5mg/mL"},
     {n:"Dosing Reference",rows:[["Standard","250-500mcg per session"],["Frequency","1-2x daily"],["Route","SubQ or nasal"],["Duration","4-8 weeks"]]},
     {n:"Timing",grid:[["Timing","AM or midday"],["Fasting","Not required"],["Route","SubQ or nasal"],["Frequency","1-2x/day"]]},
     {n:"Sites",chip:"SubQ · Abdomen · Thigh — or nasal"},
     {n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
   ],note:"For research use only. Not for human consumption.",
   chips:["GABA · Modulation","Anxiolytic","Neuroprotection"]},

  {id:"semax",name:"Semax",tag:"Cognitive Research",icon:"🧬",color:"#6366f1",
   sizes:[{s:"10mg",p:"$54.99"}],price:"$54.99",size:"10mg",
   desc:"ACTH(4-7) analogue heptapeptide for cognitive and neuroprotective research. Studied for BDNF production, neuroprotection, and cognitive performance models.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-14-1770215634519-jPqwlhW7RtuPKoMgeFmO0ebh0cFFAm.pdf"},
     {name:"COA #2 Latest",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-14-1777405557785-d1crBk5f3SONotj8qoXcnQqduJsWbI.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"5mg Semax. ACTH analogue for cognitive and neuroprotective research."},
     {n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C.",chip:"5mg + 1.0mL = 5mg/mL"},
     {n:"Dosing Reference",rows:[["Standard","200-600mcg per session"],["Frequency","1-2x daily"],["Route","SubQ or nasal"],["Duration","4-8 weeks"]]},
     {n:"Timing",grid:[["Timing","AM or midday"],["Fasting","Not required"],["Route","SubQ or nasal"],["Frequency","1-2x/day"]]},
     {n:"Sites",chip:"SubQ · Abdomen — or nasal per protocol"},
     {n:"Cycle",cycle:["4-8 Wks","4 Wks Off","Repeat"]},
   ],note:"For research use only. Not for human consumption.",
   chips:["BDNF · Production","Neuroprotection","Cognitive · Perf"]},

  {id:"dsip",name:"DSIP",tag:"Sleep Research",icon:"🌙",color:"#3730a3",
   sizes:[{s:"5mg",p:"$49.99"}],price:"$49.99",size:"5mg",
   desc:"Delta Sleep Inducing Peptide for sleep regulation and circadian rhythm research. Studied for sleep architecture modulation and neuroendocrine signaling.",
   coa:{purity:"99%+",labs:["Freedom Diagnostics"],tests:[
     {name:"COA #1",result:"99%+ · PASS",url:"https://sygpovk2lkvrukw3.public.blob.vercel-storage.com/coa-dsip-1775224381176-2Z8JnwtpTF53mh8AQTOUgBXF7L06N2.pdf"},
   ]},
   guide:[
     {n:"Overview",text:"5mg DSIP. Nonapeptide for sleep regulation and circadian rhythm research."},
     {n:"Reconstitution",text:"Add 1.0mL BAC water = 5mg/mL. Store 2-8C, 14 days.",chip:"5mg + 1.0mL = 5mg/mL"},
     {n:"Dosing Reference",rows:[["Standard","25-50mcg pre-sleep"],["Frequency","Pre-sleep"],["Route","SubQ or IV"],["Duration","Per protocol"]]},
     {n:"Timing",grid:[["Timing","Pre-sleep"],["Fasting","Optional"],["Route","SubQ or IV"],["Frequency","Per protocol"]]},
     {n:"Sites",chip:"SubQ · Abdomen — pre-sleep"},
     {n:"Cycle",text:"Per institutional research protocol."},
   ],note:"For research use only. Not for human consumption.",
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
     {n:"Dosing Reference",rows:[["Standard","0.5-2mg pre-sleep"],["Route","SubQ"],["Timing","30-60 min pre-sleep"],["Duration","Ongoing per protocol"]]},
     {n:"Timing",grid:[["Timing","Pre-sleep"],["Fasting","Not required"],["Route","SubQ"],["Duration","Ongoing"]]},
     {n:"Sites",chip:"SubQ · Abdomen — pre-sleep"},
     {n:"Cycle",text:"Ongoing per sleep research protocol."},
   ],note:"For research use only. Not for human consumption.",
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
     {n:"Usage",text:"Inject along inner vial wall. Swirl gently — never shake.",chip:"0.9% Benzyl Alcohol · 30mL"},
     {n:"Storage",rows:[["Store","Room temp or refrigerated"],["Multi-dose","OK with benzyl alcohol"],["Sterility","Up to 28 days"],["Volume","30mL"]]},
     {n:"Tips",grid:[["Motion","Swirl only"],["Angle","Along inner wall"],["Syringe","Fresh per draw"],["Compat.","All peptide powders"]]},
     {n:"Notes",text:"Benzyl alcohol maintains sterility across multiple draws."},
     {n:"Cycle",text:"Accessory — no cycle required."},
   ],note:"For research use only. For reconstituting research compounds only.",
   chips:["Bacteriostatic","0.9% · Benzyl","Multi-Dose"]},
];
const SAMPLE_ORDERS = [
  {id:"NXG-00124",date:"2026-05-18",product:"GLP-3 / Retatrutide",qty:1,price:"$120.00",status:"shipped",tracking:"9400111899223456789012"},
  {id:"NXG-00098",date:"2026-04-02",product:"GHK-Cu 100mg",qty:2,price:"$140.00",status:"delivered",tracking:"9400111899223456789001"},
];

const BOT_QA = [
  // ── Products ──
  {q:["what is retatrutide","what is glp-3","glp-3","retatrutide","triple agonist"],
   a:"GLP-3 / Retatrutide is a next-generation triple-receptor agonist targeting GLP-1, GIP, and glucagon receptors simultaneously. Published Phase 2 data (NEJM) documented up to 24% body weight reduction over 48 weeks — greater than any single or dual agonist studied. Supplied as a 24mg lyophilized vial. For research use only."},
  {q:["cjc-1295","cjc 1295","cjc","ipamorelin","gh stack","growth hormone stack","tesamorelin stack"],
   a:"The CJC-1295 No DAC + Ipamorelin + Tesamorelin stack is a three-compound GH secretagogue research kit. CJC-1295 No DAC and Ipamorelin act on two separate receptor pathways, producing synergistic GH output documented at 2–3× either compound alone. Tesamorelin adds targeted GHRH stimulation. Supplied as a 40mg stack kit. For research use only."},
  {q:["ghk-cu","ghk cu","ghk","copper peptide","copper"],
   a:"GHK-Cu is a naturally occurring copper peptide complex documented to activate 4,000+ genes related to collagen synthesis, wound healing, and anti-inflammatory pathways. It reconstitutes to a light blue solution — this is normal and confirms proper copper-peptide binding. Supplied as 100mg lyophilized powder. For research use only."},
  {q:["what is tesamorelin","tesamorelin alone","tesamorelin solo"],
   a:"Tesamorelin is a synthetic 44-amino-acid GHRH analogue. It is FDA-approved under the name Egrifta for a specific indication and has been extensively studied in metabolic and body composition research. Phase 3 trials (800+ subjects) documented 15–20% visceral adipose tissue reduction over 26 weeks. Supplied as a 20mg vial. For research use only."},
  // ── Reconstitution ──
  {q:["reconstitute","reconstitution","mix","how to mix","bac water","bacteriostatic","how much water"],
   a:"All Alphaomegatides vials are lyophilized (freeze-dried) powders requiring reconstitution with bacteriostatic water before use. General guidelines: Retatrutide 24mg → add 2.4mL = 10mg/mL. GHK-Cu 100mg → add 5.0mL = 20mg/mL. Tesamorelin 20mg → add 3.0mL = 6.67mg/mL. Always inject water slowly along the inner vial wall — never directly onto the powder. Swirl gently, never shake. Full guides are on each product page."},
  {q:["store","storage","refrigerate","freeze","how to store","shelf life"],
   a:"After reconstitution: store all peptides refrigerated at 2–8°C (35–46°F). Do not freeze reconstituted solutions. Typical use windows: Retatrutide — within 4 weeks. GHK-Cu — within 30 days. Tesamorelin — within 14 days. Lyophilized (unreconstituted) vials should be stored at 2–8°C away from light until use."},
  {q:["insulin syringe","syringe","needle","units","how to draw","u-100","u100"],
   a:"Use U-100 insulin syringes for subcutaneous peptide research administration. On a U-100 syringe, 1 unit = 0.01mL. At 10mg/mL concentration, 10 units = 100mcg. At 20mg/mL, 5 units = 1mg. Detailed unit math for each compound is on the product's research protocol page."},
  // ── Dosing / Protocols ──
  {q:["dose","dosing","how much","how many","mcg","mg","protocol","titration"],
   a:"Dosing reference data is available on each product page under 'Research Protocol Reference'. General published references: Retatrutide — start 2mg/week, titrate to 4–12mg. CJC-1295 No DAC — 100–300mcg/day. Ipamorelin — 200–300mcg/day. Tesamorelin — 2mg/day. GHK-Cu — 1–2mg per session, 3–5×/week. All dosing information is for research reference only."},
  {q:["cycle","how long","cycle length","on off","weeks on","rest period"],
   a:"Published research cycle references: Retatrutide — 12–24 weeks. GH Stack (CJC/Ipa/Tesa) — 8–16 weeks on, 8 weeks off. Tesamorelin — 8–16 weeks on, 4–8 weeks off. Phase 3 ran 26–52 weeks. GHK-Cu — 30 days on, 30 days off. Cycle lengths are for research reference purposes only."},
  {q:["timing","when to inject","when to administer","best time","fasting","empty stomach","before bed","morning"],
   a:"Administration timing notes from published protocols: GH peptides (CJC-1295, Ipamorelin, Tesamorelin) — pre-sleep on empty stomach; elevated insulin attenuates GH secretion. Retatrutide — once weekly, timing flexible given ~6-day half-life. GHK-Cu — no fasting requirement; evening is common in protocols. All for research reference only."},
  {q:["injection site","where to inject","subcutaneous","subq","abdomen","rotate"],
   a:"Published research protocols use subcutaneous (SubQ) administration — injection into the fatty tissue layer. Common sites: abdomen (most common, required for Tesamorelin), upper thigh, upper arm. Rotate sites each session to prevent local tissue irritation. Pinch a skinfold, insert needle at 45–90°, inject slowly."},
  {q:["half life","half-life","how often","frequency","once a week","daily","weekly"],
   a:"Published half-life data: Retatrutide — ~6 days (once-weekly dosing). CJC-1295 No DAC — ~30 minutes (daily dosing). Ipamorelin — ~2 hours (daily). Tesamorelin — ~26–38 minutes (daily). GHK-Cu — short, typically dosed 3–5×/week. CJC-1295 No DAC's short half-life is intentional — it preserves pulsatile GH release."},
  // ── Peptide science ──
  {q:["what is a peptide","peptide","how do peptides work","peptides work"],
   a:"Peptides are short chains of amino acids — the building blocks of proteins. In research, synthetic peptides are designed to mimic or modulate naturally occurring signaling molecules. They interact with specific receptors to trigger biological responses. Research peptides like those at Alphaomegatides are studied for their roles in metabolic pathways, tissue repair, and hormonal signaling."},
  {q:["lyophilized","freeze dried","powder","white powder","vial"],
   a:"Lyophilization (freeze-drying) removes water from the peptide to create a stable powder that preserves potency during storage and shipping. The powder must be reconstituted with bacteriostatic water before use. Lyophilized peptides are more stable than liquid formulations and have longer shelf lives."},
  {q:["glp-1","glp1","semaglutide","ozempic","compared","difference between"],
   a:"GLP-1 agonists like semaglutide activate only the GLP-1 receptor. Retatrutide (GLP-3) activates three receptors: GLP-1, GIP, and glucagon. The added GIP agonism enhances insulin secretion synergistically, while glucagon receptor activation increases energy expenditure and fat oxidation — mechanisms not present in single-agonist compounds. Phase 2 data showed greater weight reduction with retatrutide than semaglutide or tirzepatide in comparative analysis."},
  {q:["growth hormone","gh","hgh","igf","igf-1","secretagogue"],
   a:"Growth hormone secretagogues (like CJC-1295 and Ipamorelin) stimulate the pituitary to release endogenous GH rather than directly administering exogenous HGH. This approach preserves natural pulsatile GH release patterns and hypothalamic-pituitary feedback loops. IGF-1 (Insulin-like Growth Factor 1) is downstream of GH and is often monitored in published GH peptide research protocols."},
  {q:["bpc-157","bpc","tb-500","tb500","body protection"],
   a:"BPC-157 and TB-500 are popular research peptides studied for tissue repair and healing mechanisms. While we don't currently carry these as standalone products, our GHK-Cu compound has well-documented roles in wound healing, collagen synthesis, and regenerative pathways. Check back — our compound lineup is expanding."},
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
   a:"All Alphaomegatides products are for research use only — not for human consumption. Safety profiles vary by compound and are documented in published clinical and preclinical literature, available on each product page. GHK-Cu has a particularly high safety margin (~300× above documented research doses). Researchers should review all published data and institutional protocols before handling any compound."},
  {q:["legal","law","regulated","controlled","prescription","illegal"],
   a:"Research peptides occupy a complex regulatory space. They are not FDA-approved for human use and are not scheduled controlled substances in the US. They are legal to purchase and possess for legitimate research purposes. Researchers are responsible for compliance with all applicable institutional, local, state, and federal regulations."},
  {q:["human","not for human","consume","eat","drink","inject yourself"],
   a:"Alphaomegatides products are strictly for in-vitro and laboratory research use only. They are not intended for human or veterinary use, are not FDA-approved for human consumption, and should not be self-administered. All product documentation and protocols are provided for research reference purposes only."},
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



// ════════════════════════════════════════════════════════════════
// §2 UTILS
// ════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// utils.ts — Pure business logic, no React
// Covers: auth, inventory, reviews, email, affiliate, helpers
// ═══════════════════════════════════════════════════════════════

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


// ── REVIEWS ──────────────────────────────────────────────────────
interface Review { id:string; productId:string; name:string; rating:number; text:string; date:string; verified:boolean; }

function getReviews(productId:string): Review[] {
  try { const all=JSON.parse(localStorage.getItem("aot_reviews")||"{}"); return (all[productId]||[]) as Review[]; } catch { return []; }
}
function saveReview(review: Review) {
  try { const all=JSON.parse(localStorage.getItem("aot_reviews")||"{}"); if(!all[review.productId])all[review.productId]=[]; all[review.productId].unshift(review); localStorage.setItem("aot_reviews",JSON.stringify(all)); } catch {}
}

// ── AFFILIATE ─────────────────────────────────────────────────────
function initAffiliateTracking() {
  try {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || params.get("aff") || params.get("utm_source");
    if (ref) {
      localStorage.setItem("aot_ref", ref);
      localStorage.setItem("aot_ref_ts", Date.now().toString());
    }
  } catch {}
}
initAffiliateTracking();

function getAffiliateRef(): string { try { return localStorage.getItem("aot_ref") || ""; } catch { return ""; } }



// ════════════════════════════════════════════════════════════════
// §3 UI PRIMITIVES
// ════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// ui.tsx — Reusable UI primitives
// Accessible, memoized, zero business logic
// ═══════════════════════════════════════════════════════════════


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

function PrimaryBtn({children,onClick,color="#3be8b0",tc="#0e0e0e",full,style={}}){
  const [h,sh]=useState(false);
  return <button onClick={onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
    style={{background:h?"#4f8ef7":color,color:tc,border:"none",padding:"13px 28px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:"0.9rem",transition:"all .2s",width:full?"100%":"auto",...style}}>{children}</button>;
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



// ════════════════════════════════════════════════════════════════
// §4 COMPONENTS
// ════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// components.tsx — All reusable components
// Each could be its own file; combined for single-file deployment
// ═══════════════════════════════════════════════════════════════




function Nav({user,go,onLogout,cartCount}){
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  const CATS=[
    {label:"Weight Loss",ids:["glp3r","glp2t","glp1"]},
    {label:"Recovery & Healing",ids:["bpc157","tb500","ghkcu","glow"]},
    {label:"Growth & Longevity",ids:["cjc1295","cjcipa","ipamorlin","tesamorlin","igf1lr3","nad","motsc","ss31","glutathione"]},
    {label:"Neuro & Sleep",ids:["selank","semax","dsip","mt2"]},
  ];
  return <>
    {/* Overlay */}
    {open&&<div onClick={close} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:996,backdropFilter:"blur(2px)"}}/>}

    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:998,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",background:"rgba(10,10,10,0.97)",backdropFilter:"blur(10px)",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
      {/* LEFT — hamburger */}
      <button onClick={()=>setOpen(p=>!p)} style={{background:"none",border:"none",padding:"6px 8px",cursor:"pointer",display:"flex",flexDirection:"column",gap:5,alignItems:"center",justifyContent:"center",borderRadius:8,minHeight:"auto"}}>
        <span style={{display:"block",width:22,height:2,background:open?C.b:C.ink,borderRadius:2,transition:"all .25s",transform:open?"rotate(45deg) translate(5px,5px)":"none"}}/>
        <span style={{display:"block",width:22,height:2,background:open?C.b:C.ink,borderRadius:2,transition:"all .25s",opacity:open?0:1}}/>
        <span style={{display:"block",width:22,height:2,background:open?C.b:C.ink,borderRadius:2,transition:"all .25s",transform:open?"rotate(-45deg) translate(5px,-5px)":"none"}}/>
      </button>

      {/* CENTER — logo: α · DNA horizontal · Ω */}
      <div onClick={()=>{go("home");close();}} style={{cursor:"pointer",position:"absolute",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:4}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",color:"#ff6b6b",lineHeight:1}}>α</span>
        <svg width="60" height="22" viewBox="0 0 14 28" fill="none" style={{transform:"rotate(90deg)"}}>
          <defs><linearGradient id="navdna" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#ff6b6b"/><stop offset="50%" stopColor="#a855f7"/><stop offset="100%" stopColor="#3be8b0"/></linearGradient></defs>
          <path d="M3 0 C1 4,1 8,3 12 C5 16,6 20,4 24 C3 26,2 27,2 28" stroke="url(#navdna)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M11 0 C13 4,13 8,11 12 C9 16,8 20,10 24 C11 26,12 27,12 28" stroke="url(#navdna)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <line x1="3" y1="0" x2="11" y2="0" stroke="rgba(255,107,107,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="2" y1="7" x2="12" y2="7" stroke="rgba(168,85,247,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="4" y1="14" x2="10" y2="14" stroke="rgba(100,150,255,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="3" y1="21" x2="11" y2="21" stroke="rgba(59,232,176,0.6)" strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="3" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/>
          <circle cx="11" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/>
          <circle cx="4" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/>
          <circle cx="10" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/>
          <circle cx="3" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/>
          <circle cx="11" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/>
        </svg>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",color:"#3be8b0",lineHeight:1}}>Ω</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.52rem",letterSpacing:"0.13em",color:"rgba(255,255,255,0.45)",textTransform:"uppercase",marginLeft:4}}>Alphaomegatides</span>
      </div>

      {/* RIGHT — cart + account icon */}
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {/* Dark mode stub — shows toggle icon */}
        <DarkModeBtn/>
        {/* Search */}
        <button onClick={()=>{setSearchOpen(p=>!p);close();}} style={{background:"none",border:"none",cursor:"pointer",padding:"6px 8px",minHeight:"auto",borderRadius:8,color:"rgba(255,255,255,0.5)",fontSize:"1.1rem"}} title="Search (/)">🔍</button>
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
    <div style={{position:"fixed",top:0,left:0,bottom:0,width:Math.min(320,window.innerWidth-40),background:"#111111",zIndex:997,transform:open?"translateX(0)":"translateX(-100%)",transition:"transform .28s cubic-bezier(.4,0,.2,1)",overflowY:"auto",boxShadow:open?"4px 0 32px rgba(0,0,0,0.18)":"none",display:"flex",flexDirection:"column"}}>
      {/* Drawer header */}
      <div style={{padding:"20px 20px 16px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",color:"#ff6b6b",lineHeight:1,textShadow:"0 0 10px rgba(255,107,107,0.4)"}}>α</span>
          <svg width="60" height="22" viewBox="0 0 14 28" fill="none" style={{transform:"rotate(90deg)"}}><defs><linearGradient id="drawerdna" x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#ff6b6b"/><stop offset="50%" stopColor="#a855f7"/><stop offset="100%" stopColor="#3be8b0"/></linearGradient></defs><path d="M3 0 C1 4,1 8,3 12 C5 16,6 20,4 24 C3 26,2 27,2 28" stroke="url(#drawerdna)" strokeWidth="1.8" fill="none" strokeLinecap="round"/><path d="M11 0 C13 4,13 8,11 12 C9 16,8 20,10 24 C11 26,12 27,12 28" stroke="url(#drawerdna)" strokeWidth="1.8" fill="none" strokeLinecap="round"/><line x1="3" y1="0" x2="11" y2="0" stroke="rgba(255,107,107,0.6)" strokeWidth="1.4" strokeLinecap="round"/><line x1="2" y1="7" x2="12" y2="7" stroke="rgba(168,85,247,0.5)" strokeWidth="1.4" strokeLinecap="round"/><line x1="4" y1="14" x2="10" y2="14" stroke="rgba(100,150,255,0.5)" strokeWidth="1.4" strokeLinecap="round"/><line x1="3" y1="21" x2="11" y2="21" stroke="rgba(59,232,176,0.6)" strokeWidth="1.4" strokeLinecap="round"/><circle cx="3" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/><circle cx="11" cy="0" r="1.8" fill="#ff6b6b" opacity="0.9"/><circle cx="4" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/><circle cx="10" cy="14" r="1.6" fill="#a855f7" opacity="0.85"/><circle cx="3" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/><circle cx="11" cy="28" r="1.8" fill="#3be8b0" opacity="0.9"/></svg>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",color:"#3be8b0",lineHeight:1,textShadow:"0 0 10px rgba(59,232,176,0.4)"}}>Ω</span>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.72rem",color:"rgba(255,255,255,0.5)",letterSpacing:"0.08em",marginLeft:4}}>Alphaomegatides</span>
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
          {icon:"📞",label:"Contact Us",action:()=>{go("contact");close();}},
          {icon:"🔬",label:"COA Library",action:()=>{go("coa");close();}},
          {icon:"✅",label:"COA Verifier",action:()=>{go("coa-verify");close();}},,{icon:"📚",label:"Research Library",action:()=>{go("research");close();}},
          {icon:"⚖️",label:"Legal & Compliance",action:()=>{go("compliance");close();}},
          {icon:"⚖️",label:"Compare Compounds",action:()=>{go("compare");close();}},
          {icon:"🎯",label:"Find My Compound",action:()=>{go("quiz");close();}},
          {icon:"📦",label:"Research Stacks",action:()=>{go("bundles");close();}},
          {icon:"📋",label:"Protocol Guides",action:()=>{go("protocols");close();}},
          {icon:"📦",label:"Track My Order",action:()=>{go("track");close();}},
          ...(COMING_SOON?[{icon:"🚀",label:"Join Waitlist",action:()=>{go("coming-soon");close();}}]:[]),
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
          ⚠️ For research use only · Not for human consumption
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
  "Dr. M. from Texas joined the waitlist",
  "Research Lab CA added GLP-3 R to waitlist",
  "J. Smith joined the waitlist for BPC-157",
  "Lab Group NY interested in NAD+ & SS-31",
  "University researcher joined from Florida",
  "Dr. K. added Selank + Semax to interests",
  "Research facility joined from Colorado",
  "Dr. A. from Massachusetts joined waitlist",
  "Lab Tech TX interested in CJC-1295/Ipa",
  "Dr. L. joined from California",
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

function ComingSoonProductBtn({p, sel, textOnColor}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        style={{background:p.color,color:textOnColor||"#0e0e0e",border:"none",padding:"15px",fontSize:"1rem",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,width:"100%",transition:"opacity .2s"}}
        onMouseEnter={e=>e.currentTarget.style.opacity="0.88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}
        onClick={()=>setShowModal(true)}>
        🚀 Join Waitlist — {sel?.p || "View Pricing"}
      </button>
      <div style={{textAlign:"center",marginTop:8,fontSize:"0.72rem",color:"rgba(255,255,255,0.3)"}}>Store opens soon · Be the first to order</div>
      {showModal && <ComingSoonModal onClose={()=>setShowModal(false)} cartItems={[{name:p.name, id:p.id}]} sourcePage={`Product Page — ${p.name}`}/>}
    </>
  );
}

function ProductCard({p,go,wishlist=[],toggleWishlist=()=>{}}){
  return (
    <div onClick={()=>go("product",p.id)}
      style={{borderRadius:24,overflow:"hidden",cursor:"pointer",transition:"all 0.25s",boxShadow:`0 4px 32px ${p.color}22`,border:`1px solid ${p.color}33`}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 20px 48px ${p.color}44`;}}
      onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=`0 4px 32px ${p.color}22`;}}>
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
  {label:"Weight Loss",      emoji:"🔥", ids:["glp3r","glp2t","glp1"],                                          catId:"glp"},
  {label:"Recovery & Healing",emoji:"🛡️",ids:["bpc157","tb500","ghkcu","glow"],                                 catId:"recovery"},
  {label:"Growth & GH",      emoji:"💪", ids:["cjc1295","cjcipa","ipamorlin","tesamorlin","igf1lr3"],            catId:"growth"},
  {label:"Longevity",        emoji:"⚗️", ids:["nad","motsc","glutathione","ss31"],                               catId:"longevity"},
  {label:"Neuro & Sleep",    emoji:"🧠", ids:["selank","semax","dsip","mt2"],                                    catId:"neuro"},
  {label:"Accessories",      emoji:"🧪", ids:["reconst"],                                                        catId:"accessories"},
];

function Skeleton({w="100%",h=16,radius=8,style={}}){
  return <div style={{width:w,height:h,borderRadius:radius,background:"linear-gradient(90deg,#1c1c1c 25%,#252525 50%,#1c1c1c 75%)",backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite",...style}}/>;
}

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

function SiteFooter({go}){
  return <footer style={{background:"#0a0a0a",color:"rgba(255,255,255,0.38)",fontSize:"0.78rem",padding:"0"}}>
    {/* FDA Disclaimer bar */}
    <div style={{background:"rgba(255,107,107,0.12)",borderTop:"1px solid rgba(255,107,107,0.2)",borderBottom:"1px solid rgba(255,107,107,0.15)",padding:"12px 36px",textAlign:"center",fontSize:"0.72rem",color:"rgba(255,200,200,0.8)",lineHeight:1.6}}>
      <strong style={{color:"rgba(255,150,150,0.95)"}}>FDA DISCLAIMER:</strong> These products have not been evaluated by the U.S. Food and Drug Administration. They are not intended to diagnose, treat, cure, or prevent any disease. All products are sold exclusively for in-vitro laboratory and research use only. Not for human or veterinary consumption. Alphaomegatides is a research chemical supplier — not a compounding pharmacy or outsourcing facility.
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
            {label:"🔥 Weight Loss",catId:"glp"},
            {label:"🛡️ Recovery & Healing",catId:"recovery"},
            {label:"💪 Growth & GH",catId:"growth"},
            {label:"⚗️ Longevity",catId:"longevity"},
            {label:"🧠 Neuro & Sleep",catId:"neuro"},
            {label:"🧪 Accessories",catId:"accessories"},
          ].map(({label,catId})=>(
            <div key={catId} onClick={()=>go("category",catId)} style={{cursor:"pointer",marginBottom:9,color:"rgba(255,255,255,0.4)",fontSize:"0.8rem",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color="#3be8b0"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.4)"}>{label}</div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"rgba(255,255,255,0.7)",fontSize:"0.8rem",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:14}}>Company</div>
          {[["Contact",()=>go("contact")],["COA Library",()=>go("coa")],["Compare Compounds",()=>go("compare")],["Research Stacks",()=>go("bundles")],["Find My Compound",()=>go("quiz")],["Protocol Guides",()=>go("protocols")],["Track Order",()=>go("track")],["Sign In",()=>go("login")]].map(([l,fn])=>(
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
// AFFILIATE / REFERRAL TRACKING
// ═══════════════════════════════════════════════════════════════

const ORDER_STAGES = ["Order Placed","Processing","Quality Check","Shipped","Delivered"];


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
        {COMING_SOON ? "🚀 Join Waitlist" : `Add — ${sel?.p}`}
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

const ANNOUNCEMENTS = [
  "🚀 Store opening soon — join the waitlist for priority access",
  "🔬 All compounds independently tested by Freedom Diagnostics",
  "🇺🇸 US fulfillment only · Orders ship within 48 hours of opening",
  "⚗️ 99%+ purity guaranteed · COA included with every order",
  "🔐 Research use only · Must be 21+ and a qualified researcher",
];

function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem("aot_ann") === "1"; } catch { return false; }
  });
  useEffect(() => {
    const iv = setInterval(() => setIdx(i=>(i+1)%ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(iv);
  }, []);
  if (dismissed) return null;
  return (
    <div style={{background:"linear-gradient(90deg,#0d0d1a,#0a1a14,#0d0d1a)",borderBottom:"1px solid rgba(59,232,176,0.15)",padding:"8px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:12,position:"relative",zIndex:996}}>
      <span style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.65)",transition:"opacity .3s",textAlign:"center"}}>{ANNOUNCEMENTS[idx]}</span>
      <button onClick={()=>{localStorage.setItem("aot_ann","1");setDismissed(true);}} style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,0.25)",cursor:"pointer",fontSize:"0.9rem",padding:0,lineHeight:1}}>✕</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DARK / LIGHT MODE TOGGLE
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

  const handleKey = (e:React.KeyboardEvent) => { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();} };

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
function MobileBottomNav({go, pg, cartCount}: {go:(p:string,id?:string)=>void; pg:string; cartCount:number}) {
  const items = [
    {icon:"🏠", label:"Home",    page:"home"},
    {icon:"🔬", label:"Compounds", page:"products"},
    {icon:"🎯", label:"Quiz",    page:"quiz"},
    {icon:"🛒", label:"Cart",    page:"cart", badge:cartCount},
    {icon:"👤", label:"Account", page:"dashboard"},
  ];
  return (
    <nav style={{position:"fixed",bottom:0,left:0,right:0,zIndex:987,background:"rgba(10,10,10,0.97)",borderTop:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"stretch",backdropFilter:"blur(12px)",paddingBottom:"env(safe-area-inset-bottom)"}}>
      {items.map(item=>(
        <button key={item.page} onClick={()=>go(item.page)}
          style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,padding:"8px 4px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",position:"relative",transition:"opacity .15s",opacity:pg===item.page?1:0.45}}>
          <span style={{fontSize:"1.1rem"}}>{item.icon}</span>
          <span style={{fontSize:"0.55rem",fontWeight:pg===item.page?700:400,color:pg===item.page?"#3be8b0":"rgba(255,255,255,0.5)",letterSpacing:"0.04em"}}>{item.label}</span>
          {item.badge!=null&&item.badge>0&&<span style={{position:"absolute",top:6,right:"calc(50% - 14px)",width:14,height:14,borderRadius:"50%",background:"#ff6b6b",color:"#fff",fontSize:"0.55rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{item.badge}</span>}
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
      compare:"Compare Compounds | Alphaomegatides",
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
        All products are for in-vitro laboratory research only. Not for human or veterinary consumption. Not FDA-approved for human use.
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
:{productId:string,color?:string}){
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



function isRateLimited(email: string): boolean {
  const key = email.toLowerCase();
  const count = _emailRateMap[key] || 0;
  if (count >= 3) return true;
  _emailRateMap[key] = count + 1;
  return false;
}

async function sendWaitlistEmail(data: {name:string,email:string,interests?:string[],source?:string}) {
  if (isRateLimited(data.email)) { console.warn("Rate limited:", data.email); return; }
  const interestList = data.interests && data.interests.length > 0
    ? data.interests.join(", ")
    : "Not specified";
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Alphaomegatides Waitlist <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        reply_to: data.email,
        subject: `🧬 New Waitlist Signup — ${data.name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0e0e0e;color:#fff;padding:32px;border-radius:12px;">
            <div style="text-align:center;margin-bottom:24px;">
              <span style="font-size:2rem;color:#ff6b6b;font-weight:900;">α</span>
              <span style="font-size:2rem;color:#3be8b0;font-weight:900;">Ω</span>
              <div style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin-top:4px;letter-spacing:0.1em;">ALPHAOMEGATIDES</div>
            </div>
            <div style="background:#1a1a1a;border-radius:10px;padding:24px;border:1px solid rgba(59,232,176,0.2);">
              <div style="color:#3be8b0;font-size:0.75rem;font-weight:700;letter-spacing:0.15em;margin-bottom:8px;">NEW POTENTIAL CUSTOMER</div>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:0.85rem;width:120px;">Name</td><td style="padding:8px 0;color:#fff;font-weight:600;">${data.name}</td></tr>
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:0.85rem;">Email</td><td style="padding:8px 0;color:#fff;font-weight:600;"><a href="mailto:${data.email}" style="color:#4f8ef7;">${data.email}</a></td></tr>
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:0.85rem;">Source</td><td style="padding:8px 0;color:#fff;">${data.source || "Checkout intercept"}</td></tr>
                <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:0.85rem;vertical-align:top;">Interests</td><td style="padding:8px 0;color:#ffd166;font-weight:600;">${interestList}</td></tr>
              </table>
            </div>
            <div style="margin-top:16px;padding:12px;background:rgba(255,107,107,0.1);border-radius:8px;font-size:0.75rem;color:rgba(255,255,255,0.4);text-align:center;">
              Alphaomegatides · alphaomegatides.com · For research use only
            </div>
          </div>
        `,
      }),
    });
  } catch(e) { console.error("Resend error:", e); }
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
    "GLP-3 R (Retatrutide) — Weight Loss",
    "GLP-2 T (Tirzepatide) — Weight Loss",
    "GLP-1 (Semaglutide) — Weight Loss",
    "BPC-157 — Healing & Recovery",
    "TB-500 — Tissue Repair",
    "CJC-1295 / Ipamorelin — GH Stack",
    "GHK-Cu — Skin & Anti-Aging",
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
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"2rem",color:"#ff6b6b",textShadow:"0 0 24px rgba(255,107,107,0.5)"}}>α</span>
            <span style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"2rem",color:"#3be8b0",textShadow:"0 0 24px rgba(59,232,176,0.5)"}}>Ω</span>
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
          Join Waitlist →
        </button>
        <button onClick={()=>setShow(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.3)",cursor:"pointer",fontSize:"0.9rem",padding:0,marginLeft:4}}>✕</button>
      </div>
      {showModal && <ComingSoonModal onClose={()=>setShowModal(false)} sourcePage="Top Banner"/>}
    </>
  );
}

// ── COMPLIANCE BANNER (sitewide) ───────────────────────────────────
function ComplianceBanner() {


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

function CheckoutLink({cart,total}:{cart:{id:string}[],total:number}){
  const [showModal,setShowModal]=useState(false);
  if(!COMING_SOON){
    // Live store mode — use original Shopify/Authorize.net logic
    const items=cart.map(i=>VARIANT_MAP[i.id]?`${VARIANT_MAP[i.id]}:1`:null).filter(Boolean);
    const shopifyUrl=items.length>0?`https://sequential-peptides.myshopify.com/cart/${items.join(",")}?storefront=true`:`https://sequential-peptides.myshopify.com`;
    return <a href={shopifyUrl} target="_blank" rel="noreferrer" style={{width:"100%",padding:"16px",background:"#3be8b0",color:"#0e0e0e",borderRadius:100,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",gap:8,textDecoration:"none",boxSizing:"border-box"}}>🔒 Checkout · ${total.toFixed(2)}</a>;
  }
  return (
    <>
      <button onClick={()=>setShowModal(true)} style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,#3be8b0,#4f8ef7)",color:"#0e0e0e",borderRadius:100,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",gap:8,border:"none"}}>
        🚀 Join Waitlist to Purchase — ${total.toFixed(2)}
      </button>
      {showModal && <ComingSoonModal onClose={()=>setShowModal(false)} cartItems={cart} sourcePage="Cart"/>}
    </>
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

export default function App(){
  const [pg,spg]=useState("home");
  const [pid,spid]=useState(null);
  const [user,su]=useState(()=>getSess());
  const [aged,sa]=useState(()=>{try{return localStorage.getItem("nxg_age")==="1";}catch{return false;}});
  const [cart,setCart]=useState([]);
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


// ════════════════════════════════════════════════════════════════
// §5 PAGES
// ════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// pages.tsx — All page components
// Each page is a route-level view, thin orchestration
// ═══════════════════════════════════════════════════════════════


function ComparisonTool({go}: {go:(p:string,id?:string)=>void}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.tag.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id:string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x=>x!==id) : prev.length < 3 ? [...prev,id] : prev
    );
  };

  const compProducts = PRODUCTS.filter(p => selected.includes(p.id));

  const COMPARE_ROWS = [
    {label:"Category",    fn:(p:any)=>p.tag},
    {label:"Price",       fn:(p:any)=>p.sizes?p.sizes[0].p:p.price},
    {label:"Size",        fn:(p:any)=>p.sizes?p.sizes[0].s:p.size},
    {label:"Purity",      fn:(p:any)=>p.coa.purity},
    {label:"Best For",    fn:(p:any)=>(PRODUCT_META[p.id]?.bestFor||[]).join(", ")},
    {label:"Difficulty",  fn:(p:any)=>PRODUCT_META[p.id]?.difficulty||"—"},
    {label:"COA Batches", fn:(p:any)=>`${p.coa.tests.length} batches`},
    {label:"Stacks With", fn:(p:any)=>(PRODUCT_META[p.id]?.stacks||[]).map((id:string)=>PRODUCTS.find(x=>x.id===id)?.name||id).join(", ")||"—"},
    {label:"Form",        fn:(p:any)=>FORM_TYPE[p.id]==="solution"?"Solution":"Lyophilized Vial"},
  ];

  return (
    <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"48px 24px 80px"}}>
        <span onClick={()=>go("home")} style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.45)",cursor:"pointer",display:"block",marginBottom:24}}>← Back</span>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,2.4rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:6}}>Compare Compounds</div>
        <p style={{fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",marginBottom:28}}>Select up to 3 compounds to compare side-by-side.</p>

        {/* Selector */}
        <div style={{marginBottom:24}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search compounds..."
            style={{width:"100%",maxWidth:400,background:"#1a1a1a",border:"1.5px solid rgba(255,255,255,0.1)",borderRadius:100,padding:"10px 18px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none",boxSizing:"border-box",marginBottom:12}}
            onFocus={e=>e.target.style.borderColor="#3be8b0"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {filtered.map(p => (
              <button key={p.id} onClick={()=>toggle(p.id)}
                style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:100,border:`1.5px solid ${selected.includes(p.id)?p.color:"rgba(255,255,255,0.1)"}`,background:selected.includes(p.id)?p.color+"22":"transparent",color:selected.includes(p.id)?p.color:"rgba(255,255,255,0.5)",cursor:selected.length>=3&&!selected.includes(p.id)?"not-allowed":"pointer",fontFamily:"inherit",fontSize:"0.78rem",fontWeight:selected.includes(p.id)?700:400,transition:"all .15s",opacity:selected.length>=3&&!selected.includes(p.id)?0.4:1}}>
                <span>{p.icon}</span>{p.name}
                {selected.includes(p.id) && <span style={{marginLeft:2}}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        {compProducts.length >= 2 ? (
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",minWidth:500}}>
              <thead>
                <tr>
                  <th style={{textAlign:"left",padding:"12px 16px",fontSize:"0.72rem",fontWeight:600,color:"rgba(255,255,255,0.35)",letterSpacing:"0.1em",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>ATTRIBUTE</th>
                  {compProducts.map(p => (
                    <th key={p.id} style={{textAlign:"center",padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
                      <div style={{fontSize:"1.5rem",marginBottom:4}}>{p.icon}</div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.88rem",color:p.color}}>{p.name}</div>
                      <button onClick={()=>toggle(p.id)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.25)",cursor:"pointer",fontSize:"0.7rem",marginTop:4}}>Remove</button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row,i) => (
                  <tr key={row.label} style={{background:i%2===0?"rgba(255,255,255,0.02)":"transparent"}}>
                    <td style={{padding:"12px 16px",fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",fontWeight:600,whiteSpace:"nowrap"}}>{row.label}</td>
                    {compProducts.map(p => (
                      <td key={p.id} style={{padding:"12px 16px",textAlign:"center",fontSize:"0.82rem",color:"#fff",borderLeft:"1px solid rgba(255,255,255,0.04)"}}>{row.fn(p)}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td style={{padding:"12px 16px"}}></td>
                  {compProducts.map(p => (
                    <td key={p.id} style={{padding:"12px 16px",textAlign:"center",borderLeft:"1px solid rgba(255,255,255,0.04)"}}>
                      <button onClick={()=>go("product",p.id)} style={{background:p.color,color:p.color==="#ffd166"||p.color==="#3be8b0"?"#0e0e0e":"#fff",border:"none",padding:"9px 20px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.78rem"}}>View →</button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{textAlign:"center",padding:"48px 0",color:"rgba(255,255,255,0.3)"}}>
            <div style={{fontSize:"2rem",marginBottom:12}}>⚖️</div>
            <div>Select at least 2 compounds to compare</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SOCIAL PROOF TICKER
// ═══════════════════════════════════════════════════════════════

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
                    🚀 {COMING_SOON ? "Join Waitlist for Stack" : "Add Stack to Cart"}
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
                🚀 Join Waitlist with These Interests
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
        await fetch("https://api.resend.com/emails", {
          method:"POST",
          headers:{"Authorization":`Bearer ${RESEND_API_KEY}`,"Content-Type":"application/json"},
          body:JSON.stringify({
            from:"Alphaomegatides <onboarding@resend.dev>",
            to:[sub.email],
            subject:"🚀 Alphaomegatides — Important Update",
            html:`<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0e0e0e;color:#fff;padding:32px;border-radius:12px;">
              <div style="text-align:center;margin-bottom:20px;"><span style="color:#ff6b6b;font-size:2rem;font-weight:900;">α</span><span style="color:#3be8b0;font-size:2rem;font-weight:900;">Ω</span></div>
              <div style="font-size:0.8rem;color:rgba(255,255,255,0.4);margin-bottom:6px;">Hi ${sub.name || "Researcher"},</div>
              <div style="white-space:pre-line;color:rgba(255,255,255,0.85);line-height:1.7;font-size:0.9rem;">${blastMsg}</div>
              <div style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-size:0.7rem;color:rgba(255,255,255,0.25);">Alphaomegatides · alphaomegatides.com · Research use only</div>
            </div>`,
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

const HOME_CATS = [
  {id:"all",       label:"All",              emoji:"⚡"},
  {id:"glp",       label:"Weight Loss",      emoji:"🔥", ids:["glp3r","glp2t","glp1"]},
  {id:"recovery",  label:"Recovery",         emoji:"🛡️", ids:["bpc157","tb500","ghkcu","glow"]},
  {id:"growth",    label:"Growth & GH",      emoji:"💪", ids:["cjc1295","cjcipa","ipamorlin","tesamorlin","igf1lr3"]},
  {id:"longevity", label:"Longevity",        emoji:"⚗️", ids:["nad","motsc","glutathione","ss31"]},
  {id:"neuro",     label:"Neuro & Sleep",    emoji:"🧠", ids:["selank","semax","dsip","mt2"]},
  {id:"accessories",label:"Accessories",     emoji:"🧪", ids:["reconst"]},
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
  {id:"glp-intro",title:"Understanding GLP Receptor Agonists",category:"Weight Loss",emoji:"🔥",time:"5 min read",summary:"How GLP-1, GLP-2, and GLP-3 receptors work differently and why triple agonism makes Retatrutide the most potent weight loss peptide studied to date.",tags:["GLP-3 R","GLP-2 T","GLP-1"]},
  {id:"bpc-tb500",title:"BPC-157 + TB-500: The Ultimate Recovery Stack",category:"Recovery",emoji:"🛡️",time:"4 min read",summary:"Why these two peptides work synergistically — BPC-157 targets gut and tissue repair while TB-500 drives systemic actin-driven healing. When and how to use both.",tags:["BPC-157","TB-500","Wolverine"]},
  {id:"gh-axis",title:"The GH Axis: CJC-1295, Ipamorlin & Tesamorlin",category:"Growth",emoji:"💪",time:"6 min read",summary:"Understanding the GHRH-pituitary-IGF-1 axis. How secretagogues differ from exogenous GH, and why pulsatile release matters for research protocols.",tags:["CJC-1295","Ipamorlin","Tesamorlin"]},
  {id:"ghkcu-skin",title:"GHK-Cu: The Copper Peptide Activating 4,000+ Genes",category:"Skin & Anti-Age",emoji:"✨",time:"5 min read",summary:"GHK-Cu's mechanism on ECM remodeling, collagen synthesis, and how it regulates gene expression. Why it's considered one of the most studied anti-aging compounds.",tags:["GHK-CU","Glow Complex"]},
  {id:"nad-mito",title:"NAD+ & Mitochondrial Peptides for Longevity Research",category:"Longevity",emoji:"⚡",time:"7 min read",summary:"How NAD+ fuels sirtuin activation and DNA repair. The role of MOTS-c in metabolic regulation and why SS-31 is being studied for cardiac protection.",tags:["NAD+","MOTS-c","SS-31"]},
  {id:"neuro-peptides",title:"Selank, Semax & Cognitive Peptide Research",category:"Neuro",emoji:"🧠",time:"5 min read",summary:"How Russian-developed neuropeptides modulate BDNF, GABA, and stress response pathways. Comparing anxiolytic vs cognitive-enhancing mechanisms.",tags:["Selank","Semax"]},
  {id:"recon-guide",title:"Complete Reconstitution Guide for Research Peptides",category:"Protocol",emoji:"🧪",time:"8 min read",summary:"Step-by-step: bacteriostatic water vs acetic acid, injection technique, storage temperatures, vial lifespan, and how to calculate your draw volume.",tags:["All Products"]},
  {id:"cycling",title:"Research Cycling Protocols: When to Run, When to Rest",category:"Protocol",emoji:"📋",time:"6 min read",summary:"Evidence-based cycling frameworks for GLP peptides, GH secretagogues, and healing peptides. Why breaks matter and how to structure multi-compound protocols.",tags:["GLP-3 R","CJC-1295","BPC-157"]},
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
        ⚠️ All content is for research and educational purposes only. Not medical advice.
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
){
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
function HeroWaitlistBtn() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={()=>setShow(true)} style={{background:"transparent",color:"#3be8b0",border:"1.5px solid rgba(59,232,176,0.4)",padding:"11px 24px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:"0.88rem",transition:"all .2s"}}
        onMouseEnter={e=>{e.currentTarget.style.background="rgba(59,232,176,0.1)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
        🚀 Join Waitlist
      </button>
      {show && <ComingSoonModal onClose={()=>setShow(false)} sourcePage="Home Hero"/>}
    </>
  );
}


function Home({go,recentlyViewed=[],wishlist=[],toggleWishlist=()=>{}}){
  return <div style={{paddingTop:70,background:"#0e0e0e",color:"#ffffff"}}>
    <section style={{minHeight:"90vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"80px 24px 60px",background:"#0a0a0a",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:C.g,filter:"blur(100px)",opacity:.15,top:-150,right:-100,pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:380,height:380,borderRadius:"50%",background:C.b,filter:"blur(100px)",opacity:.12,bottom:-80,left:-80,pointerEvents:"none"}}/>
      {/* Animated floating dots */}
      <style>{`
        @keyframes floatUp{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:0.6}80%{opacity:0.3}100%{transform:translateY(-120px) translateX(20px);opacity:0}}
        @keyframes floatUp2{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:0.4}80%{opacity:0.2}100%{transform:translateY(-100px) translateX(-15px);opacity:0}}
        @keyframes pulseGlow{0%,100%{opacity:0.15}50%{opacity:0.28}}
      `}</style>
      {[4,3,5,4,3,5,4,3].map((sz,i)=>(
        <div key={i} style={{position:"absolute",width:sz,height:sz,borderRadius:"50%",background:i%2===0?"#3be8b0":"#4f8ef7",left:`${10+i*11}%`,bottom:`${10+i*8}%`,animation:`floatUp${i%2===0?"":"2"} ${3+i*0.7}s ease-in-out ${i*0.4}s infinite`,pointerEvents:"none",zIndex:0,opacity:0.5}}/>
      ))}
      {/* Brand name + logo mark */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,marginBottom:28,position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(3.5rem,10vw,6rem)",color:"#ff6b6b",lineHeight:1,textShadow:"0 0 60px rgba(255,107,107,0.45)"}}>α</span>
          <svg width="220" height="70" viewBox="0 0 44 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform:"rotate(90deg)"}}>
            <defs><linearGradient id="herodna" x1="0" y1="0" x2="0" y2="110" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#ff6b6b"/><stop offset="50%" stopColor="#a855f7"/><stop offset="100%" stopColor="#3be8b0"/></linearGradient></defs>
            <path d="M9 0 C2 14,2 28,9 42 C16 56,19 70,12 84 C8 92,5 100,6 110" stroke="url(#herodna)" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M35 0 C42 14,42 28,35 42 C28 56,25 70,32 84 C36 92,39 100,38 110" stroke="url(#herodna)" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <line x1="9"  y1="0"   x2="35" y2="0"   stroke="rgba(255,107,107,0.7)" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="5"  y1="20"  x2="39" y2="20"  stroke="rgba(220,80,190,0.55)" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="12" y1="40"  x2="32" y2="40"  stroke="rgba(168,85,247,0.65)" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="13" y1="60"  x2="31" y2="60"  stroke="rgba(100,150,255,0.6)" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="9"  y1="80"  x2="35" y2="80"  stroke="rgba(59,220,200,0.65)" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="7"  y1="100" x2="37" y2="100" stroke="rgba(59,232,176,0.6)"  strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="9"  cy="0"   r="5" fill="#ff6b6b" opacity="0.92"/>
            <circle cx="35" cy="0"   r="5" fill="#ff6b6b" opacity="0.92"/>
            <circle cx="12" cy="40"  r="4" fill="#a855f7" opacity="0.88"/>
            <circle cx="32" cy="40"  r="4" fill="#a855f7" opacity="0.88"/>
            <circle cx="9"  cy="80"  r="5" fill="#3be8b0" opacity="0.92"/>
            <circle cx="35" cy="80"  r="5" fill="#3be8b0" opacity="0.92"/>
          </svg>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(3.5rem,10vw,6rem)",color:"#3be8b0",lineHeight:1,textShadow:"0 0 60px rgba(59,232,176,0.45)"}}>Ω</span>
        </div>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"clamp(0.65rem,1.8vw,0.85rem)",letterSpacing:"0.3em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)"}}>Alphaomegatides</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontWeight:700,fontSize:"clamp(1.1rem,3.5vw,1.8rem)",color:"rgba(255,255,255,0.55)",letterSpacing:"0.02em",textAlign:"center"}}>"Where the tide turns for all."</div>
      </div>

      <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",padding:"5px 16px",borderRadius:100,fontSize:"0.77rem",fontWeight:500,color:"rgba(255,255,255,0.7)",marginBottom:28,position:"relative",zIndex:1}}>
        <span style={{width:7,height:7,borderRadius:"50%",background:"#3be8b0",display:"inline-block",animation:"pulseGlow 2s ease-in-out infinite"}}/>
        Research-grade peptides · For in-vitro research use only
      </div>
      <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4.5vw,3.2rem)",fontWeight:800,lineHeight:1.1,letterSpacing:"-.03em",maxWidth:560,position:"relative",zIndex:1,margin:"0 0 16px",color:"#ffffff"}}>
        Verified research <span style={{color:"#4f8ef7"}}>peptides</span> for{" "}
        <span style={{background:"#3be8b0",color:"#0e0e0e",padding:"2px 12px",borderRadius:8}}>&nbsp;serious science&nbsp;</span>
      </h1>
      <p style={{fontSize:"0.9rem",color:"rgba(255,255,255,0.45)",maxWidth:460,lineHeight:1.65,marginBottom:6,position:"relative",zIndex:1}}>
        Pharmaceutical-grade research peptides with independent third-party verification, full documentation, and US-only fulfillment.
      </p>
      <p style={{fontFamily:"'Syne',sans-serif",fontWeight:600,fontStyle:"italic",fontSize:"0.85rem",color:"rgba(255,255,255,0.28)",marginBottom:16,position:"relative",zIndex:1}}>"Are you ready to turn the tide?"</p>
      <div style={{display:"inline-block",background:"rgba(255,107,107,0.08)",border:"1px solid rgba(255,107,107,0.2)",borderRadius:100,padding:"4px 14px",fontSize:"0.72rem",fontWeight:600,color:"#ff8a80",marginBottom:24,position:"relative",zIndex:1}}>
        ⚠️ For research use only · Not for human or veterinary use
      </div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:40,position:"relative",zIndex:1}}>
        <PrimaryBtn onClick={()=>document.getElementById("products").scrollIntoView({behavior:"smooth"})} style={{padding:"12px 28px",fontSize:"0.9rem"}}>View Research Compounds →</PrimaryBtn>
        {COMING_SOON
          ? <HeroWaitlistBtn/>
          : <GhostBtn onClick={()=>go("register")} style={{padding:"11px 24px",fontSize:"0.88rem"}}>Create Account</GhostBtn>
        }
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

    <div style={{background:"#141414",padding:"15px 0",overflow:"hidden",whiteSpace:"nowrap",borderTop:"1px solid rgba(255,255,255,0.06)",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
      <span style={{display:"inline-flex",gap:44,animation:"scroll 18s linear infinite"}}>
        {[...["Where the tide turns for all.","Ready to turn the tide?","The frontier starts here.","Precision. Purity. Progress.","Are you ready to turn the tide?","Next generation peptide research.","From α to Ω — we have it all."],...["Where the tide turns for all.","Ready to turn the tide?","The frontier starts here.","Precision. Purity. Progress.","Are you ready to turn the tide?","Next generation peptide research.","From α to Ω — we have it all."]].map((phrase,i)=>(
          <span key={i} style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontSize:"0.8rem",fontWeight:600,letterSpacing:"0.06em",color:i%3===0?"#ff6b6b":i%3===1?"rgba(255,255,255,0.4)":"#3be8b0",display:"inline-flex",alignItems:"center",gap:12}}>
            <span style={{color:"rgba(255,255,255,0.15)"}}>✦</span>{phrase}
          </span>
        ))}
      </span>
    </div>

    {/* Recently Viewed */}
    {recentlyViewed.length>0&&<div style={{background:"#0a0a0a",padding:"32px 36px 0",maxWidth:1140,margin:"0 auto"}}>
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

    <section id="products" style={{maxWidth:1140,margin:"0 auto",padding:"80px 36px",background:"#0e0e0e"}}>
      <div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#3be8b0",marginBottom:10}}>Research Compounds</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.9rem,4vw,2.7rem)",fontWeight:800,letterSpacing:"-.03em",marginBottom:6,color:"#ffffff"}}>Available for research procurement</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontStyle:"italic",fontWeight:600,fontSize:"clamp(0.85rem,2vw,1.1rem)",color:"rgba(255,255,255,0.3)",marginBottom:14}}>"The frontier of peptide science — all in one place."</div>
      <div style={{fontSize:"0.83rem",color:"rgba(255,255,255,0.4)",marginBottom:28}}>All products are for in-vitro / laboratory research use only. Not intended for human or veterinary use.</div>

      {/* ── CATEGORY FILTER BAR ── */}
      <HomeCatFilter go={go}   wishlist={wishlist} toggleWishlist={toggleWishlist}/>
    </section>


    <section style={{background:"#141414",padding:"72px 36px"}}>
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

    {/* Quick nav pills */}
    <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",padding:"32px 36px 0",background:"#0e0e0e"}}>
      {[["⚖️","Compare Compounds","compare"],["🎯","Find My Compound","quiz"],["📦","Research Stacks","bundles"],["📋","Protocol Guides","protocols"],["🔬","COA Library","coa"],["📚","Research Library","research"]].map(([icon,label,page])=>(
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
        {COMING_SOON ? (
          <ComingSoonProductBtn p={p} sel={sel} textOnColor={textOnColor}/>
        ) : (
          <PrimaryBtn color={p.color} tc={textOnColor} full style={{padding:"15px",fontSize:"1rem",opacity:getStock(p.id)<=0?0.4:1,pointerEvents:getStock(p.id)<=0?"none":"auto"}} onClick={()=>{if(getStock(p.id)>0)onAddToCart&&onAddToCart(sel.s,sel.p);}}>
            {getStock(p.id)<=0?"— Out of Stock —":`Add to Cart — ${sel.p}`}
          </PrimaryBtn>
        )}
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
        <p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.88rem"}}>Reconstitution · Dosing reference · Administration timing · Cycle data</p>
        <div style={{display:"inline-block",background:"rgba(255,107,107,0.08)",border:"1px solid rgba(255,107,107,0.18)",borderRadius:100,padding:"4px 16px",fontSize:"0.73rem",fontWeight:600,color:"#c0392b",marginTop:10}}>For reference only · Not medical or dosing advice</div>
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
  const [f,sf]=useState({fname:"",lname:"",email:"",pass:"",phone:"",street:"",apt:"",city:"",state:"",zip:""});
  const [terms,st]=useState(false);
  const [err,se]=useState("");
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

  function submit(){
    if(!f.fname||!f.lname||!f.email||!f.pass||!f.phone||!f.street||!f.city||!f.state||!f.zip){se("Please fill in all required fields.");return;}
    if(!f.email.includes("@")){se("Enter a valid email.");return;}
    if(f.pass.length<8){se("Password must be at least 8 characters.");return;}
    if(!terms){se("Please agree to the Terms of Service.");return;}
    const users=getUsers();
    if(users[f.email.toLowerCase()]){se("Account already exists with this email.");return;}
    const u={...f,email:f.email.toLowerCase(),address:{street:f.street,apt:f.apt,city:f.city,state:f.state,zip:f.zip},orders:[],createdAt:new Date().toISOString()};
    users[u.email]=u; saveUsers(users); setSess(u); onLogin(u);
    // Send signup notification to alphaomegatides@yahoo.com
    fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":"Bearer re_gNzYdNZU_4Yx2Y916iJb6dSiBniGRchZF"},
      body:JSON.stringify({
        from:"onboarding@resend.dev",
        to:"alphaomegatides@yahoo.com",
        reply_to:"noreply@alphaomegatides.com",
        subject:"🧬 New Account Signup — Alphaomegatides",
        html:`<div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#0e0e0e;color:#fff;padding:32px;border-radius:12px;">
          <h2 style="color:#3be8b0;margin-bottom:4px;">New Member Signup</h2>
          <p style="color:rgba(255,255,255,0.5);font-size:12px;margin-bottom:24px;">alphaomegatides.com</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;">Name</td><td style="padding:8px 0;color:#fff;font-size:13px;font-weight:600;">${f.firstName} ${f.lastName}</td></tr>
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;">Email</td><td style="padding:8px 0;color:#fff;font-size:13px;">${f.email}</td></tr>
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;">Phone</td><td style="padding:8px 0;color:#fff;font-size:13px;">${f.phone||"—"}</td></tr>
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;">Address</td><td style="padding:8px 0;color:#fff;font-size:13px;">${f.street}${f.apt?", "+f.apt:""}, ${f.city}, ${f.state} ${f.zip}</td></tr>
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;">Signed Up</td><td style="padding:8px 0;color:#fff;font-size:13px;">${new Date().toLocaleString()}</td></tr>
          </table>
        </div>`
      })
    }).catch(()=>{});
    go("dashboard");
  }

  return <div style={{paddingTop:70,minHeight:"100vh",background:"#0e0e0e",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 20px 60px"}}>
    <div style={{background:"#1a1a1a",borderRadius:24,padding:40,maxWidth:520,width:"100%",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 16px 48px rgba(0,0,0,0.5)"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.4rem",fontWeight:800,marginBottom:3}}>NeX<span style={{color:"#3be8b0"}}>GPT</span></div>
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
        <Field label="Password (min 8 chars)" type="password" value={f.pass} onChange={e=>set("pass",e.target.value)} placeholder="Min. 8 characters"/>
        <Field label="Phone Number" type="tel" value={f.phone} onChange={e=>set("phone",e.target.value)} placeholder="(555) 000-0000"/>
        <div style={{borderTop:"1px solid rgba(0,0,0,0.08)",paddingTop:16,display:"flex",flexDirection:"column",gap:11}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.88rem",display:"flex",alignItems:"center",gap:8}}>
            Shipping Address
            <span style={{background:"rgba(79,142,247,0.12)",color:C.b,fontSize:"0.65rem",padding:"2px 10px",borderRadius:100,fontWeight:600}}>🇺🇸 US Only</span>
          </div>
          <AddressField
            label="Street Address"
            value={f.street}
            onChange={v=>set("street",v)}
            onSelect={handleAddressSelect}
            placeholder="Start typing your address…"
          />
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
          <label style={{fontSize:"0.77rem",color:C.muted,cursor:"pointer",lineHeight:1.5}}>I confirm I am in the <strong>United States</strong>, agree to the Terms of Service, and acknowledge all products are <strong>for research use only — not for human consumption</strong>.</label>
        </div>
        <PrimaryBtn onClick={submit} full style={{padding:"14px",fontSize:"0.95rem"}}>Create My Account</PrimaryBtn>
        <div style={{textAlign:"center",fontSize:"0.82rem",color:C.muted}}>Already have an account? <span onClick={()=>go("login")} style={{color:C.b,cursor:"pointer",fontWeight:600}}>Sign in</span></div>
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
  return <div style={{paddingTop:70,minHeight:"100vh",background:"#0e0e0e",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 20px 60px"}}>
    <div style={{background:"#1a1a1a",borderRadius:24,padding:40,maxWidth:400,width:"100%",border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 16px 48px rgba(0,0,0,0.5)"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.4rem",fontWeight:800,marginBottom:3}}>NeX<span style={{color:"#3be8b0"}}>GPT</span></div>
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
  const tabs=[["orders","📦 Orders"],["profile","👤 Profile"],["progress","📊 Progress"],["wishlist","❤️ Wishlist"],["coa","🔬 My COAs"],["waitlist","📋 Waitlist"],["affiliate","🔗 Affiliate"]];

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

      {tab==="waitlist"&&<WaitlistAdmin/>}
      {tab==="affiliate"&&<AffiliateAdminPanel/>}
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
  if (!COMING_SOON) {
    // Live mode: redirect to shopify
    useEffect(()=>{
      if(!p) return;
      const handleMap={glp3r:"glp-3-r",glp2t:"glp-2-t",glp1:"glp-1",bpc157:"bpc-157",tb500:"tb-500",cjc1295:"cjc-1295",cjcipa:"cjc-1295-ipamorelin-blend",ipamorlin:"ipamorelin",tesamorlin:"tesamorlin",igf1lr3:"igf-1-lr3",ghkcu:"ghk-cu",glow:"glow-complex",nad:"nad",motsc:"mots-c",glutathione:"glutathione",ss31:"ss-31",selank:"selank",semax:"semax",dsip:"dsip",mt2:"mt2",reconst:"reconstitution-solution"};
      const handle=handleMap[p.id]||p.id;
      window.location.href=`https://sequential-peptides.myshopify.com/products/${handle}`;
    },[]);
  }

  return <div style={{paddingTop:70,background:"#0e0e0e",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div style={{textAlign:"center",padding:"40px 24px",maxWidth:440}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:28}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",color:"#ff6b6b"}}>α</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.6rem",color:"#3be8b0"}}>Ω</span>
      </div>
      <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(59,232,176,0.1)",border:"2px solid rgba(59,232,176,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:"1.6rem"}}>🔒</div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",marginBottom:10}}>Redirecting to Checkout</div>
      <p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.88rem",lineHeight:1.7,marginBottom:20}}>Taking you to Shopify's secure checkout — credit card, Shop Pay, and Apple Pay accepted.</p>
      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
        {[["💳","Credit Card"],["🍎","Apple Pay"],["🛍️","Shop Pay"]].map(([icon,label])=>(
          <div key={label} style={{background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"8px 16px",fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",display:"flex",alignItems:"center",gap:6}}>{icon} {label}</div>
        ))}
      </div>
      <button onClick={()=>go("cart")} style={{marginTop:24,background:"transparent",color:"rgba(255,255,255,0.3)",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:"0.82rem"}}>← Back to cart</button>
    </div>
  </div>;
}



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
      All products are offered solely for lawful laboratory and in-vitro research use. They are not medicines or drugs and are not approved to diagnose, treat, cure, mitigate, or prevent any disease or medical condition. Products are not for human or animal use or consumption and are not intended for therapeutic, diagnostic, food, drug, medical-device, cosmetic, commercial, or recreational purposes. Alphaomegatides does not represent that any product has been sterilized or tested for safety or efficacy for any prohibited use.
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
      No product should be considered a food, drug, medical device, or cosmetic. Under no circumstances should any material be used for therapeutic, diagnostic, or recreational purposes, or for human consumption of any kind. The purchaser expressly represents and warrants that any product purchased will be tested, handled, used, manufactured, and marketed in strict compliance with applicable laws and regulations.
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
        <li>Take clear photographs of the outer packaging, inner packaging, and product label(s).</li>
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
      Your information is used to: process payments and fulfill orders; send order/shipping notifications; maintain your account; arrange shipping and handle exchanges; detect and prevent fraud; provide customer support; and improve our services. We may also use contact information for marketing communications where permitted — you may opt out at any time.
    </LegalSection>
    <LegalSection title="SMS / Text Message Policy">
      SMS consent is not shared with third parties. We will never send unsolicited text messages. We only communicate via SMS when you text us first (explicit opt-in) or have requested a follow-up. All SMS is limited to the information you asked for. You may opt out at any time by texting STOP. We will never share your mobile information with anyone.
    </LegalSection>
    <LegalSection title="Your Rights">
      Depending on your location, you may have the right to: access personal information we hold about you; request deletion of your data; request correction of inaccurate data; receive a portable copy of your data; restrict processing; withdraw consent; and appeal decisions. Contact us at alphaomegatides@yahoo.com to exercise any of these rights.
    </LegalSection>
    <LegalSection title="Data Security and Retention">
      No security measures are perfect. We recommend not using insecure channels to communicate sensitive information. We retain your personal information as long as necessary to maintain your account, provide services, comply with legal obligations, resolve disputes, and enforce agreements.
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
        <span>🔬</span><span>All Alphaomegatides COAs tested by <strong>Freedom Diagnostics</strong> using HPLC and mass spectrometry verification.</span>
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

function AffiliateAdminPanel() {
  const [codes, setCodes] = useState<Record<string,{clicks:number,signups:number}>>({});
  const [newCode, setNewCode] = useState("");
  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    try { setCodes(JSON.parse(localStorage.getItem("aot_aff_stats") || "{}")); } catch {}
  }, []);

  const createLink = () => {
    if (!newCode.trim()) return;
    const url = `https://alphaomegatides.com?ref=${newCode.trim().toLowerCase()}`;
    setNewLink(url);
    const stats = { ...codes, [newCode.trim().toLowerCase()]: { clicks: 0, signups: 0 } };
    setCodes(stats);
    localStorage.setItem("aot_aff_stats", JSON.stringify(stats));
  };

  return (
    <div>
      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",marginBottom:4}}>Affiliate Links</div>
      <div style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.4)",marginBottom:20}}>Create referral links and track signups</div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        <input value={newCode} onChange={e=>setNewCode(e.target.value)} placeholder="e.g. drsmith, labgroup, podcast1"
          style={{flex:1,minWidth:160,background:"#1c1c1c",border:"1px solid rgba(255,255,255,0.12)",borderRadius:9,padding:"10px 12px",color:"#fff",fontFamily:"inherit",fontSize:"0.88rem",outline:"none"}}/>
        <button onClick={createLink} style={{background:"#3be8b0",color:"#0e0e0e",border:"none",padding:"10px 20px",borderRadius:9,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:"0.85rem"}}>Generate Link</button>
      </div>
      {newLink && (
        <div style={{background:"rgba(59,232,176,0.08)",border:"1px solid rgba(59,232,176,0.2)",borderRadius:12,padding:"14px 16px",marginBottom:16}}>
          <div style={{fontSize:"0.72rem",fontWeight:700,color:"#3be8b0",marginBottom:6}}>YOUR AFFILIATE LINK</div>
          <div style={{fontSize:"0.85rem",color:"#fff",wordBreak:"break-all",marginBottom:8}}>{newLink}</div>
          <button onClick={()=>navigator.clipboard?.writeText(newLink)} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.7)",padding:"6px 14px",borderRadius:100,cursor:"pointer",fontFamily:"inherit",fontSize:"0.75rem"}}>Copy Link</button>
        </div>
      )}
      {Object.keys(codes).length > 0 && (
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {Object.entries(codes).map(([code, stats]) => (
            <div key={code} style={{background:"#1c1c1c",borderRadius:12,padding:"12px 16px",border:"1px solid rgba(255,255,255,0.07)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
              <div>
                <div style={{fontWeight:600,fontSize:"0.85rem"}}>?ref={code}</div>
                <div style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.35)",marginTop:2}}>alphaomegatides.com?ref={code}</div>
              </div>
              <div style={{display:"flex",gap:16}}>
                <div style={{textAlign:"center"}}><div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem"}}>{stats.clicks}</div><div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.35)"}}>CLICKS</div></div>
                <div style={{textAlign:"center"}}><div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"#3be8b0"}}>{stats.signups}</div><div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.35)"}}>SIGNUPS</div></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ORDER TRACKING PAGE (polished UI for showing order status)
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
  {id:"gh-stack-protocol",title:"GH Stack Research Protocol",subtitle:"CJC-1295 + Ipamorelin + Tesamorlin timing, dosing, and IGF-1 monitoring",icon:"💪",color:"#8b5cf6",compounds:["CJC-1295","Ipamorelin","Tesamorlin"]},
  {id:"healing-protocol",title:"Healing Stack Research Protocol",subtitle:"BPC-157 + TB-500 dual-pathway research framework",icon:"🛡️",color:"#3be8b0",compounds:["BPC-157","TB-500"]},
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
){
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
          </div>

          <CheckoutLink cart={cart} total={total}/>
          <p style={{textAlign:"center",fontSize:"0.72rem",color:C.muted}}>🔒 Secure checkout · Research use only · All sales final</p>
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
      text:"ALL products sold by Alphaomegatides are strictly for in-vitro laboratory and scientific research purposes. They are NOT for human consumption, NOT for veterinary use, NOT for use as a food, drug, dietary supplement, medical device, or cosmetic. Any purchase constitutes the buyer's express agreement to these restrictions."
    },
    {
      icon:"🏛️", title:"FDA Status",
      text:"These products have NOT been evaluated by the U.S. Food and Drug Administration. They are not intended to diagnose, treat, cure, mitigate, or prevent any disease or medical condition in humans or animals. Alphaomegatides is not a compounding pharmacy, outsourcing facility, or pharmaceutical manufacturer."
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
      icon:"📊", title:"No Medical Claims",
      text:"Nothing on this website constitutes medical advice, clinical guidance, or treatment recommendations. Product descriptions, research guides, and protocol references are summaries of published scientific literature for educational purposes only. They do not represent endorsement or validation of any therapy, and should not be interpreted as instructions for self-administration or treatment of any condition."
    },
    {
      icon:"🧪", title:"Purity and Testing",
      text:"All Alphaomegatides products are independently tested by Freedom Diagnostics using HPLC analysis and mass spectrometry confirmation. Certificates of Analysis are available for every product and batch. Reported purity (≥99%) reflects analytical testing results and does not constitute a guarantee of fitness for any particular research purpose."
    },
    {
      icon:"⚖️", title:"Liability Limitation",
      text:"By purchasing from Alphaomegatides, you expressly agree that Alphaomegatides, its officers, employees, and affiliates bear no liability whatsoever for any injury, death, property damage, or other harm resulting from the purchase, possession, handling, or use of any product. All products are sold AS-IS. Maximum liability is limited to the purchase price of the specific transaction."
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


// ════════════════════════════════════════════════════════════════
// §6 APP — ROUTER & ENTRY POINT
// ════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// App.tsx — ENTRY POINT & ROUTER (≈160 lines)
// All logic lives in: data.ts | utils.ts | ui.tsx | components.tsx | pages.tsx
//
// HOW TO USE THIS SPLIT:
//   Upload all 6 files to GitHub → src/
//   They must all be in the same folder (src/) for imports to work.
//   File load order doesn't matter — Vite handles it.
//
// TO OPEN STORE: change COMING_SOON = true → false in data.ts (line 6)
// ═══════════════════════════════════════════════════════════════

// ── Shared state / logic (no React) ──────────────────────────────
// In a multi-file setup these become:
// import { PRODUCTS, COMING_SOON, ... } from "./data";
// import { getSess, decrementInventory, ... } from "./utils";
// import { Nav, SiteFooter, ... } from "./components";
// import { Home, ProductPage, CartPage, ... } from "./pages";
//
// For single-folder GitHub deployment, paste all file contents
// above this App function in order: data → utils → ui → components → pages → App
// ─────────────────────────────────────────────────────────────────

export default function App(){
  const [pg,spg]=useState("home");
  const [pid,spid]=useState(null);
  const [user,su]=useState(()=>getSess());
  const [aged,sa]=useState(()=>{try{return localStorage.getItem("nxg_age")==="1";}catch{return false;}});
  const [cart,setCart]=useState([]);
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

  function confirmAge(){ localStorage.setItem("nxg_age","1"); sa(true); }
  function addToCart(product,selectedSize,selectedPrice){
    decrementInventory(product.id);
    window.dispatchEvent(new Event("nxg_inv_update"));
    setCart(c=>[...c,{...product,selectedSize,selectedPrice}]);
    showToast(`${product.name} added to cart`);
  }
  function removeFromCart(idx){ setCart(c=>c.filter((_,i)=>i!==idx)); }
  const prod=PRODUCTS.find(p=>p.id===pid);
  const canGoBack=history.length>1;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useKeyboardShortcuts(go,setSearchOpen);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  usePageTitle(pg,pid);

  return <ErrorBoundary><div style={{fontFamily:"'DM Sans',sans-serif",background:"#0e0e0e",minHeight:"100vh",color:"#ffffff"}} onTouchStart={pg!=="cart"?onTouchStart:undefined} onTouchEnd={pg!=="cart"?onTouchEnd:undefined}>
    <style>{`
      @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      .page-fade{animation:fadeIn 0.22s ease-out}
      @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
    `}</style>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet"/>
    {(!aged) && <AgeGate onConfirm={confirmAge}/>}
    {COMING_SOON && <ExitIntentPopup/>}
    <AnnouncementBar/>
    {COMING_SOON && <ComingSoonBanner/>}
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
    {pg==="compare"&&<ComparisonTool go={go}/>}
    {pg==="quiz"&&<QuizPage go={go}/>}
    {pg==="bundles"&&<BundlesPage go={go}/>}
    {pg==="track"&&<OrderTrackingPage go={go}/>}
    {pg==="protocols"&&<GatedProtocolsPage go={go}/>}
    {pg==="coa-verify"&&<CoaVerifierWidget go={go}/>}
    {pg==="404"&&<NotFoundPage go={go}/>}
    {pg==="coa"&&<CoaLibraryPage go={go}/>}
    {pg==="research"&&<div key="research" className="page-fade"><ResearchLibraryPage go={go}/></div>}
    {pg==="category"&&catId&&<div key={"cat-"+catId} className="page-fade"><CategoryPage catId={catId} go={go} wishlist={wishlist} toggleWishlist={toggleWishlist}/></div>}
    {pg==="dashboard"&&(user?<Dashboard user={user} go={go} onLogout={()=>su(null)} wishlistIds={wishlist}/>:<Login go={go} onLogin={su}/>)}

    <MobileBottomNav go={go} pg={pg} cartCount={cart.length}/>
    {/* ── SCROLL TO TOP + BACK BUTTONS ── */}
    <div style={{position:"fixed",bottom:24,left:16,display:"flex",flexDirection:"column",gap:8,zIndex:997}}>
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
  </ErrorBoundary>
  );
}
