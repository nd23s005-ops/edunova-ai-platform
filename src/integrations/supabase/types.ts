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
      admin_audit_logs: {
        Row: {
          action: Database["public"]["Enums"]["audit_action"]
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          metadata: Json
          user_agent: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["audit_action"]
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json
          user_agent?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["audit_action"]
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json
          user_agent?: string | null
        }
        Relationships: []
      }
      ai_course_overviews: {
        Row: {
          career_opportunities: Json
          context_hash: string | null
          course_id: string
          created_at: string
          id: string
          industry_relevance: string | null
          model: string
          objectives: Json
          outcomes: Json
          overview: string
          prerequisites: Json
          skills: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          career_opportunities?: Json
          context_hash?: string | null
          course_id: string
          created_at?: string
          id?: string
          industry_relevance?: string | null
          model: string
          objectives?: Json
          outcomes?: Json
          overview: string
          prerequisites?: Json
          skills?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          career_opportunities?: Json
          context_hash?: string | null
          course_id?: string
          created_at?: string
          id?: string
          industry_relevance?: string | null
          model?: string
          objectives?: Json
          outcomes?: Json
          overview?: string
          prerequisites?: Json
          skills?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_course_overviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_lesson_content: {
        Row: {
          concepts: Json
          context_hash: string | null
          created_at: string
          examples: Json
          id: string
          intro: string
          key_takeaways: Json
          lesson_id: string
          model: string
          steps: Json
          summary: string | null
          updated_at: string
          use_cases: Json
          user_id: string
          visual_description: string | null
        }
        Insert: {
          concepts?: Json
          context_hash?: string | null
          created_at?: string
          examples?: Json
          id?: string
          intro: string
          key_takeaways?: Json
          lesson_id: string
          model: string
          steps?: Json
          summary?: string | null
          updated_at?: string
          use_cases?: Json
          user_id: string
          visual_description?: string | null
        }
        Update: {
          concepts?: Json
          context_hash?: string | null
          created_at?: string
          examples?: Json
          id?: string
          intro?: string
          key_takeaways?: Json
          lesson_id?: string
          model?: string
          steps?: Json
          summary?: string | null
          updated_at?: string
          use_cases?: Json
          user_id?: string
          visual_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_lesson_content_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_mock_test_attempts: {
        Row: {
          ai_feedback: string | null
          answers: Json
          category_id: string
          category_name: string
          category_scores: Json
          created_at: string
          difficulty: string
          id: string
          questions: Json
          score: number
          strengths: Json
          submitted_at: string
          time_spent_seconds: number
          total: number
          user_id: string
          weaknesses: Json
        }
        Insert: {
          ai_feedback?: string | null
          answers?: Json
          category_id: string
          category_name: string
          category_scores?: Json
          created_at?: string
          difficulty?: string
          id?: string
          questions: Json
          score?: number
          strengths?: Json
          submitted_at?: string
          time_spent_seconds?: number
          total?: number
          user_id: string
          weaknesses?: Json
        }
        Update: {
          ai_feedback?: string | null
          answers?: Json
          category_id?: string
          category_name?: string
          category_scores?: Json
          created_at?: string
          difficulty?: string
          id?: string
          questions?: Json
          score?: number
          strengths?: Json
          submitted_at?: string
          time_spent_seconds?: number
          total?: number
          user_id?: string
          weaknesses?: Json
        }
        Relationships: []
      }
      ai_universal_attempts: {
        Row: {
          accuracy: number | null
          ai_feedback: Json | null
          board: string | null
          chapter_id: string | null
          course_id: string | null
          created_at: string
          difficulty: string
          fingerprint: string | null
          grade: string | null
          id: string
          kind: string
          lesson_id: string | null
          letter_grade: string | null
          per_question: Json
          percentage: number | null
          question_types: string[]
          questions: Json
          recommendations: Json | null
          responses: Json
          score: number | null
          started_at: string
          status: string
          strong_topics: string[]
          subject: string | null
          submitted_at: string | null
          time_limit_seconds: number | null
          time_taken_seconds: number | null
          topic: string | null
          topic_breakdown: Json
          total: number | null
          updated_at: string
          user_id: string
          weak_topics: string[]
        }
        Insert: {
          accuracy?: number | null
          ai_feedback?: Json | null
          board?: string | null
          chapter_id?: string | null
          course_id?: string | null
          created_at?: string
          difficulty?: string
          fingerprint?: string | null
          grade?: string | null
          id?: string
          kind: string
          lesson_id?: string | null
          letter_grade?: string | null
          per_question?: Json
          percentage?: number | null
          question_types?: string[]
          questions?: Json
          recommendations?: Json | null
          responses?: Json
          score?: number | null
          started_at?: string
          status?: string
          strong_topics?: string[]
          subject?: string | null
          submitted_at?: string | null
          time_limit_seconds?: number | null
          time_taken_seconds?: number | null
          topic?: string | null
          topic_breakdown?: Json
          total?: number | null
          updated_at?: string
          user_id: string
          weak_topics?: string[]
        }
        Update: {
          accuracy?: number | null
          ai_feedback?: Json | null
          board?: string | null
          chapter_id?: string | null
          course_id?: string | null
          created_at?: string
          difficulty?: string
          fingerprint?: string | null
          grade?: string | null
          id?: string
          kind?: string
          lesson_id?: string | null
          letter_grade?: string | null
          per_question?: Json
          percentage?: number | null
          question_types?: string[]
          questions?: Json
          recommendations?: Json | null
          responses?: Json
          score?: number | null
          started_at?: string
          status?: string
          strong_topics?: string[]
          subject?: string | null
          submitted_at?: string | null
          time_limit_seconds?: number | null
          time_taken_seconds?: number | null
          topic?: string | null
          topic_breakdown?: Json
          total?: number | null
          updated_at?: string
          user_id?: string
          weak_topics?: string[]
        }
        Relationships: []
      }
      ai_weekly_attempts: {
        Row: {
          ai_feedback: Json | null
          answers: Json
          board: string
          class_level: number
          created_at: string
          id: string
          max_score: number
          questions: Json
          results: Json
          score: number
          started_at: string
          subjects: string[]
          submitted_at: string | null
          time_taken_seconds: number | null
          user_id: string
          week_start: string
        }
        Insert: {
          ai_feedback?: Json | null
          answers?: Json
          board: string
          class_level: number
          created_at?: string
          id?: string
          max_score?: number
          questions?: Json
          results?: Json
          score?: number
          started_at?: string
          subjects: string[]
          submitted_at?: string | null
          time_taken_seconds?: number | null
          user_id: string
          week_start: string
        }
        Update: {
          ai_feedback?: Json | null
          answers?: Json
          board?: string
          class_level?: number
          created_at?: string
          id?: string
          max_score?: number
          questions?: Json
          results?: Json
          score?: number
          started_at?: string
          subjects?: string[]
          submitted_at?: string | null
          time_taken_seconds?: number | null
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
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
          ai_generated: boolean
          course_id: string
          created_at: string
          id: string
          intro: string | null
          module_id: string | null
          order_index: number
          scheduled_publish_at: string | null
          status: Database["public"]["Enums"]["content_status"]
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean
          course_id: string
          created_at?: string
          id?: string
          intro?: string | null
          module_id?: string | null
          order_index?: number
          scheduled_publish_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean
          course_id?: string
          created_at?: string
          id?: string
          intro?: string | null
          module_id?: string | null
          order_index?: number
          scheduled_publish_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
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
          {
            foreignKeyName: "chapters_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_approvals: {
        Row: {
          actor_id: string | null
          course_id: string
          created_at: string
          from_status: Database["public"]["Enums"]["content_status"] | null
          id: string
          note: string | null
          to_status: Database["public"]["Enums"]["content_status"]
        }
        Insert: {
          actor_id?: string | null
          course_id: string
          created_at?: string
          from_status?: Database["public"]["Enums"]["content_status"] | null
          id?: string
          note?: string | null
          to_status: Database["public"]["Enums"]["content_status"]
        }
        Update: {
          actor_id?: string | null
          course_id?: string
          created_at?: string
          from_status?: Database["public"]["Enums"]["content_status"] | null
          id?: string
          note?: string | null
          to_status?: Database["public"]["Enums"]["content_status"]
        }
        Relationships: [
          {
            foreignKeyName: "course_approvals_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          icon: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          course_id: string
          current_level: Database["public"]["Enums"]["course_level"]
          enrolled_at: string
          estimated_completion_minutes: number | null
          id: string
          level_progress: number
          progress: number
          updated_at: string
          user_id: string
        }
        Insert: {
          course_id: string
          current_level?: Database["public"]["Enums"]["course_level"]
          enrolled_at?: string
          estimated_completion_minutes?: number | null
          id?: string
          level_progress?: number
          progress?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          course_id?: string
          current_level?: Database["public"]["Enums"]["course_level"]
          enrolled_at?: string
          estimated_completion_minutes?: number | null
          id?: string
          level_progress?: number
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
      course_resources: {
        Row: {
          ai_generated: boolean
          chapter_id: string | null
          content: string | null
          course_id: string
          created_at: string
          created_by: string | null
          external_url: string | null
          file_url: string | null
          id: string
          is_downloadable: boolean
          kind: Database["public"]["Enums"]["learning_resource_kind"]
          lesson_id: string | null
          module_id: string | null
          order_index: number
          status: Database["public"]["Enums"]["content_status"]
          summary: string | null
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean
          chapter_id?: string | null
          content?: string | null
          course_id: string
          created_at?: string
          created_by?: string | null
          external_url?: string | null
          file_url?: string | null
          id?: string
          is_downloadable?: boolean
          kind: Database["public"]["Enums"]["learning_resource_kind"]
          lesson_id?: string | null
          module_id?: string | null
          order_index?: number
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean
          chapter_id?: string | null
          content?: string | null
          course_id?: string
          created_at?: string
          created_by?: string | null
          external_url?: string | null
          file_url?: string | null
          id?: string
          is_downloadable?: boolean
          kind?: Database["public"]["Enums"]["learning_resource_kind"]
          lesson_id?: string | null
          module_id?: string | null
          order_index?: number
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_resources_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_resources_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_resources_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_resources_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_subcategories: {
        Row: {
          category_id: string
          created_at: string
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      course_versions: {
        Row: {
          course_id: string
          created_at: string
          created_by: string | null
          id: string
          note: string | null
          snapshot: Json
          version: number
        }
        Insert: {
          course_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string | null
          snapshot: Json
          version: number
        }
        Update: {
          course_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string | null
          snapshot?: Json
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_versions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          ai_generated: boolean
          approved_at: string | null
          approved_by: string | null
          archived_at: string | null
          avg_rating: number | null
          banner_url: string | null
          board: Database["public"]["Enums"]["education_board"]
          category_id: string | null
          class_max: number
          class_min: number
          cms_status: Database["public"]["Enums"]["content_status"]
          cover_url: string | null
          created_at: string
          created_by: string | null
          deleted_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["course_difficulty"]
          estimated_hours: number | null
          id: string
          instructor_name: string | null
          is_published: boolean
          language: Database["public"]["Enums"]["preferred_language"]
          learning_objectives: Json
          learning_outcomes: string[]
          prerequisites: string[]
          scheduled_publish_at: string | null
          short_description: string | null
          slug: string | null
          subcategory_id: string | null
          subject: string
          tags: string[]
          title: string
          updated_at: string
          version: number
          view_count: number
          visibility: Database["public"]["Enums"]["course_visibility"]
          weekly_plan: Json
        }
        Insert: {
          ai_generated?: boolean
          approved_at?: string | null
          approved_by?: string | null
          archived_at?: string | null
          avg_rating?: number | null
          banner_url?: string | null
          board: Database["public"]["Enums"]["education_board"]
          category_id?: string | null
          class_max: number
          class_min: number
          cms_status?: Database["public"]["Enums"]["content_status"]
          cover_url?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"]
          estimated_hours?: number | null
          id?: string
          instructor_name?: string | null
          is_published?: boolean
          language?: Database["public"]["Enums"]["preferred_language"]
          learning_objectives?: Json
          learning_outcomes?: string[]
          prerequisites?: string[]
          scheduled_publish_at?: string | null
          short_description?: string | null
          slug?: string | null
          subcategory_id?: string | null
          subject: string
          tags?: string[]
          title: string
          updated_at?: string
          version?: number
          view_count?: number
          visibility?: Database["public"]["Enums"]["course_visibility"]
          weekly_plan?: Json
        }
        Update: {
          ai_generated?: boolean
          approved_at?: string | null
          approved_by?: string | null
          archived_at?: string | null
          avg_rating?: number | null
          banner_url?: string | null
          board?: Database["public"]["Enums"]["education_board"]
          category_id?: string | null
          class_max?: number
          class_min?: number
          cms_status?: Database["public"]["Enums"]["content_status"]
          cover_url?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"]
          estimated_hours?: number | null
          id?: string
          instructor_name?: string | null
          is_published?: boolean
          language?: Database["public"]["Enums"]["preferred_language"]
          learning_objectives?: Json
          learning_outcomes?: string[]
          prerequisites?: string[]
          scheduled_publish_at?: string | null
          short_description?: string | null
          slug?: string | null
          subcategory_id?: string | null
          subject?: string
          tags?: string[]
          title?: string
          updated_at?: string
          version?: number
          view_count?: number
          visibility?: Database["public"]["Enums"]["course_visibility"]
          weekly_plan?: Json
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "course_subcategories"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_quiz_attempts: {
        Row: {
          answers: Json
          category_scores: Json
          id: string
          quiz_id: string
          score: number
          strengths: string[]
          submitted_at: string
          time_spent_seconds: number
          total: number
          user_id: string
          weaknesses: string[]
        }
        Insert: {
          answers?: Json
          category_scores?: Json
          id?: string
          quiz_id: string
          score?: number
          strengths?: string[]
          submitted_at?: string
          time_spent_seconds?: number
          total?: number
          user_id: string
          weaknesses?: string[]
        }
        Update: {
          answers?: Json
          category_scores?: Json
          id?: string
          quiz_id?: string
          score?: number
          strengths?: string[]
          submitted_at?: string
          time_spent_seconds?: number
          total?: number
          user_id?: string
          weaknesses?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "daily_quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "daily_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_quizzes: {
        Row: {
          created_at: string
          difficulty: string
          id: string
          questions: Json
          quiz_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          difficulty?: string
          id?: string
          questions: Json
          quiz_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          difficulty?: string
          id?: string
          questions?: Json
          quiz_date?: string
          user_id?: string
        }
        Relationships: []
      }
      debug_error_captures: {
        Row: {
          capture_id: string
          captured_at: string
          created_at: string
          id: string
          location: Json | null
          message: string
          method: string | null
          name: string
          path: string | null
          request: Json | null
          request_id: string | null
          response: Json | null
          stack: string | null
        }
        Insert: {
          capture_id: string
          captured_at?: string
          created_at?: string
          id?: string
          location?: Json | null
          message: string
          method?: string | null
          name: string
          path?: string | null
          request?: Json | null
          request_id?: string | null
          response?: Json | null
          stack?: string | null
        }
        Update: {
          capture_id?: string
          captured_at?: string
          created_at?: string
          id?: string
          location?: Json | null
          message?: string
          method?: string | null
          name?: string
          path?: string | null
          request?: Json | null
          request_id?: string | null
          response?: Json | null
          stack?: string | null
        }
        Relationships: []
      }
      debug_error_retention_config: {
        Row: {
          id: boolean
          max_age_hours: number
          max_rows: number
          updated_at: string
        }
        Insert: {
          id?: boolean
          max_age_hours?: number
          max_rows?: number
          updated_at?: string
        }
        Update: {
          id?: boolean
          max_age_hours?: number
          max_rows?: number
          updated_at?: string
        }
        Relationships: []
      }
      learner_achievements: {
        Row: {
          awarded_at: string
          code: string
          description: string | null
          id: string
          meta: Json | null
          tier: string
          title: string
          user_id: string
        }
        Insert: {
          awarded_at?: string
          code: string
          description?: string | null
          id?: string
          meta?: Json | null
          tier?: string
          title: string
          user_id: string
        }
        Update: {
          awarded_at?: string
          code?: string
          description?: string | null
          id?: string
          meta?: Json | null
          tier?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      learner_context: {
        Row: {
          career_goal: string | null
          context_hash: string | null
          created_at: string
          interests: string[]
          learning_speed: string
          preferred_depth: string
          skill_level: Database["public"]["Enums"]["course_level"]
          strong_topics: string[]
          updated_at: string
          user_id: string
          weak_topics: string[]
        }
        Insert: {
          career_goal?: string | null
          context_hash?: string | null
          created_at?: string
          interests?: string[]
          learning_speed?: string
          preferred_depth?: string
          skill_level?: Database["public"]["Enums"]["course_level"]
          strong_topics?: string[]
          updated_at?: string
          user_id: string
          weak_topics?: string[]
        }
        Update: {
          career_goal?: string | null
          context_hash?: string | null
          created_at?: string
          interests?: string[]
          learning_speed?: string
          preferred_depth?: string
          skill_level?: Database["public"]["Enums"]["course_level"]
          strong_topics?: string[]
          updated_at?: string
          user_id?: string
          weak_topics?: string[]
        }
        Relationships: []
      }
      learner_readiness: {
        Row: {
          certification_readiness: number
          completion_readiness: number
          computed_at: string
          confidence: number
          course_id: string | null
          id: string
          interview_readiness: number | null
          meta: Json | null
          narrative: string | null
          skill_level: string
          user_id: string
        }
        Insert: {
          certification_readiness?: number
          completion_readiness?: number
          computed_at?: string
          confidence?: number
          course_id?: string | null
          id?: string
          interview_readiness?: number | null
          meta?: Json | null
          narrative?: string | null
          skill_level?: string
          user_id: string
        }
        Update: {
          certification_readiness?: number
          completion_readiness?: number
          computed_at?: string
          confidence?: number
          course_id?: string | null
          id?: string
          interview_readiness?: number | null
          meta?: Json | null
          narrative?: string | null
          skill_level?: string
          user_id?: string
        }
        Relationships: []
      }
      learner_xp_events: {
        Row: {
          created_at: string
          id: string
          meta: Json | null
          points: number
          related_attempt_id: string | null
          source: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          meta?: Json | null
          points: number
          related_attempt_id?: string | null
          source: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          meta?: Json | null
          points?: number
          related_attempt_id?: string | null
          source?: string
          user_id?: string
        }
        Relationships: []
      }
      learning_path_steps: {
        Row: {
          course_id: string | null
          created_at: string
          description: string | null
          id: string
          is_optional: boolean
          order_index: number
          path_id: string
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_optional?: boolean
          order_index?: number
          path_id: string
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_optional?: boolean
          order_index?: number
          path_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_steps_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_path_steps_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          ai_generated: boolean
          category_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          skill_level: string | null
          slug: string | null
          tags: string[]
          target_role: string | null
          title: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          skill_level?: string | null
          slug?: string | null
          tags?: string[]
          target_role?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean
          category_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          skill_level?: string | null
          slug?: string | null
          tags?: string[]
          target_role?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_paths_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
        ]
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
      lesson_reading_position: {
        Row: {
          course_id: string | null
          last_section: string | null
          lesson_id: string
          scroll_percent: number
          updated_at: string
          user_id: string
        }
        Insert: {
          course_id?: string | null
          last_section?: string | null
          lesson_id: string
          scroll_percent?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          course_id?: string | null
          last_section?: string | null
          lesson_id?: string
          scroll_percent?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_reading_position_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_reading_position_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_topics: {
        Row: {
          ai_generated: boolean
          content: string | null
          created_at: string
          id: string
          lesson_id: string
          order_index: number
          parent_topic_id: string | null
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean
          content?: string | null
          created_at?: string
          id?: string
          lesson_id: string
          order_index?: number
          parent_topic_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean
          content?: string | null
          created_at?: string
          id?: string
          lesson_id?: string
          order_index?: number
          parent_topic_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_topics_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_topics_parent_topic_id_fkey"
            columns: ["parent_topic_id"]
            isOneToOne: false
            referencedRelation: "lesson_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          ai_generated: boolean
          chapter_id: string
          created_at: string
          estimated_minutes: number | null
          examples: Json
          id: string
          illustrations: Json
          key_notes: string | null
          key_takeaways: string[]
          learning_objectives: string[]
          order_index: number
          practice_items: Json
          scheduled_publish_at: string | null
          status: Database["public"]["Enums"]["content_status"]
          theory: string | null
          title: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean
          chapter_id: string
          created_at?: string
          estimated_minutes?: number | null
          examples?: Json
          id?: string
          illustrations?: Json
          key_notes?: string | null
          key_takeaways?: string[]
          learning_objectives?: string[]
          order_index?: number
          practice_items?: Json
          scheduled_publish_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          theory?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean
          chapter_id?: string
          created_at?: string
          estimated_minutes?: number | null
          examples?: Json
          id?: string
          illustrations?: Json
          key_notes?: string | null
          key_takeaways?: string[]
          learning_objectives?: string[]
          order_index?: number
          practice_items?: Json
          scheduled_publish_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
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
      mock_test_attempts: {
        Row: {
          answers: Json
          created_at: string
          id: string
          max_score: number | null
          score: number | null
          submitted_at: string | null
          test_id: string
          user_id: string
        }
        Insert: {
          answers?: Json
          created_at?: string
          id?: string
          max_score?: number | null
          score?: number | null
          submitted_at?: string | null
          test_id: string
          user_id: string
        }
        Update: {
          answers?: Json
          created_at?: string
          id?: string
          max_score?: number | null
          score?: number | null
          submitted_at?: string | null
          test_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mock_test_attempts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "mock_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      mock_test_questions: {
        Row: {
          choices: Json
          correct_index: number
          explanation: string | null
          id: string
          order_index: number
          prompt: string
          test_id: string
        }
        Insert: {
          choices?: Json
          correct_index: number
          explanation?: string | null
          id?: string
          order_index?: number
          prompt: string
          test_id: string
        }
        Update: {
          choices?: Json
          correct_index?: number
          explanation?: string | null
          id?: string
          order_index?: number
          prompt?: string
          test_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mock_test_questions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "mock_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      mock_tests: {
        Row: {
          audience: string[]
          category: string
          created_at: string
          description: string | null
          difficulty: string
          duration_minutes: number
          id: string
          is_published: boolean
          title: string
          total_questions: number
        }
        Insert: {
          audience?: string[]
          category: string
          created_at?: string
          description?: string | null
          difficulty?: string
          duration_minutes?: number
          id?: string
          is_published?: boolean
          title: string
          total_questions?: number
        }
        Update: {
          audience?: string[]
          category?: string
          created_at?: string
          description?: string | null
          difficulty?: string
          duration_minutes?: number
          id?: string
          is_published?: boolean
          title?: string
          total_questions?: number
        }
        Relationships: []
      }
      modules: {
        Row: {
          ai_generated: boolean
          course_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          order_index: number
          scheduled_publish_at: string | null
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean
          course_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          order_index?: number
          scheduled_publish_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean
          course_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          order_index?: number
          scheduled_publish_at?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          href: string | null
          id: string
          kind: string
          priority: number
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          href?: string | null
          id?: string
          kind?: string
          priority?: number
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          href?: string | null
          id?: string
          kind?: string
          priority?: number
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country: string | null
          created_at: string
          dashboard_prefs: Json
          dob: string | null
          full_name: string | null
          id: string
          last_insight_at: string | null
          notif_prefs: Json
          onboarding_completed: boolean
          phone: string | null
          theme_pref: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          dashboard_prefs?: Json
          dob?: string | null
          full_name?: string | null
          id: string
          last_insight_at?: string | null
          notif_prefs?: Json
          onboarding_completed?: boolean
          phone?: string | null
          theme_pref?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          dashboard_prefs?: Json
          dob?: string | null
          full_name?: string | null
          id?: string
          last_insight_at?: string | null
          notif_prefs?: Json
          onboarding_completed?: boolean
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
      resource_bookmarks: {
        Row: {
          created_at: string
          id: string
          resource_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          resource_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          resource_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_bookmarks_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_interactions: {
        Row: {
          bookmarked: boolean
          completed: boolean
          created_at: string
          downloaded_at: string | null
          id: string
          last_viewed_at: string | null
          resource_id: string
          saved_for_later: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          bookmarked?: boolean
          completed?: boolean
          created_at?: string
          downloaded_at?: string | null
          id?: string
          last_viewed_at?: string | null
          resource_id: string
          saved_for_later?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          bookmarked?: boolean
          completed?: boolean
          created_at?: string
          downloaded_at?: string | null
          id?: string
          last_viewed_at?: string | null
          resource_id?: string
          saved_for_later?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_interactions_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "course_resources"
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
      study_sessions: {
        Row: {
          created_at: string
          id: string
          minutes: number
          started_at: string
          subject: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          minutes?: number
          started_at?: string
          subject?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          minutes?: number
          started_at?: string
          subject?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subject_quiz_attempts: {
        Row: {
          ai_feedback: string | null
          answers: Json
          category_scores: Json
          created_at: string
          difficulty: string
          id: string
          questions: Json
          quiz_set: number
          score: number
          strengths: string[]
          subject: string
          submitted_at: string | null
          time_spent_seconds: number
          total: number
          user_id: string
          weaknesses: string[]
        }
        Insert: {
          ai_feedback?: string | null
          answers?: Json
          category_scores?: Json
          created_at?: string
          difficulty?: string
          id?: string
          questions: Json
          quiz_set: number
          score?: number
          strengths?: string[]
          subject: string
          submitted_at?: string | null
          time_spent_seconds?: number
          total?: number
          user_id: string
          weaknesses?: string[]
        }
        Update: {
          ai_feedback?: string | null
          answers?: Json
          category_scores?: Json
          created_at?: string
          difficulty?: string
          id?: string
          questions?: Json
          quiz_set?: number
          score?: number
          strengths?: string[]
          subject?: string
          submitted_at?: string | null
          time_spent_seconds?: number
          total?: number
          user_id?: string
          weaknesses?: string[]
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
      support_tickets: {
        Row: {
          category: Database["public"]["Enums"]["ticket_category"]
          created_at: string
          description: string
          email: string
          id: string
          name: string
          role: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          description: string
          email: string
          id?: string
          name: string
          role?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["ticket_category"]
          created_at?: string
          description?: string
          email?: string
          id?: string
          name?: string
          role?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ticket_notes: {
        Row: {
          author_id: string
          created_at: string
          id: string
          note: string
          ticket_id: string
        }
        Insert: {
          author_id: string
          created_at?: string
          id?: string
          note: string
          ticket_id: string
        }
        Update: {
          author_id?: string
          created_at?: string
          id?: string
          note?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_notes_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      upskill_courses: {
        Row: {
          audience: string[]
          category: string
          cover_url: string | null
          created_at: string
          description: string | null
          difficulty: string
          estimated_hours: number | null
          id: string
          is_featured: boolean
          is_published: boolean
          learning_objectives: Json
          modules: Json
          prerequisites: Json
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          audience?: string[]
          category: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string
          estimated_hours?: number | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          learning_objectives?: Json
          modules?: Json
          prerequisites?: Json
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          audience?: string[]
          category?: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string
          estimated_hours?: number | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          learning_objectives?: Json
          modules?: Json
          prerequisites?: Json
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      upskill_enrollments: {
        Row: {
          completed_modules: Json
          course_id: string
          enrolled_at: string
          id: string
          progress: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_modules?: Json
          course_id: string
          enrolled_at?: string
          id?: string
          progress?: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_modules?: Json
          course_id?: string
          enrolled_at?: string
          id?: string
          progress?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "upskill_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "upskill_courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_learning_paths: {
        Row: {
          completed_at: string | null
          current_step_id: string | null
          id: string
          path_id: string
          progress: number
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          current_step_id?: string | null
          id?: string
          path_id: string
          progress?: number
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          current_step_id?: string | null
          id?: string
          path_id?: string
          progress?: number
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_paths_current_step_id_fkey"
            columns: ["current_step_id"]
            isOneToOne: false
            referencedRelation: "learning_path_steps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_learning_paths_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
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
      weekly_assessment_attempts: {
        Row: {
          answers: Json
          assessment_id: string
          category_scores: Json
          created_at: string
          id: string
          max_score: number
          score: number
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json
          assessment_id: string
          category_scores?: Json
          created_at?: string
          id?: string
          max_score?: number
          score?: number
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          assessment_id?: string
          category_scores?: Json
          created_at?: string
          id?: string
          max_score?: number
          score?: number
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_assessment_attempts_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "weekly_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_assessment_questions: {
        Row: {
          assessment_id: string
          category: number
          category_name: string
          correct_index: number
          created_at: string
          explanation: string | null
          id: string
          options: Json
          position: number
          prompt: string
        }
        Insert: {
          assessment_id: string
          category: number
          category_name: string
          correct_index: number
          created_at?: string
          explanation?: string | null
          id?: string
          options: Json
          position: number
          prompt: string
        }
        Update: {
          assessment_id?: string
          category?: number
          category_name?: string
          correct_index?: number
          created_at?: string
          explanation?: string | null
          id?: string
          options?: Json
          position?: number
          prompt?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_assessment_questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "weekly_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_assessments: {
        Row: {
          board: string
          class_level: number
          created_at: string
          id: string
          status: string
          subject: string
          title: string
          updated_at: string
          user_id: string
          week_start: string
        }
        Insert: {
          board: string
          class_level: number
          created_at?: string
          id?: string
          status?: string
          subject: string
          title: string
          updated_at?: string
          user_id: string
          week_start: string
        }
        Update: {
          board?: string
          class_level?: number
          created_at?: string
          id?: string
          status?: string
          subject?: string
          title?: string
          updated_at?: string
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_debug_error_captures: { Args: never; Returns: number }
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
      is_admin: { Args: never; Returns: boolean }
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
        | "school_student"
        | "college_student"
      assignment_answer_type: "short" | "long" | "worksheet"
      assignment_status: "draft" | "submitted" | "graded"
      audit_action:
        | "create"
        | "update"
        | "archive"
        | "restore"
        | "publish"
        | "unpublish"
        | "delete"
        | "duplicate"
        | "approve"
        | "reject"
        | "request_changes"
      content_status: "draft" | "review" | "approved" | "published" | "archived"
      course_difficulty: "beginner" | "intermediate" | "advanced"
      course_level:
        | "beginner"
        | "basic"
        | "intermediate"
        | "advanced"
        | "expert"
        | "industry_ready"
      course_visibility: "public" | "signed_in" | "role_gated" | "private"
      education_board:
        | "state_board"
        | "cbse"
        | "icse"
        | "cambridge"
        | "ib"
        | "nios"
        | "other"
      learning_resource_kind:
        | "beginner_guide"
        | "roadmap"
        | "notes"
        | "revision_notes"
        | "cheat_sheet"
        | "documentation"
        | "practice_questions"
        | "interview_questions"
        | "assignment"
        | "mini_project"
        | "major_project"
        | "case_study"
        | "faq"
        | "glossary"
        | "reference"
        | "downloadable"
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
      ticket_category:
        | "login"
        | "dashboard"
        | "courses"
        | "account"
        | "organization"
        | "technical"
        | "other"
      ticket_status: "open" | "in_progress" | "resolved"
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
      app_role: [
        "admin",
        "student",
        "teacher",
        "organization",
        "professional",
        "school_student",
        "college_student",
      ],
      assignment_answer_type: ["short", "long", "worksheet"],
      assignment_status: ["draft", "submitted", "graded"],
      audit_action: [
        "create",
        "update",
        "archive",
        "restore",
        "publish",
        "unpublish",
        "delete",
        "duplicate",
        "approve",
        "reject",
        "request_changes",
      ],
      content_status: ["draft", "review", "approved", "published", "archived"],
      course_difficulty: ["beginner", "intermediate", "advanced"],
      course_level: [
        "beginner",
        "basic",
        "intermediate",
        "advanced",
        "expert",
        "industry_ready",
      ],
      course_visibility: ["public", "signed_in", "role_gated", "private"],
      education_board: [
        "state_board",
        "cbse",
        "icse",
        "cambridge",
        "ib",
        "nios",
        "other",
      ],
      learning_resource_kind: [
        "beginner_guide",
        "roadmap",
        "notes",
        "revision_notes",
        "cheat_sheet",
        "documentation",
        "practice_questions",
        "interview_questions",
        "assignment",
        "mini_project",
        "major_project",
        "case_study",
        "faq",
        "glossary",
        "reference",
        "downloadable",
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
      ticket_category: [
        "login",
        "dashboard",
        "courses",
        "account",
        "organization",
        "technical",
        "other",
      ],
      ticket_status: ["open", "in_progress", "resolved"],
    },
  },
} as const
