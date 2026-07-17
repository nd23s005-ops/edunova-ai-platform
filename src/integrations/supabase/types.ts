export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      assignment_questions: {
        Row: {
          assignment_id: string
          created_at: string
          id: string
          order_index: number
          prompt: string
          rubric: string | null
          type: Database["public"]["Enums"]["assignment_answer_type"]
        }
        Insert: {
          assignment_id: string
          created_at?: string
          id?: string
          order_index?: number
          prompt: string
          rubric?: string | null
          type?: Database["public"]["Enums"]["assignment_answer_type"]
        }
        Update: {
          assignment_id?: string
          created_at?: string
          id?: string
          order_index?: number
          prompt?: string
          rubric?: string | null
          type?: Database["public"]["Enums"]["assignment_answer_type"]
        }
        Relationships: [
          {
            foreignKeyName: "assignment_questions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_submissions: {
        Row: {
          answers: Json
          assignment_id: string
          course_id: string
          created_at: string
          id: string
          status: Database["public"]["Enums"]["assignment_status"]
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json
          assignment_id: string
          course_id: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["assignment_status"]
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          assignment_id?: string
          course_id?: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["assignment_status"]
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          chapter_id: string
          created_at: string
          id: string
          instructions: string | null
          title: string
          updated_at: string
        }
        Insert: {
          chapter_id: string
          created_at?: string
          id?: string
          instructions?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          chapter_id?: string
          created_at?: string
          id?: string
          instructions?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          course_id: string
          created_at: string
          id: string
          intro: string | null
          order_index: number
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          intro?: string | null
          order_index?: number
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          intro?: string | null
          order_index?: number
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          course_id: string
          enrolled_at: string
          id: string
          progress: number
          updated_at: string
          user_id: string
        }
        Insert: {
          course_id: string
          enrolled_at?: string
          id?: string
          progress?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          course_id?: string
          enrolled_at?: string
          id?: string
          progress?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          board: Database["public"]["Enums"]["education_board"]
          class_max: number
          class_min: number
          cover_url: string | null
          created_at: string
          description: string | null
          difficulty: Database["public"]["Enums"]["course_difficulty"]
          estimated_hours: number | null
          id: string
          is_published: boolean
          language: Database["public"]["Enums"]["preferred_language"]
          learning_objectives: Json
          subject: string
          title: string
          updated_at: string
          weekly_plan: Json
        }
        Insert: {
          board: Database["public"]["Enums"]["education_board"]
          class_max: number
          class_min: number
          cover_url?: string | null
          created_at?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"]
          estimated_hours?: number | null
          id?: string
          is_published?: boolean
          language?: Database["public"]["Enums"]["preferred_language"]
          learning_objectives?: Json
          subject: string
          title: string
          updated_at?: string
          weekly_plan?: Json
        }
        Update: {
          board?: Database["public"]["Enums"]["education_board"]
          class_max?: number
          class_min?: number
          cover_url?: string | null
          created_at?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"]
          estimated_hours?: number | null
          id?: string
          is_published?: boolean
          language?: Database["public"]["Enums"]["preferred_language"]
          learning_objectives?: Json
          subject?: string
          title?: string
          updated_at?: string
          weekly_plan?: Json
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed_at: string
          course_id: string
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          course_id: string
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          course_id?: string
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          chapter_id: string
          created_at: string
          estimated_minutes: number | null
          examples: Json
          id: string
          illustrations: Json
          key_notes: string | null
          order_index: number
          practice_items: Json
          theory: string | null
          title: string
          updated_at: string
        }
        Insert: {
          chapter_id: string
          created_at?: string
          estimated_minutes?: number | null
          examples?: Json
          id?: string
          illustrations?: Json
          key_notes?: string | null
          order_index?: number
          practice_items?: Json
          theory?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          chapter_id?: string
          created_at?: string
          estimated_minutes?: number | null
          examples?: Json
          id?: string
          illustrations?: Json
          key_notes?: string | null
          order_index?: number
          practice_items?: Json
          theory?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country: string | null
          created_at: string
          dob: string | null
          full_name: string | null
          id: string
          notif_prefs: Json
          phone: string | null
          theme_pref: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          dob?: string | null
          full_name?: string | null
          id: string
          notif_prefs?: Json
          phone?: string | null
          theme_pref?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          dob?: string | null
          full_name?: string | null
          id?: string
          notif_prefs?: Json
          phone?: string | null
          theme_pref?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          answers: Json
          course_id: string
          created_at: string
          id: string
          max_score: number | null
          quiz_id: string
          score: number | null
          submitted_at: string | null
          time_taken_seconds: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json
          course_id: string
          created_at?: string
          id?: string
          max_score?: number | null
          quiz_id: string
          score?: number | null
          submitted_at?: string | null
          time_taken_seconds?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          course_id?: string
          created_at?: string
          id?: string
          max_score?: number | null
          quiz_id?: string
          score?: number | null
          submitted_at?: string | null
          time_taken_seconds?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          answer: Json
          created_at: string
          explanation: string | null
          id: string
          options: Json
          order_index: number
          points: number
          prompt: string
          quiz_id: string
          type: Database["public"]["Enums"]["quiz_question_type"]
        }
        Insert: {
          answer: Json
          created_at?: string
          explanation?: string | null
          id?: string
          options?: Json
          order_index?: number
          points?: number
          prompt: string
          quiz_id: string
          type: Database["public"]["Enums"]["quiz_question_type"]
        }
        Update: {
          answer?: Json
          created_at?: string
          explanation?: string | null
          id?: string
          options?: Json
          order_index?: number
          points?: number
          prompt?: string
          quiz_id?: string
          type?: Database["public"]["Enums"]["quiz_question_type"]
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          chapter_id: string
          created_at: string
          id: string
          pass_score: number
          time_limit_seconds: number | null
          title: string
          updated_at: string
        }
        Insert: {
          chapter_id: string
          created_at?: string
          id?: string
          pass_score?: number
          time_limit_seconds?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          chapter_id?: string
          created_at?: string
          id?: string
          pass_score?: number
          time_limit_seconds?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          chapter_id: string | null
          content: string | null
          course_id: string
          created_at: string
          description: string | null
          id: string
          kind: Database["public"]["Enums"]["resource_kind"]
          order_index: number
          title: string
          url: string | null
        }
        Insert: {
          chapter_id?: string | null
          content?: string | null
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          kind: Database["public"]["Enums"]["resource_kind"]
          order_index?: number
          title: string
          url?: string | null
        }
        Update: {
          chapter_id?: string | null
          content?: string | null
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          kind?: Database["public"]["Enums"]["resource_kind"]
          order_index?: number
          title?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      student_profiles: {
        Row: {
          board: Database["public"]["Enums"]["education_board"]
          created_at: string
          current_class: number
          id: string
          language: Database["public"]["Enums"]["preferred_language"]
          onboarded: boolean
          school_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          board: Database["public"]["Enums"]["education_board"]
          created_at?: string
          current_class: number
          id?: string
          language?: Database["public"]["Enums"]["preferred_language"]
          onboarded?: boolean
          school_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          board?: Database["public"]["Enums"]["education_board"]
          created_at?: string
          current_class?: number
          id?: string
          language?: Database["public"]["Enums"]["preferred_language"]
          onboarded?: boolean
          school_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subjects: {
        Row: {
          created_at: string
          icon: string | null
          name: string
          order_index: number
          slug: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          name: string
          order_index?: number
          slug: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          name?: string
          order_index?: number
          slug?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          admin_level: Database["public"]["Enums"]["admin_level"] | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          admin_level?: Database["public"]["Enums"]["admin_level"] | null
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          admin_level?: Database["public"]["Enums"]["admin_level"] | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_my_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_super_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      admin_level: "demo" | "super"
      app_role:
        | "admin"
        | "student"
        | "teacher"
        | "organization"
        | "professional"
      assignment_answer_type: "short" | "long" | "worksheet"
      assignment_status: "draft" | "submitted" | "graded"
      course_difficulty: "beginner" | "intermediate" | "advanced"
      education_board:
        | "state_board"
        | "cbse"
        | "icse"
        | "cambridge"
        | "ib"
        | "nios"
        | "other"
      preferred_language: "english" | "tamil"
      quiz_question_type: "mcq" | "true_false" | "fill_blank" | "match"
      resource_kind:
        | "notes"
        | "pdf"
        | "worksheet"
        | "formula_sheet"
        | "question_bank"
        | "pyq"
        | "mindmap"
        | "cheatsheet"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_level: ["demo", "super"],
      app_role: ["admin", "student", "teacher", "organization", "professional"],
      assignment_answer_type: ["short", "long", "worksheet"],
      assignment_status: ["draft", "submitted", "graded"],
      course_difficulty: ["beginner", "intermediate", "advanced"],
      education_board: [
        "state_board",
        "cbse",
        "icse",
        "cambridge",
        "ib",
        "nios",
        "other",
      ],
      preferred_language: ["english", "tamil"],
      quiz_question_type: ["mcq", "true_false", "fill_blank", "match"],
      resource_kind: [
        "notes",
        "pdf",
        "worksheet",
        "formula_sheet",
        "question_bank",
        "pyq",
        "mindmap",
        "cheatsheet",
      ],
    },
  },
} as const
