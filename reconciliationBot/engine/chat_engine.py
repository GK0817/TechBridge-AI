from engine.metadata_loader import load_flow_json

class ChatEngine:
    def __init__(self):
        self.flow_data = load_flow_json()
        self.sessions = {}

    def process_message(self, session_id, message):
        nodes = self.flow_data.get("nodes", {})
        start_node_key = self.flow_data.get("startNode", "greeting")
        
        # 1. Session state initialization
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                "current_node": start_node_key,
                "selections": {}
            }

        current_node_id = self.sessions[session_id]["current_node"]
        current_node = nodes.get(current_node_id, {})
        
        user_msg = str(message).strip().lower()

        # 2. Handle Casual Greetings on Start Node (Fixes the Glitch)
        is_casual_greeting = any(greet == user_msg or user_msg.startswith(greet + " ") for greet in ["hi", "hii", "hiii", "hello", "hey", "greetings"])
        
        if current_node_id == "greeting" and is_casual_greeting:
            return {
                "sessionId": session_id,
                "type": "QUESTION",
                "message": "Hello! 👋 Please select one of the Banking Domains below to start configuring your solution:",
                "options": [
                    "1. Reconciliation Engine",
                    "2. Payments Processing (Demo)",
                    "3. Data & Regulatory Reporting (Demo)"
                ],
                "currentNode": "greeting",
                "recommendation": None,
                "contactInfo": None
            }

        # 3. Key matching in expectedResponses
        expected_responses = current_node.get("expectedResponses", {})
        next_node_id = None

        for key_phrase, target_node in expected_responses.items():
            key_norm = str(key_phrase).strip().lower()
            if key_norm in user_msg or user_msg in key_norm:
                next_node_id = target_node
                break

        # Explicit Fallback for First Step (Only when user asks for Reconciliation)
        if not next_node_id and current_node_id == "greeting":
            if "reconcil" in user_msg or "1." in user_msg or user_msg == "1":
                next_node_id = "scope_select"

        # 4. Transition node update
        if next_node_id and next_node_id in nodes:
            self.sessions[session_id]["current_node"] = next_node_id
            target_node = nodes[next_node_id]
        else:
            target_node = current_node

        active_node_id = self.sessions[session_id]["current_node"]

        # 5. Format Options dynamically for React UI
        active_responses = target_node.get("expectedResponses", {})
        raw_options = list(active_responses.keys()) if active_responses else []
        
        formatted_options = []
        for opt in raw_options:
            if "front office" in opt:
                formatted_options.append("Front Office vs Back Office")
            elif "back office" in opt:
                formatted_options.append("Back Office Matching")
            elif "position" in opt:
                formatted_options.append("Position Matching")
            elif "1 billion" in opt or "billion" in opt:
                formatted_options.append("Enterprise Ultra Scale (>1 Billion)")
            elif "million" in opt:
                formatted_options.append("High Volume (>1 Million)")
            elif "100k" in opt:
                formatted_options.append("Standard (<100k)")
            elif "reconcile" in opt:
                formatted_options.append("1. Reconciliation Engine")
            elif "payment" in opt:
                formatted_options.append("2. Payments Processing (Demo)")
            else:
                formatted_options.append(opt.capitalize())

        if active_node_id == "greeting":
            formatted_options = [
                "1. Reconciliation Engine",
                "2. Payments Processing (Demo)",
                "3. Data & Regulatory Reporting (Demo)"
            ]

        # 6. Recommendation response payload
        is_recommendation = (active_node_id == "recommendation")
        
        recommendation_data = None
        if is_recommendation:
            recommendation_data = {
                "product": "Pair Enterprise Platform",
                "fitScore": 98,
                "reasons": [
                    "Engineered specifically for high-throughput multi-source reconciliation.",
                    "Real-time automated exception matching and ledger mapping.",
                    "Sub-second query response with full audit trail compliance."
                ]
            }

        return {
            "sessionId": session_id,
            "type": "RECOMMENDATION" if is_recommendation else "QUESTION",
            "message": target_node.get("botMessage", ""),
            "options": formatted_options if not is_recommendation else [],
            "currentNode": active_node_id,
            "recommendation": recommendation_data,
            "contactInfo": {
                "name": "Neha Baglkot",
                "role": "Director",
                "phone": "+91 98765 43210",
                "email": "neha.baglkot@techbridge.com"
            } if is_recommendation else None
        }