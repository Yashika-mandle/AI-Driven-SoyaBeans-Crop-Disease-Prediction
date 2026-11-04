import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Comprehensive soybean disease database for accurate detection
const SOYBEAN_DISEASES = {
  "Bacterial Blight": {
    symptoms: ["Angular water-soaked lesions", "Yellow halos around lesions", "Brown necrotic centers", "Leaf tearing"],
    severity_indicators: { mild: "Few scattered lesions", moderate: "Multiple lesions, some merging", severe: "Widespread necrosis, defoliation" },
    confidence_boost: 0.05
  },
  "Frogeye Leaf Spot": {
    symptoms: ["Circular lesions with gray centers", "Dark brown borders", "1-5mm diameter spots", "Lesions may merge"],
    severity_indicators: { mild: "Less than 10% leaf area", moderate: "10-25% leaf area", severe: "Over 25% leaf area" },
    confidence_boost: 0.08
  },
  "Sudden Death Syndrome": {
    symptoms: ["Interveinal chlorosis", "Brown streaking in stem", "Root rot", "Leaf margins remain green initially"],
    severity_indicators: { mild: "Lower leaves only", moderate: "Mid-canopy affected", severe: "Whole plant wilting" },
    confidence_boost: 0.06
  },
  "Septoria Brown Spot": {
    symptoms: ["Irregular brown lesions", "Lower leaves first", "Yellow halos possible", "Dark fungal fruiting bodies"],
    severity_indicators: { mild: "Lower leaves only", moderate: "Spreading upward", severe: "Defoliation occurring" },
    confidence_boost: 0.07
  },
  "Downy Mildew": {
    symptoms: ["Pale green to yellow spots on upper surface", "Gray-purple fuzzy growth underneath", "Indefinite lesion margins"],
    severity_indicators: { mild: "Few spots", moderate: "Multiple leaves affected", severe: "Widespread with sporulation" },
    confidence_boost: 0.05
  },
  "Soybean Rust": {
    symptoms: ["Small tan to brown pustules", "Undersides of leaves", "Yellow chlorotic areas", "Premature defoliation"],
    severity_indicators: { mild: "Trace pustules", moderate: "Multiple pustules per leaf", severe: "Heavy sporulation" },
    confidence_boost: 0.09
  },
  "Anthracnose": {
    symptoms: ["Irregular brown lesions on stems and pods", "Rolling or curling leaves", "Premature defoliation"],
    severity_indicators: { mild: "Stem lesions only", moderate: "Pods showing symptoms", severe: "Plant death" },
    confidence_boost: 0.06
  },
  "Healthy": {
    symptoms: ["Uniform green color", "No visible lesions", "Normal leaf structure", "Proper venation pattern"],
    severity_indicators: { none: "No disease symptoms present" },
    confidence_boost: 0.10
  }
};

interface PlantAnalysisResponse {
  plant_detected: boolean;
  is_soybean: boolean;
  message?: string;
  crop_name?: string;
  disease?: string;
  confidence_level?: string;
  confidence_percentage?: number;
  image_quality?: string;
  image_quality_score?: number;
  detected_symptoms?: string[];
  severity?: string;
  affected_area_percentage?: number;
  treatment_steps?: string[];
  prevention_steps?: string[];
  analysis_notes?: string;
  model_certainty_factors?: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check - verify JWT token is present
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Missing or invalid authorization header');
      return new Response(
        JSON.stringify({ error: 'Authentication required. Please log in to use this feature.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { image } = await req.json();
    
    if (!image) {
      return new Response(
        JSON.stringify({ error: 'No image provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Enhanced system prompt with expert-level knowledge
    const systemPrompt = `You are Dr. AgriVision, an expert agricultural scientist and certified plant pathologist with 25+ years specializing in SOYBEAN (Glycine max) crop diseases. You have extensive experience with precision agriculture and AI-assisted crop diagnostics.

## YOUR EXPERTISE INCLUDES:
- Soybean morphology and growth stages (VE to R8)
- All major soybean foliar, root, and stem diseases
- Disease symptom differentiation and staging
- Image quality assessment for accurate diagnosis

## SOYBEAN DISEASE DATABASE:
${JSON.stringify(SOYBEAN_DISEASES, null, 2)}

## ANALYSIS PROTOCOL:

### PHASE 1: IMAGE QUALITY ASSESSMENT
Evaluate the input image:
- Resolution clarity (is the image sharp enough for diagnosis?)
- Lighting conditions (over/under exposed?)
- Focus quality (is the subject in focus?)
- Image angle (can you see relevant plant structures?)

Rate image quality: "excellent" (90-100), "good" (70-89), "fair" (50-69), "poor" (below 50)
This affects your confidence scoring.

### PHASE 2: PLANT DETECTION & SPECIES VERIFICATION
1. Verify a plant is present in the image
2. Identify if it's a soybean plant using these SPECIFIC characteristics:
   - Trifoliate compound leaves (exactly 3 leaflets per petiole)
   - Oval to lance-shaped leaflets with pointed tips
   - Alternate leaf arrangement on stem
   - Characteristic venation pattern (pinnate)
   - Leaf size typically 6-15cm
   - Green color ranging from light to dark depending on growth stage
   - Pubescence (fine hairs) on leaves and stems

If NOT a soybean, identify what crop it likely is (corn, wheat, rice, cotton, tomato, etc.)

### PHASE 3: DISEASE ANALYSIS (Only for confirmed soybean)
1. Examine leaf surfaces (upper and lower)
2. Check for lesion patterns, colors, shapes, and distribution
3. Note any chlorosis, necrosis, wilting, or deformities
4. Cross-reference symptoms with the disease database
5. Estimate affected area percentage
6. Determine severity level

### CONFIDENCE CALCULATION:
Base confidence from symptom match: 60-80%
Adjustments:
- Image quality excellent: +10%
- Image quality good: +5%
- Image quality fair: +0%
- Image quality poor: -15%
- Multiple symptom matches: +5-10%
- Clear disease indicators: +5%
- Ambiguous symptoms: -10%
- Disease-specific boost from database

Maximum confidence: 99% (always leave room for uncertainty)
Minimum for valid diagnosis: 70%

## RESPONSE FORMAT:

For NO PLANT detected:
{
  "plant_detected": false,
  "is_soybean": false,
  "message": "No plant detected in the image. Please upload a clear image of a soybean plant leaf.",
  "image_quality": "poor/fair/good/excellent",
  "image_quality_score": 0-100
}

For NON-SOYBEAN plant:
{
  "plant_detected": true,
  "is_soybean": false,
  "crop_name": "Identified crop name",
  "message": "Invalid Input: This is not a soybean plant. Detected: [crop name]. Please upload a soybean leaf image only.",
  "image_quality": "fair",
  "image_quality_score": 65
}

For CONFIRMED SOYBEAN with analysis:
{
  "plant_detected": true,
  "is_soybean": true,
  "crop_name": "Soybean (Glycine max)",
  "disease": "Disease name or 'Healthy leaf'",
  "confidence_level": "high/medium/low",
  "confidence_percentage": 85.5,
  "image_quality": "good",
  "image_quality_score": 78,
  "detected_symptoms": ["Symptom 1", "Symptom 2", "Symptom 3"],
  "severity": "mild/moderate/severe/none",
  "affected_area_percentage": 15,
  "treatment_steps": [
    "1. Immediate action...",
    "2. Application method...",
    "3. Timing considerations...",
    "4. Follow-up care..."
  ],
  "prevention_steps": [
    "1. Crop rotation practices...",
    "2. Resistant varieties...",
    "3. Cultural practices...",
    "4. Monitoring schedule..."
  ],
  "analysis_notes": "Brief explanation of diagnosis reasoning",
  "model_certainty_factors": ["Factor 1 supporting diagnosis", "Factor 2 supporting diagnosis"]
}

## CRITICAL RULES:
1. Response MUST be valid JSON only - no markdown, no extra text
2. ONLY accept confirmed soybean plants
3. Never report confidence above 99%
4. If confidence < 70%, recommend clearer image
5. Be conservative - when uncertain, recommend professional consultation
6. Include specific, actionable treatment recommendations
7. Always provide reasoning for your diagnosis`;

    console.log('Sending image for analysis with enhanced model...');
    
    // Use the more capable Pro model for higher accuracy
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro', // Upgraded from flash to pro for better accuracy
        messages: [
          { 
            role: 'system', 
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this plant image following your expert diagnostic protocol. 
                
Provide a comprehensive analysis including:
1. Image quality assessment
2. Plant species verification (is this a soybean?)
3. If soybean: detailed disease analysis with symptoms, severity, and confidence
4. Actionable recommendations

Remember to cross-reference with the soybean disease database for accurate symptom matching.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: image
                }
              }
            ]
          }
        ],
        temperature: 0.2, // Lower temperature for more consistent, accurate results
      }),
    });

    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again in a few moments.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (response.status === 402) {
      return new Response(
        JSON.stringify({ error: 'AI service credits exhausted. Please contact support.' }),
        { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI analysis failed. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Response received:', aiResponse.substring(0, 200) + '...');
    
    // Parse the JSON response from AI
    let analysisResult: PlantAnalysisResponse;
    try {
      // Extract JSON from response (handle potential markdown wrapping)
      let jsonStr = aiResponse;
      
      // Remove markdown code blocks if present
      if (jsonStr.includes('```json')) {
        jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      } else if (jsonStr.includes('```')) {
        jsonStr = jsonStr.replace(/```\s*/g, '');
      }
      
      // Find JSON object
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        analysisResult = JSON.parse(jsonStr.trim());
      }
      
      // Validate and cap confidence
      if (analysisResult.confidence_percentage) {
        analysisResult.confidence_percentage = Math.min(analysisResult.confidence_percentage, 99);
        analysisResult.confidence_percentage = Math.round(analysisResult.confidence_percentage * 10) / 10;
      }
      
      // Ensure required fields
      if (analysisResult.is_soybean && !analysisResult.detected_symptoms) {
        analysisResult.detected_symptoms = [];
      }
      
      console.log('Parsed analysis result:', JSON.stringify(analysisResult, null, 2));
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError, 'Raw response:', aiResponse);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to parse analysis results. Please try again.',
          details: 'The AI response could not be processed correctly.'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-plant function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
